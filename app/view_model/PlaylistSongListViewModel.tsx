import Repository from "../repository/Repository"
import { useState, useEffect, useRef, useCallback } from 'react'
import { Song } from "../model/domain/types"


function usePlaylistSongsViewModel(playlistId: number) {
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const currentTimestamp = useRef(0)
    const endReached = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)


    const searchSongsInPlaylist = useCallback(async () => {
        if (endReached.current) return
        currentTimestamp.current > 0 ? setIsMoreLoading(true) : setIsLoading(true)
        try {
            const resultSongs = await repository.findSavedSongs(playlistId, searchQuery, currentTimestamp.current)
            if (resultSongs.ok && resultSongs.data && resultSongs.data.length > 0) {
                const timestamp = resultSongs.data.slice(-1)[0].timestampAddedToPlaylist
                if (timestamp) currentTimestamp.current = timestamp

                const resultFavorites = await repository.findFavoriteSongsIds(resultSongs.data.map(song => song.id))

                if (resultFavorites.ok && resultFavorites.data && resultFavorites.data.length > 0) {
                    const songsWithFavorites = resultSongs.data.map(song => {
                        if (resultFavorites.data?.includes(song.id)) song.isFavorite = true
                        return song
                    })
                    currentTimestamp.current > 0 ? setSongs(prev => [...prev, ...songsWithFavorites]) : setSongs(songsWithFavorites)
                }
                else {
                    currentTimestamp.current > 0 ? setSongs(prev => [...prev, ...resultSongs.data]) : setSongs(resultSongs.data)
                }
            }
            else {
                endReached.current = true
            }
        } catch (err) {
            console.log(err)
            console.log('catch')
        } finally {
            setIsMoreLoading(false)
            setIsLoading(false)
        }
    }, [searchQuery])


    useEffect(() => {
        searchSongsInPlaylist()
    }, [searchQuery])


    const updateFavoriteSongs = useCallback((song: Song) => {
        const idx = songs.findIndex(s => s.id === song.id)
        let newSongs = [...songs]
        if (idx !== -1) {
            newSongs[idx] = { ...songs[idx], isFavorite: !song.isFavorite }
            console.log(newSongs)
            setSongs(newSongs)
        }
    }, [songs])


    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
        setSearchQuery(searchQuery)
    }, [])


    const handleFavoritesChange = useCallback((song: Song) => {
        if (!song.isFavorite) {
            const searchSongChordsAndInsertToFavorites = async () => {
                try {
                    let songToInsert = undefined
                    const resultChords = await repository.searchSongChords(song)
                    if (resultChords.data && resultChords.data.chords) {
                        songToInsert = { chords: resultChords.data.chords, ...song }
                        const resultInsert = await repository.addSongToPlaylist(songToInsert, 1)
                        updateFavoriteSongs(song)
                    }
                } catch (err) {

                }
            }
            searchSongChordsAndInsertToFavorites()
        }
        else if (song.isFavorite && playlistId !== 1) {
            const removeSong = async () => {
                try {
                    const resultDelete = await repository.removeSongFromPlaylist(song.id, 1)
                    // console.log(resultDb)
                    updateFavoriteSongs(song)
                } catch (err) {

                }
            }
            removeSong()
        }
        else {
            const removeSong = async () => {
                try {
                    const resultDelete = await repository.removeSongFromPlaylist(song.id, 1)
                    const idx = songs.findIndex(s => s.id === song.id)
                    let newSongs = [...songs]
                    newSongs.splice(idx, 1)
                    setSongs(newSongs)
                } catch (err) {

                }
            }
            removeSong()

        }
    }, [songs])


    return {
        songs,
        isLoading,
        isMoreLoading,
        searchQuery,
        handleChangeSearchQuery,
        handleFavoritesChange,
        searchSongsInPlaylist
    }
}

export default usePlaylistSongsViewModel
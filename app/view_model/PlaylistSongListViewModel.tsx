import Repository from "../repository/Repository"
import { useState, useEffect, useRef, useCallback } from 'react'
import { Playlist, Song } from "../model/domain/types"
import { ActionType } from "../model/types"


function usePlaylistSongsViewModel(playlist: Playlist, song: Song|undefined, actionType: ActionType|undefined, message: string|undefined) {
    const repository = Repository.getInstance()
    const playlistId = playlist.id
    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [snackMessage, setSnackMessage] = useState(message)
    const currentTimestamp = useRef(0)
    const endReached = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)


    useEffect(()=>{
        console.log('jjjjjjjjjjjjjjjjjjjjjj')
        console.log(actionType, song)
        if(actionType !== undefined && song){
            updatePlaylistSongs(song, actionType)
        }
    }, [song, actionType])


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
    
    
    const updatePlaylistSongs = useCallback((song: Song, actionType: ActionType) => {
        const idx = songs.findIndex(s => s.id === song.id)
        if (idx === -1) return
        console.log(actionType, song)
        if (actionType === ActionType.Remove) {
            // console.log('removing')
            let newSongs = [...songs]
            newSongs.splice(idx, 1)
            setSongs(newSongs)
            setSnackMessage(`${song.name} removed from playlist`)
        }
        if(actionType === ActionType.Add){
            setSnackMessage(`${song.name} added to playlist`)
        }
        else if (actionType === ActionType.FavoritesAdd || actionType === ActionType.FavoritesRemove) {
            // console.log('favs')
            let newSongs = [...songs]
            newSongs[idx] = { ...songs[idx], isFavorite: actionType === ActionType.FavoritesAdd? true: false }
            setSongs(newSongs)
            setSnackMessage(`${song.name} ${actionType === ActionType.FavoritesAdd? 'added to': 'removed from'} Favorites`)
        }
    }, [songs])


    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
        setSearchQuery(searchQuery)
    }, [])


    const handleFavoritesChange = useCallback(async (song: Song) => {
        try {
            if (!song.isFavorite) {
                let songToInsert = undefined
                const resultChords = await repository.searchSongChords(song)
                if (resultChords.data && resultChords.data.chords) {
                    songToInsert = { chords: resultChords.data.chords, ...song }
                    const resultInsert = await repository.addSongToPlaylist(songToInsert, 1)
                    if (resultInsert.ok && resultInsert.data) updatePlaylistSongs(song, ActionType.FavoritesAdd)
                }
            }
            else {
                const resultDelete = await repository.removeSongFromPlaylist(song.id, 1)
                if (resultDelete.ok && resultDelete.data) {
                    if (playlistId === 1) {
                            const idx = songs.findIndex(s => s.id === song.id)
                            let newSongs = [...songs]
                            newSongs.splice(idx, 1)
                            setSongs(newSongs)
                    }  
                    else {
                        updatePlaylistSongs(song, ActionType.FavoritesRemove)
                    }
                    
                }
            }
    } catch (err) {
        console.error(err)
    }
    }, [songs])


    return {
        songs,
        snackMessage,
        isLoading,
        isMoreLoading,
        searchQuery,
        handleChangeSearchQuery,
        handleFavoritesChange,
        searchSongsInPlaylist
    }
}

export default usePlaylistSongsViewModel
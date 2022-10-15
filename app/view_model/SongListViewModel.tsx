import Repository from "../repository/Repository"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Song } from "../model/domain/types"
import { useEffectAfterMount } from "../utils/hooks"



function useSongListViewModel() {

    const repository = Repository.getInstance()

    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTop100, setIsTop100] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [searchOffline, setSearchOffline] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    
    useEffect(()=>{
        setIsLoading(true)
        setSongs([])
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        const fetch = async() =>{
            try {
                const songsData = await repository.fetchSongs(searchQuery, currentPage, isTop100)
                if(songsData.data && songsData.data.length > 0){
                    // console.log(songsData.data.length)
                    const favoritesData = await repository.findFavoriteSongsIds(songsData.data.map(song => song.id))
                    // console.log(favoritesData)
                    if (favoritesData.data && favoritesData.data.length > 0) {
                        // console.log('Got favs')
                        const songsWithFavorites = songsData.data.map(song => {
                            if (favoritesData.data?.includes(song.id)) song.isFavorite = true
                            return song
                        })
                        console.log('songsWithFavorites[0].name')
                        setSongs(songsWithFavorites) 
                        // console.log(songs) 
                    }
                    else {
                        console.log('songsData.data')
                        setSongs(songsData.data)
                    }
                }
                else if(songsData.error) {
                    console.log('!!!!!!!!!!!!!!!!!!!!!')
                    // setSearchOffline(true)
                    // Todo search for offline in case no data from server. Handle the logic in REPOSITORY???
                    // setIsError(true)
                    // setErrorMessage(data.error?data.error: '')
                }
            }catch(err){

            }finally{
                setIsLoading(false)
            }
        }
        fetch()
    }, [searchQuery, currentPage])


    const updateFavoriteSongs = (song: Song) => {
        console.log('Update fav')
        console.log(songs.length)
        const idx = songs.findIndex(s=>s.id === song.id)
        let newSongs = [...songs]
        if(idx !== -1) {
            newSongs[idx] = {...songs[idx], isFavorite: !song.isFavorite}
            setSongs(newSongs)
        }
    }
    

    const handleChangeSearchQuery = (searchQuery: string) => {
        // setSongs([])
        setSearchQuery(searchQuery)
    }


    const handleFavoritesChange = (song: Song, playlistId: number =1) => {
        console.log(songs.length)
        console.log(song, playlistId)
        if(!song.isFavorite){
            const searchSongChordsAndInsertToFavorites = async() => {
                let songToInsert = undefined
                try{
                    const data = await repository.searchSong(song)
                    if(data.data && data.data.chords){
                        // console.log(data)
                        songToInsert = {chords: data.data.chords, ...song}
                        console.log(songToInsert.id)
                        console.log('---------------------')

                        console.log(songs[0].name)
                        const resultDb = await repository.addSongToPlaylist(songToInsert, playlistId)
                        console.log(resultDb)
                        updateFavoriteSongs(song)
                    }
                }catch(err){
                    // setIsError(true)
                    // setErrorMessage(err)
                }
            }
            searchSongChordsAndInsertToFavorites()
        }
        else {
            const removeSong = async() => {
                const resultDb = await repository.removeSongFromPlaylist(song.id, playlistId)
                console.log(resultDb)
                updateFavoriteSongs(song)
            }
            removeSong()
        }
    }

    return {
        songs, 
        searchQuery, 
        currentPage, 
        isLoading,
        isError,
        errorMessage,
        message,
        setSearchQuery: handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
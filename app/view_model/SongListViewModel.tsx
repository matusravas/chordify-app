import Repository from "../repository/Repository"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Song } from "../model/domain/types"
import { useEffectAfterMount } from "../utils/hooks"

// class SongListViewModel {
//     //todo  this should be hook I guess
//     static _instance: SongListViewModel

//     repository = Repository.getInstance()

//     private constructor() {
        
//     }
// }

function useSongListViewModel() {

    const repository = Repository.getInstance()

    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTop100, setIsTop100] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isError, setIsError] = useState(false)
    const [searchOffline, setSearchOffline] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    // const isMounted = useRef(false)
    
    // useEffect(()=>{
    //     const search = async()=>{
    //         console.log('Going to search')
    //         const resultSongs = await repository.searchSongsInPlaylist(1, 'fec', 10, 'desc')
    //         console.log(resultSongs)
    //         // const resultSongPlaylist = await repository.findAllPlaylists('Favorites', 'desc')
    //         // console.log(resultSongPlaylist)
    //     }
    //     search()
    // }, [])
    
    useEffect(()=>{
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        const fetch = async() =>{
            const fetchedSongs = await repository.fetchSongs(searchQuery, currentPage, isTop100)
            if(fetchedSongs.ok && fetchedSongs.data){
                const favoritesIds = await repository.findFavoriteSongsIds(fetchedSongs.data.map(s=>s.id))
                const songs = fetchedSongs.data?.map(song=>{
                    if (favoritesIds.ok && favoritesIds.data && favoritesIds.data.includes(song.id)) song.isFavorite = true
                    return song
                })
                setSongs(songs)  
            }
            else if(fetchedSongs.error) {
                // setSearchOffline(true)
                // Todo search for offline in case no data from server. Handle the logic in REPOSITORY???
                setIsError(true)
                setErrorMessage(fetchedSongs.error?fetchedSongs.error: '')
            }
        }
        fetch()
    }, [searchQuery, currentPage])

    const updateFavoriteSongs = (song: Song) => {
        const idx = songs.findIndex(s=>s.id === song.id)
        let newSongs = [...songs]
        if(idx !== -1) newSongs[idx] = {...songs[idx], isFavorite: !song.isFavorite}; setSongs(newSongs)
    }
    
    // useEffectAfterMount(()=>{
    //     if(searchOffline === true){
    //         const songs = repository.fi
    //     }
    // },[searchOffline])

    const handleChangeSearchQuery = (searchQuery: string) => {
        // setSongs([])
        setSearchQuery(searchQuery)
    }

    const handleFavoritesChange = (song: Song, playlistId: number =1) => {
        console.log(song, playlistId)
        if(!song.isFavorite){
                const fetchSongChordsIfNotExistsAndInsert = async() => {
                    let songToInsert = undefined
                    const songDb = await repository.searchAlreadySavedSong(song.id)
                    // console.log('SongDb----')
                    // console.log(songDb)
                    if(songDb.ok && songDb.data && songDb.data[0] && songDb.data[0].chords){
                        console.log('Will insert fromDB')
                        songToInsert = {chords: songDb.data[0].chords, ...song}   
                    }
                    else{
                        console.log('Will insert API')
                        const resultApi = await repository.fetchSongChords(song.chordsLink)
                        // console.log('Result Api ---')
                        // console.log(resultApi)
                        if (resultApi.ok && resultApi.data && resultApi.data.chords){
                            songToInsert = {chords: resultApi.data.chords, ...song}
                            // updateFavoriteSongs(song)
                        }
                    }
                    if(songToInsert) {
                        const resultDb = await repository.addSongToPlaylist(songToInsert, playlistId)
                        updateFavoriteSongs(song)
                    }
                }
                fetchSongChordsIfNotExistsAndInsert()
            }
            else {
                const removeSong = async() => {
                    const resultDb = await repository.removeSongFromPlaylist(song.id, playlistId)
                    console.log('remove')
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
        isError,
        errorMessage,
        message,
        setSearchQuery: handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
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
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    // const isMounted = useRef(false)
    
    useEffect(()=>{
        const search = async()=>{
            console.log('Going to search')
            const resultSongs = await repository.searchSongsInPlaylist(1, 'fec', 10, 'desc')
            console.log(resultSongs)
            // const resultSongPlaylist = await repository.findAllPlaylists('Favorites', 'desc')
            // console.log(resultSongPlaylist)
        }
        search()
    }, [])

    useEffectAfterMount(()=>{
        console.log('After mount hook')
        // if(isMounted.current){
            // const fetch = async() =>{
            //     const result = await repository.fetchSongs(searchQuery, currentPage)
            //     if(result.ok) setSongs(result.data)
            //     else if(result.error) setIsError(true); setErrorMessage(result.error?result.error: '')
            // }
            // fetch()
        // }
        // isMounted.current = true
    }, [])
    
    useEffect(()=>{
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        const fetch = async() =>{
            
            const result = await repository.fetchSongs(searchQuery, currentPage, isTop100)
            const favs = await repository.findFavoriteSongs(result.data?result.data.map(s=>s.id): [])
            console.log(favs.data)
            if(result.ok && result.data) {
                setSongs(result.data)
            }
            else if(result.error) setIsError(true); setErrorMessage(result.error?result.error: '')
        }

        fetch()
    }, [searchQuery, currentPage])


    const handleChangeSearchQuery = (searchQuery: string) => {
        setSearchQuery(searchQuery)
    }

    const handleAddToPlaylist = (song: Song, playlistId: number =1) => {
        console.log(song, playlistId)
        const fetchSongChordsAndInsert = async() => {
            const resultApi = await repository.fetchSongChords(song.chordsLink)
            console.log(resultApi)
            if (resultApi.ok && resultApi.data && resultApi.data.chords){
                const songToInsert = {chords: resultApi.data.chords, ...song}
                const resultDb = await repository.addSongToPlaylist(songToInsert, playlistId)
                console.log(resultDb)
            }
        }
        fetchSongChordsAndInsert()
    }

    return {
        songs, 
        searchQuery, 
        currentPage, 
        isError,
        errorMessage,
        message,
        setSearchQuery: handleChangeSearchQuery, 
        setSongAsFavorite: handleAddToPlaylist
    }
}

export default useSongListViewModel
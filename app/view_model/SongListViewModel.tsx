import Repository from "../repository/Repository"
import {useState, useEffect, useCallback, useRef} from 'react'
import { Song } from "../model/domain/types"
import { useNetInfo } from "@react-native-community/netinfo"
import { useEffectAfterMount } from "../utils/hooks"


function useSongListViewModel(song?: Song) {
    // const fetching = useRef(false)
    console.log('ViewModel')
    // console.log(fetching.current)
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTop100, setIsTop100] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)

    const {isConnected} = useNetInfo()

    useEffect(()=>{
        console.log('effect')
        if (!isLoading && !isMoreLoading && isConnected !== null) {
            searchSongs()
        }
      // }, [route, isConnected])
      }, [searchQuery, currentPage, isConnected])

    useEffect(()=>{
        console.log('abcdefghijklmnop')
        console.log(song)
        if(song){
            updateFavoriteSongs(song)
        }
    }, [song])

    // useEffect(()=>{
    //     searchSongs()
    // }, [searchQuery, currentPage])


    const searchSongs = useCallback(async() => {
        // fetching.current = true
        currentPage > 1? setIsMoreLoading(true) : setIsLoading(true)
        // setSongs([])
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        
        try {
            const songsData = await repository.fetchSongs(searchQuery, currentPage, isTop100)
            if(songsData.ok && songsData.data && songsData.data.length > 0){
                // console.log(songsData.data.length)
                const favoritesData = await repository.findFavoriteSongsIds(songsData.data.map(song => song.id))
                // console.log(favoritesData)
                if (favoritesData.ok && favoritesData.data && favoritesData.data.length > 0) {
                    // console.log('Got favs')
                    const songsWithFavorites = songsData.data.map(song => {
                        if (favoritesData.data?.includes(song.id)) song.isFavorite = true
                        return song
                    })
                    currentPage > 1? setSongs(prev=>[...prev, ...songsWithFavorites]) : setSongs(songsWithFavorites)
                        // setSongs(songsWithFavorites)
                    // setSongs(songsWithFavorites) 
                }
                else {
                    currentPage > 1? setSongs(prev=>[...prev, ...songsData.data]) : setSongs(songsData.data)
                    // setSongs(songsData.data)
                }
            }
        }catch(err){
            console.log('catch')
        }finally{
            // fetching.current = false
            // currentPage > 1? setIsMoreLoading(false) : setIsLoading(false)
            setIsLoading(false)
            setIsMoreLoading(false)
        }
    }, [searchQuery, currentPage])
    
    
    const handlePageChanged = useCallback(()=>{
        setCurrentPage(prev=>prev+1)
    }, [currentPage])


    const updateFavoriteSongs = useCallback((song: Song) => {
        const idx = songs.findIndex(s=>s.id === song.id)
        let newSongs = [...songs]
        if(idx !== -1) {
            newSongs[idx] = {...songs[idx], isFavorite: !song.isFavorite}
            setSongs(newSongs)
        }
    }, [songs])
    

    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
        setSearchQuery(searchQuery)
        setCurrentPage(1)
    },[])


    const handleFavoritesChange = useCallback((song: Song) => {
        console.log(songs.length)
        if(!song.isFavorite){
            const searchSongChordsAndInsertToFavorites = async() => {
                let songWithChords = undefined
                try{
                    const data = await repository.searchSongChords(song)
                    if(data.data && data.data.chords){
                        songWithChords = {chords: data.data.chords, ...song}
                        const resultDb = await repository.addSongToPlaylist(songWithChords, 1)
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
                const resultDb = await repository.removeSongFromPlaylist(song.id, 1)
                console.log(resultDb)
                updateFavoriteSongs(song)
            }
            removeSong()
        }
    }, [songs])


    return {
        songs, 
        searchQuery, 
        currentPage, 
        isLoading,
        isMoreLoading,
        isConnected,
        // isOnline,
        // isError,
        // errorMessage,
        // message,
        searchSongs,
        handlePageChanged,
        handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
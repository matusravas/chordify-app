import Repository from "../repository/Repository"
import {useState, useEffect, useCallback, useRef} from 'react'
import { Song } from "../model/domain/types"
import { useNetInfo } from "@react-native-community/netinfo"
import { useEffectAfterMount } from "../utils/hooks"
import { ActionType } from "../model/types"


function useSongListViewModel(song: Song|undefined, actionType: ActionType|undefined, message: string|undefined) {
    console.log('ViewModel')
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTop100, setIsTop100] = useState(false)
    const [snackMessage, setSnackMessage] = useState(message)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)

    const {isConnected} = useNetInfo()

    useEffect(()=>{
        if (!isLoading && !isMoreLoading && isConnected !== null) {
            searchSongs()
        }
      }, [searchQuery, currentPage, isConnected])

    
    useEffect(()=>{
        if(song && actionType !== undefined){
            updateSongs(song, actionType)
            switch(actionType){
                case ActionType.FavoritesAdd: setSnackMessage(`${song?.name} added to Favorites`); break;
                case ActionType.FavoritesRemove: setSnackMessage(`${song?.name} removed from Favorites`); break;
                case ActionType.Add: setSnackMessage(`${song?.name} added to playlist`); break;
                case ActionType.Remove: setSnackMessage(`${song?.name} removed from playlist`); break;
            }
        }
    }, [song, actionType])


    const searchSongs = useCallback(async() => {
        currentPage > 1? setIsMoreLoading(true) : setIsLoading(true)
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


    const updateSongs = useCallback((song: Song, actionType: ActionType) => {
        const idx = songs.findIndex(s=>s.id === song.id)
        let newSongs = [...songs]
        if(idx !== -1) {
            newSongs[idx] = {...songs[idx], isFavorite: actionType === ActionType.FavoritesAdd? true: false}
            setSongs(newSongs)
            // setSnackMessage(`${song.name} ${actionType === ActionType.FavoritesAdd? 'added to': 'removed from'} Favorites`)
            // console.log(`${song.name} ${actionType === ActionType.FavoritesAdd? 'added to': 'removed from'} Favorites`)
        }
    }, [songs])
    

    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
        setSearchQuery(searchQuery)
        setCurrentPage(1)
    },[])


    const handleFavoritesChange = useCallback(async (song: Song) => {
        console.log(songs.length)
        if(!song.isFavorite){
            let songWithChords = undefined
            const data = await repository.searchSongChords(song)
            if(data.data && data.data.chords){
                songWithChords = {chords: data.data.chords, ...song}
                const resultDb = await repository.addSongToPlaylist(songWithChords, 1)
                console.log(resultDb)
                updateSongs(song, ActionType.FavoritesAdd)
            }      
        }
        else {
            const resultDb = await repository.removeSongFromPlaylist(song.id, 1)
            console.log(resultDb)
            updateSongs(song, ActionType.FavoritesRemove)
        }
    }, [songs])


    return {
        songs, 
        searchQuery, 
        currentPage, 
        isLoading,
        isMoreLoading,
        isConnected,
        snackMessage,
        // isOnline,
        // isError,
        // errorMessage,
        // message,
        // searchSongs,
        handlePageChanged,
        handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
import { useNetInfo } from "@react-native-community/netinfo"
import { useCallback, useEffect, useState } from 'react'
import { Song } from "../model/domain/types"
import { ActionType } from "../model/types"
import Repository from "../repository/Repository"


function useSongListViewModel(song: Song|undefined, actionType: ActionType|undefined, message: string|undefined) {
    console.log('ViewModel')
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState(()=>[] as Song[])
    console.log(songs.length)
    const [searchQuery, setSearchQuery] = useState('')
    const [isTodaysTop, setIsTodaysTop] = useState(true)
    const [snackMessage, setSnackMessage] = useState(message)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)

    const {isConnected} = useNetInfo()

    useEffect(()=>{
        if (!isLoading && !isMoreLoading && isConnected !== null) {
            searchSongs()
        }
      }, [searchQuery, currentPage, isConnected, isTodaysTop])

    
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


    const updateFavoriteSongs = async(songsData?: Array<Song>) => {
        const songsList = songsData? songsData: songs
        console.log('updateFavoriteSongs')
        // console.log(songsData.length)
        try {
            const favoritesData = await repository.findFavoriteSongsIds(songsList.map(song => song.id))
            // console.log(favoritesData)
            if (favoritesData.ok && favoritesData.data && favoritesData.data.length > 0) {
                // console.log('Got favs')
                const songsWithFavorites = songsList.map(song => {
                    if (favoritesData.data?.includes(song.id)) song.isFavorite = true
                    return song
                })
                currentPage > 1? setSongs(prev=>[...prev, ...songsWithFavorites]) : setSongs(songsWithFavorites)
                    // setSongs(songsWithFavorites)
                // setSongs(songsWithFavorites) 
            }
            else {
                currentPage > 1? setSongs(prev=>[...prev, ...songsList]) : setSongs(songsList)
                // setSongs(songsData.data)
            }
        } catch {

        }
    }
    // , [songs, currentPage])

    
    const searchSongs = useCallback(async() => {
    // const searchSongs = async() => {
        currentPage > 1? setIsMoreLoading(true) : setIsLoading(true)
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}, today\'s top ${isTodaysTop}`)
        
        try {
            const songsData = await repository.fetchSongs(searchQuery, currentPage, isTodaysTop)
            if(songsData.ok && songsData.data && songsData.data.length > 0){
                // console.log(songsData.data.length)
                await updateFavoriteSongs(songsData.data)
            }
        }catch(err){
            console.log('catch')
        }finally{
            // fetching.current = false
            // currentPage > 1? setIsMoreLoading(false) : setIsLoading(false)
            setIsLoading(false)
            setIsMoreLoading(false)
        }
    // }
    }, [searchQuery, currentPage, isTodaysTop])
    
    
    const handlePageChanged = useCallback(()=>{
    // const handlePageChanged = ()=>{
        setCurrentPage(prev=>prev+1)
    // }
    }, [currentPage])


    const updateSongs = useCallback((song: Song, actionType: ActionType) => {
    // const updateSongs = (song: Song, actionType: ActionType) => {
        const idx = songs.findIndex(s=>s.id === song.id)
        let newSongs = [...songs]
        if(idx !== -1) {
            newSongs[idx] = {...songs[idx], isFavorite: actionType === ActionType.FavoritesAdd? true: false}
            setSongs(newSongs)
            // setSnackMessage(`${song.name} ${actionType === ActionType.FavoritesAdd? 'added to': 'removed from'} Favorites`)
            // console.log(`${song.name} ${actionType === ActionType.FavoritesAdd? 'added to': 'removed from'} Favorites`)
        }
    // }
    }, [songs])
    

    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
    // const handleChangeSearchQuery = (searchQuery: string) => {
        setSearchQuery(searchQuery)
        setCurrentPage(1)
    // }
    }, [])


    const handleChipSelectionChange = useCallback((selection: 'today'|'all-time') => {
        console.log(selection)
        console.log('-----------------------------')
        setIsTodaysTop(selection === 'today'? true: false)
    }, [isTodaysTop])


    const handleFavoritesChange = useCallback(async (song: Song) => {
    // const handleFavoritesChange = async (song: Song) => {
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
    // }
    }, [songs])


    return {
        songs, 
        searchQuery, 
        currentPage, 
        isLoading,
        isMoreLoading,
        isConnected,
        isTodaysTop,
        snackMessage,
        // isOnline,
        // isError,
        // errorMessage,
        // message,
        searchSongs,
        updateFavoriteSongs,
        handleChipSelectionChange,
        handlePageChanged,
        handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
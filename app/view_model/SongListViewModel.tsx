import { useNetInfo } from "@react-native-community/netinfo"
import { useCallback, useEffect, useState } from 'react'
import { Song } from "../model/domain/types"
import { Action, ActionType } from "../model/types"
import Repository from "../repository/Repository"


function useSongListViewModel() {
    console.log('ViewModel')
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState(()=>[] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTodaysTop, setIsTodaysTop] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const {isConnected} = useNetInfo()


    useEffect(()=>{
        if (!isLoading && !isMoreLoading && isConnected !== null) {
            searchSongs()
        }
      }, [searchQuery, currentPage, isConnected, isTodaysTop])


    const setFavoriteSongs = async(songsData?: Array<Song>) => {
        const songsList = songsData? songsData: songs
        console.log('setFavoriteSongs')
        try {
            const favoritesData = await repository.findFavoriteSongsIds(songsList.map(song => song.id))
            console.log(favoritesData)
            if (favoritesData.ok && favoritesData.data && favoritesData.data.length > 0) {
                const songsWithFavorites = songsList.map(song => {
                    if (favoritesData.data?.includes(song.id)) song.isFavorite = true
                    return song
                })
                currentPage > 1? setSongs(prev=>[...prev, ...songsWithFavorites]) : setSongs(songsWithFavorites)
            }
            else {
                currentPage > 1? setSongs(prev=>[...prev, ...songsList]) : setSongs(songsList)
            }
        } catch {

        }
    }
    // , [songs, currentPage])

    
    const searchSongs = useCallback(async() => {
        currentPage > 1? setIsMoreLoading(true) : setIsLoading(true)
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}, today\'s top ${isTodaysTop}`)
        try {
            const songsData = await repository.fetchSongs(searchQuery, currentPage, isTodaysTop)
            if(songsData.ok && songsData.data && songsData.data.length > 0){
                await setFavoriteSongs(songsData.data)
            }
        }catch(err){
            console.log('catch')
        }finally{
            setIsLoading(false)
            setIsMoreLoading(false)
        }
    }, [searchQuery, currentPage, isTodaysTop])
    
    
    const handlePageChanged = useCallback(()=>{
        setCurrentPage(prev=>prev+1)
    }, [currentPage])
    

    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
        setSearchQuery(searchQuery)
        setCurrentPage(1)
    }, [])


    const handleChipSelectionChange = useCallback((selection: 'today'|'all-time') => {
        setIsTodaysTop(selection === 'today'? true: false)
    }, [isTodaysTop])


    const updateSongsList = useCallback((e: Action) => {
        const idx = songs.findIndex(s=>s.id === e.song.id)
        let newSongs = [...songs]
        if(idx === -1) return 
        newSongs[idx] = {...songs[idx], isFavorite: e.action === ActionType.FavoritesAdd? true: false}
        setSongs(newSongs)
    }, [songs])


    const handleFavoritesChange = useCallback(async (e: Action) => {
        switch(e.action) {
            case ActionType.FavoritesAdd: {
                console.log('Adding song -----------')
                console.log(e.song)
                let songWithChords = undefined
                const data = await repository.searchSongChords(e.song)
                if(data.data && data.data.chords){
                    songWithChords = {chords: data.data.chords, ...e.song}
                    const resultDb = await repository.addSongToPlaylist(songWithChords, 1)
                    console.log(resultDb)
                    updateSongsList(e)
                }  
                break;
            }
            case ActionType.FavoritesRemove: {
                console.log('Removing song -----------')
                console.log(e.song)
                const resultDb = await repository.removeSongFromPlaylist(e.song.id, 1)
                console.log(resultDb)
                updateSongsList(e)
                break;
            }
            default:
                console.log(e.action)
                console.warn('No action to worry about')
        }
    }, [updateSongsList])


    return {
        songs, 
        searchQuery, 
        currentPage, 
        isLoading,
        isMoreLoading,
        isConnected,
        isTodaysTop,
        searchSongs,
        handleChipSelectionChange,
        handlePageChanged,
        handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
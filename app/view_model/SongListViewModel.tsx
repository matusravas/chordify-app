import Repository from "../repository/Repository"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Song } from "../model/domain/types"
import { useEffectAfterMount } from "../utils/hooks"
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";

// const useInternetInfo = () => {
//     const {isInternetReachable} = useNetInfo()
    
//     useEffect(()=> {
//         if(isInternetReachable === null){
//             NetInfo.refresh()
//         }
//     }, [isInternetReachable])
//     return {isOnline: isInternetReachable}
// }


function useSongListViewModel() {
    // const {isOnline} = useInternetInfo()
    // console.log(`Is reachable ${isOnline}`)
    // const _ingoreNetworkInfo = netInfo.isConnected? true: false
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTop100, setIsTop100] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isOnline, setIsOnline] = useState(true)
    const [isFetched, setIsFetched] = useState(false)
    const [isError, setIsError] = useState(false)
    const [searchOffline, setSearchOffline] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    // console.log(netInfo.isInternetReachable)
    // console.log(`Is online: ${netInfo.isInternetReachable}`)
    // console.log(`Is reachable: ${netInfo.isInternetReachable}`)
    // useEffect(()=>{
    //     setIsOnline(netInfo.isInternetReachable? true: false)
    // },[netInfo])

    const searchSongs = useCallback(async() => {
        // Todo catch is not working properly in AXIOS Service level
        setIsLoading(true)
        setSongs([])
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
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
                if(songsData.online!==undefined) setIsOnline(songsData.online)
            }
            // else if(songsData.error) {
            //     console.log('!!!!!!!!!!!!!!!!!!!!!')
            //     // setSearchOffline(true)
            //     // Todo search for offline in case no data from server. Handle the logic in REPOSITORY???
            //     // setIsError(true)
            //     // setErrorMessage(data.error?data.error: '')
            // }
        }catch(err){
            console.log('catch')
        }finally{
            setIsLoading(false)
        }
    }, [searchQuery])
    
    
    useEffect(()=>{
        searchSongs()
    }, [searchQuery, currentPage])


    const updateFavoriteSongs = useCallback((song: Song) => {
        console.log('Update fav')
        console.log(songs.length)
        const idx = songs.findIndex(s=>s.id === song.id)
        let newSongs = [...songs]
        if(idx !== -1) {
            newSongs[idx] = {...songs[idx], isFavorite: !song.isFavorite}
            setSongs(newSongs)
        }
    }, [songs])
    

    const handleChangeSearchQuery = useCallback((searchQuery: string) => {
        // setSongs([])
        setSearchQuery(searchQuery)
    },[])


    const handleFavoritesChange = useCallback((song: Song, playlistId: number =1) => {
        console.log(songs.length)
        console.log(song, playlistId)
        if(!song.isFavorite){
            const searchSongChordsAndInsertToFavorites = async() => {
                let songToInsert = undefined
                try{
                    const data = await repository.searchSongChords(song)
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
    }, [songs])

    return {
        songs, 
        searchQuery, 
        currentPage, 
        isLoading,
        isOnline,
        isError,
        errorMessage,
        message,
        searchSongs,
        setSearchQuery: handleChangeSearchQuery, 
        handleFavoritesChange
    }
}

export default useSongListViewModel
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


function usePlaylistSongsViewModel(playlistId: number) {
    // const {isOnline} = useInternetInfo()
    // console.log(`Is reachable ${isOnline}`)
    // const _ingoreNetworkInfo = netInfo.isConnected? true: false
    const repository = Repository.getInstance()
    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    // const [currentTimestamp, seCurrentTimestamp] = useState(0)
    const currentTimestamp = useRef(0)
    const endReached = useRef(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMoreLoading, setIsMoreLoading] = useState(false)


    const searchSongsInPlaylist = useCallback(async() => {
        if (endReached.current) return
        currentTimestamp.current > 0? setIsMoreLoading(true) : setIsLoading(true)
        // setSongs([])
        // console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        console.log(playlistId)
        try {
            // const resultSongs = playlistId === 0? await repository.findLastSavedSongs(searchQuery, currentTimestampAdded):
            //! Todo must return minimum || maximum timestamp based on sort to determine if we scrolled all elements
            //! Todo must return minimum || maximum timestamp based on sort to determine if we scrolled all elements
            //! Todo must return minimum || maximum timestamp based on sort to determine if we scrolled all elements
            //! Todo must return minimum || maximum timestamp based on sort to determine if we scrolled all elements
            //! Todo must return minimum || maximum timestamp based on sort to determine if we scrolled all elements
            //! Todo must return minimum || maximum timestamp based on sort to determine if we scrolled all elements
            const resultSongs = await repository.findSavedSongs(playlistId, searchQuery, currentTimestamp.current)
            // console.log(resultSongs.data.slice(-1)[0].timestampAddedToPlaylist)
            if(resultSongs.ok && resultSongs.data && resultSongs.data.length > 0){
                console.log('Data----')
                console.log(resultSongs.data?.slice(-1)[0])
                const timestamp = resultSongs.data?.slice(-1)[0].timestampAddedToPlaylist
                if (timestamp) currentTimestamp.current = timestamp
                
                const resultFavorites = await repository.findFavoriteSongsIds(resultSongs.data.map(song => song.id))
                // console.log(favoritesData)
                if (resultFavorites.ok && resultFavorites.data && resultFavorites.data.length > 0) {
                    // console.log('Got favs')
                    const songsWithFavorites = resultSongs.data.map(song => {
                        if (resultFavorites.data?.includes(song.id)) song.isFavorite = true
                        return song
                    })
                    console.log('songsWithFavorites[0].name')
                    currentTimestamp.current > 0? setSongs(prev=>[...prev, ...songsWithFavorites]) : setSongs(songsWithFavorites)
                    // console.log(songs) 
                }
                else {
                    console.log('songsData.data')
                    currentTimestamp.current > 0? setSongs(prev=>[...prev, ...resultSongs.data]) : setSongs(resultSongs.data)
                }
                // if(songsData.online!==undefined) setIsOnline(songsData.online)
            }
            else{
                endReached.current = true
            }
            // else if(songsData.error) {
            //     console.log('!!!!!!!!!!!!!!!!!!!!!')
            //     // setSearchOffline(true)
            //     // Todo search for offline in case no data from server. Handle the logic in REPOSITORY???
            //     // setIsError(true)
            //     // setErrorMessage(data.error?data.error: '')
            // }
        }catch(err){
            console.log(err)
            console.log('catch')
        }finally{
            // currentTimestamp.current > 0? 
            setIsMoreLoading(false)
            setIsLoading(false)
        }
    }, [searchQuery])
    
    
    useEffect(()=>{
        searchSongsInPlaylist()
    }, [searchQuery])


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
    },[])


    const handleFavoritesChange = useCallback((song: Song, playlistId: number =1) => {
        if(!song.isFavorite){
            const searchSongChordsAndInsertToFavorites = async() => {
                let songToInsert = undefined
                try{
                    const resultChords = await repository.searchSongChords(song)
                    if(resultChords.data && resultChords.data.chords) {
                        songToInsert = {chords: resultChords.data.chords, ...song}
                        const resultInsert = await repository.addSongToPlaylist(songToInsert, playlistId)
                        updateFavoriteSongs(song)
                    }
                }catch(err){
                    // setIsError(true)
                    // setErrorMessage(err)
                }
            }
            searchSongChordsAndInsertToFavorites()
        }
        else if (song.isFavorite && playlistId !== 1){
            const removeSong = async() => {
                const resultDelete = await repository.removeSongFromPlaylist(song.id, playlistId)
                // console.log(resultDb)
                updateFavoriteSongs(song)
            }
            removeSong()
        }
        else {
            const removeSong = async() => {
                const resultDelete = await repository.removeSongFromPlaylist(song.id, playlistId)
                const idx = songs.findIndex(s=>s.id === song.id)
                let newSongs = [...songs]
                newSongs.splice(idx, 1)
                setSongs(newSongs)
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
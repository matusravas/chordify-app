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
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)


    const searchSongsPlaylist = useCallback(async() => {
        setIsLoading(true)
        setSongs([])
        // console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        console.log(playlistId)
        try {
            const resultSongs = playlistId === 0? await repository.findLastSavedSongs(searchQuery, currentPage):
                await repository.findSavedSongs(playlistId, searchQuery, currentPage)
            if(resultSongs.ok && resultSongs.data && resultSongs.data.length > 0){
                // console.log(songsData.data.length)
                const resultFavorites = await repository.findFavoriteSongsIds(resultSongs.data.map(song => song.id))
                // console.log(favoritesData)
                if (resultFavorites.ok && resultFavorites.data && resultFavorites.data.length > 0) {
                    // console.log('Got favs')
                    const songsWithFavorites = resultSongs.data.map(song => {
                        if (resultFavorites.data?.includes(song.id)) song.isFavorite = true
                        return song
                    })
                    console.log('songsWithFavorites[0].name')
                    setSongs(songsWithFavorites) 
                    // console.log(songs) 
                }
                else {
                    console.log('songsData.data')
                    setSongs(resultSongs.data)
                }
                // if(songsData.online!==undefined) setIsOnline(songsData.online)
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
        searchSongsPlaylist()
    }, [searchQuery, currentPage])


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
        searchQuery,
        handleChangeSearchQuery,
        handleFavoritesChange,
        searchSongsPlaylist
    }
}

export default usePlaylistSongsViewModel
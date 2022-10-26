import Repository from "../repository/Repository"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Playlist, Song } from "../model/domain/types"
import { useEffectAfterMount } from "../utils/hooks"
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

// const useInternetInfo = () => {
//     const {isInternetReachable} = useNetInfo()

//     useEffect(()=> {
//         if(isInternetReachable === null){
//             NetInfo.refresh()
//         }
//     }, [isInternetReachable])
//     return {isOnline: isInternetReachable}
// }


function useSongToPlaylistModalViewModel() {
    // const {isOnline} = useInternetInfo()
    // console.log(`Is reachable ${isOnline}`)
    // const _ingoreNetworkInfo = netInfo.isConnected? true: false
    const repository = Repository.getInstance()
    const [playlists, setPlaylists] = useState([] as Playlist[])

    // useEffect(() => {
    //     search()
    // }, [])

    const searchPlaylists = useCallback(async() => {
        try {
            let result = await repository.findPlaylistInfo()
            if (result.ok && result.data && result.data.length > 0) {
                // result.unshift({id: 0, name: 'Last saved', songsCount: 0, timestampVisit: 0})
                setPlaylists(result.data)
            }
            // setPlaylists(result)
        } catch {

        }
    }, [])
    
    const handleSaveSongToPlaylist = useCallback(async(playlist: string, song: Song) => {
        return
        try {
            let result = await repository.addNewPlaylist(playlist)
            if (result) {
                // result.unshift({id: 0, name: 'Last saved', songsCount: 0, timestampVisit: 0})
                // setPlaylists(result.data)
            }
            // setPlaylists(result)
        } catch {

        }
    }, [])
    
    // Todo create only one function it can recieve playlistName | playlist (with ID). Decide aferwards based on the type if 
    // Todo insert playlist as well, when ID is missing and only playlist name was provided
    const handleSaveSongToNewPlaylist = useCallback(async(playlistName: string, song: Song) => {
        console.log(song)
        console.log(playlistName)
        // return 
        try {
            // Todo first add new playlist then retrieve its ID and save song to it
            let result = await repository.addNewPlaylist(playlistName)
            if (result) {
                // result.unshift({id: 0, name: 'Last saved', songsCount: 0, timestampVisit: 0})
                // setPlaylists(result.data)
            }
            // setPlaylists(result)
        } catch {

        }
    }, [])

    return {
        playlists,
        searchPlaylists,
        handleSaveSongToPlaylist,
        handleSaveSongToNewPlaylist
    }
}

export default useSongToPlaylistModalViewModel
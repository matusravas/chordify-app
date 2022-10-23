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


function usePlaylistViewModel() {
    // const {isOnline} = useInternetInfo()
    // console.log(`Is reachable ${isOnline}`)
    // const _ingoreNetworkInfo = netInfo.isConnected? true: false
    const repository = Repository.getInstance()
    const [playlists, setPlaylists] = useState([] as Playlist[])

    // useEffect(() => {
    //     search()
    // }, [])

    const search = async () => {
        try {
            let result = await repository.findPlaylistInfo()
            if (result.ok && result.data && result.data.length > 0) {
                // result.unshift({id: 0, name: 'Last saved', songsCount: 0, timestampVisit: 0})
                setPlaylists(result.data)
            }
            // setPlaylists(result)
        } catch {

        }
    }

    return {
        playlists,
        search
    }
}

export default usePlaylistViewModel
import Repository from "../repository/Repository"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { PlaylistInfo, Song } from "../model/domain/types"
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


function usePlaylistViewModel() {
    // const {isOnline} = useInternetInfo()
    // console.log(`Is reachable ${isOnline}`)
    // const _ingoreNetworkInfo = netInfo.isConnected? true: false
    const repository = Repository.getInstance()
    const [playlists, setPlaylists] = useState([] as PlaylistInfo[])
    
    useEffect(()=>{
        const search =async () => {
            try{
                const playlistInfos = await repository.findPlaylistInfo()
                if(playlistInfos && playlistInfos.length > 0) setPlaylists(playlistInfos)
            }catch{

            }
        }
        search()
    }, [])

    return {
        playlists
    }
}

export default usePlaylistViewModel
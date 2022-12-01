import { useCallback, useState } from 'react';
import { Playlist } from "../model/domain/types";
import Repository from "../repository/Repository";

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
    //     searchPlaylists()
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
    
    

    return {
        playlists,
        searchPlaylists
    }
}

export default usePlaylistViewModel
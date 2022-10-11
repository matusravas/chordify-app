import Repository from "../repository/Repository"
import React, {useState, useEffect, useRef, useCallback} from 'react'
import { Song } from "../model/domain/types"
import { useEffectAfterMount } from "../utils/hooks"

// class SongListViewModel {
//     //todo  this should be hook I guess
//     static _instance: SongListViewModel

//     repository = Repository.getInstance()

//     private constructor() {
        
//     }
// }

function useSongListViewModel() {

    const repository = Repository.getInstance()

    const [songs, setSongs] = useState([] as Song[])
    const [searchQuery, setSearchQuery] = useState('')
    const [isTop100, setIsTop100] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    // const isMounted = useRef(false)
    
    useEffectAfterMount(()=>{
        // if(isMounted.current){
            // const fetch = async() =>{
            //     const result = await repository.fetchSongs(searchQuery, currentPage)
            //     if(result.ok) setSongs(result.data)
            //     else if(result.error) setIsError(true); setErrorMessage(result.error?result.error: '')
            // }
            // fetch()
        // }
        // isMounted.current = true
    }, [])
    
    useEffect(()=>{
        console.log(`Performing search, query: ${searchQuery}, page: ${currentPage}`)
        const fetch = async() =>{
            const result = await repository.fetchSongs(searchQuery, currentPage, isTop100)
            if(result.ok) {
                setSongs(result.data)
            }
            else if(result.error) setIsError(true); setErrorMessage(result.error?result.error: '')
        }

        fetch()
    }, [searchQuery, currentPage])

    const handleAddToPlaylist = (song: Song, playlistId: number =1)=>{
        console.log(repository.addSongToPlaylist)
        repository.addSongToPlaylist(song, playlistId).then(res=>{
            console.log('inserting')
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
        // console.log(song, playlistId)
        // const insert = async() => {
        //     console.log('running insert')
        //     const result = await repository.addSongToPlaylist(song, playlistId)
        //     console.log(result)
        // }
        // insert()
        
    }

    return [songs, searchQuery, currentPage, setSongs, setSearchQuery, setCurrentPage, handleAddToPlaylist] as const
}

export default useSongListViewModel
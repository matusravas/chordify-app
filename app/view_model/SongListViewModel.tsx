import Repository from "../repository/Repository"
import React, {useState, useEffect, useRef} from 'react'
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

    return [songs, searchQuery, currentPage, setSongs, setSearchQuery, setCurrentPage] as const
}

export default useSongListViewModel
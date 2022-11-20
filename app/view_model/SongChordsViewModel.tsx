import Repository from "../repository/Repository"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Playlist, Song } from "../model/domain/types"

// const useInternetInfo = () => {
//     const {isInternetReachable} = useNetInfo()

//     useEffect(()=> {
//         if(isInternetReachable === null){
//             NetInfo.refresh()
//         }
//     }, [isInternetReachable])
//     return {isOnline: isInternetReachable}
// }


function useSongChordsViewModel(song_: Song) {
    const repository = Repository.getInstance()
    const [song, setSong] = useState(song_)
    const [html, setHtml] = useState<any>({ html: '' })
    

    const handleFavoritesChange = useCallback(async () => {
        // console.log(song)
        // return
        if(!song.isFavorite){
            let songWithChords = undefined
            const data = await repository.searchSongChords(song)
            if(data.data && data.data.chords){
                songWithChords = {chords: data.data.chords, ...song}
                const resultDb = await repository.addSongToPlaylist(songWithChords, 1)
                if(resultDb.ok) {
                    const newSong = {...song, isFavorite: true}
                    setSong(newSong)
                }
            }      
        }
        else {
            const resultDb = await repository.removeSongFromPlaylist(song.id, 1)
            console.log(resultDb)
            if(resultDb.ok) {
                const newSong = {...song, isFavorite: false}
                setSong(newSong)
            }
        }
    }, [song])
    

    useEffect(() =>{
        const getSongChords = async () => {
            try {
              const data = await repository.searchSongChords(song)
              console.log(data)
              if (data.data && data.data.chords) {
                setHtml({ html: data.data.chords })
              }
            } catch (err) {
              console.log(err)
            }
          }
          getSongChords()
    }, [])
    
    return {
        song,
        html,
        handleFavoritesChange
    }
}

export default useSongChordsViewModel
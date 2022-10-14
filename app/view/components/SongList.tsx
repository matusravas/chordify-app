import React, { useEffect, useRef, useState } from "react"
import { FlatList, ListRenderItem} from "react-native"
import { Song } from "../../model/domain/types"
import SongCard from "./SongCard"

interface RenderItemProps {
    item: Song,
    index: number
}

interface SongsListProps {
    songs: Song[], 
    onCardClick: (song: Song)=>void, 
    onFavoritesButtonClick: (song: Song)=>void,
    onPageChanged: ()=>void
}

const SongsList = ({songs, onCardClick, onFavoritesButtonClick, onPageChanged}: SongsListProps) =>{
    console.log('SongsList rerender')
    const flatListRef = useRef() as React.MutableRefObject<FlatList<Song>>
    console.log('Scroll position')

    useEffect(()=>{
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }, [songs])

    const renderItem = ({item: song}: RenderItemProps) => {
        return (
            <SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick}/>
        )
    }
    
    return (
        <FlatList
            ref={flatListRef}
            data={songs}
            renderItem={renderItem}

            keyExtractor={item => (item.id + (+item.isFavorite)).toString()}
        />
    )
}

export default SongsList
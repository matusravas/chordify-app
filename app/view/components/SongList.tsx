import React, { useEffect, useRef, useState } from "react"
import { FlatList, ListRenderItem} from "react-native"
import { Song } from "../../model/domain/types"
import { useEffectAfterMount } from "../../utils/hooks"
import SongCard from "./SongCard"

interface RenderItemProps {
    item: Song,
    index: number
}

interface SongsListProps {
    songs: Song[], 
    flatListRef: React.MutableRefObject<FlatList<Song>>,
    onCardClick: (song: Song)=>void, 
    onFavoritesButtonClick: (song: Song)=>void,
    onPageChanged: ()=>void
}

const SongsList = ({flatListRef, songs, onCardClick, onFavoritesButtonClick, onPageChanged}: SongsListProps) =>{
    console.log('SongsList rerender')

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
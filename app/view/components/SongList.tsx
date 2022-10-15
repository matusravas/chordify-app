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

// const SongsList = ({songs, onCardClick, onFavoritesButtonClick, onPageChanged}: SongsListProps) =>{
const SongsList = ({flatListRef, songs, onCardClick, onFavoritesButtonClick, onPageChanged}: SongsListProps) =>{
    console.log('SongsList rerender')
    console.log(songs[0]?.name)

    const renderItem = ({item: song}: RenderItemProps) => {
        return (
            <SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick}/>
        )
    }
    
    return (
        <FlatList
            ref={flatListRef}
            data={songs}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => (item.id).toString()}
        />
    )
}

export default SongsList
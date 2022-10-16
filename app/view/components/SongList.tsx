import React, { useEffect, useRef, useState } from "react"
import { FlatList, ListRenderItem} from "react-native"
import { Song } from "../../model/domain/types"
import { useEffectAfterMount } from "../../utils/hooks"
import SongCard from "./SongCard"
import NothingHere from "./NothingHere"

interface RenderItemProps {
    item: Song,
    index: number
}

interface SongsListProps {
    songs: Song[], 
    isFetched: boolean,
    flatListRef: React.MutableRefObject<FlatList<Song>>,
    onCardClick: (song: Song)=>void, 
    onFavoritesButtonClick: (song: Song)=>void,
    onMoreButtonClick: (song: Song)=>void,
    onPageChanged: ()=>void
}

// const SongsList = ({songs, onCardClick, onFavoritesButtonClick, onPageChanged}: SongsListProps) =>{
const SongsList = ({flatListRef, songs, onCardClick, onFavoritesButtonClick, onMoreButtonClick, isFetched}: SongsListProps) =>{
    console.log('SongsList rerender')

    const renderItem = ({item: song}: RenderItemProps) => {
        return (
            <SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick} onMoreButtonClick={onMoreButtonClick}/>
        )
    }
    
    return (
        <FlatList
            ref={flatListRef}
            contentContainerStyle={{ flexGrow: 1 }}
            data={songs}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => (item.id).toString()}
            ListEmptyComponent={isFetched?NothingHere:null}
        />
    )
}

export default SongsList
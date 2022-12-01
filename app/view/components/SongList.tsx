import React from "react"
import { FlatList, NativeScrollEvent, NativeSyntheticEvent} from "react-native"
import { Song } from "../../model/domain/types"
import SongCard from "./SongCard"
import NothingHere from "./NothingHere"
import ListFooter from "./ListFooter"

interface RenderItemProps {
    item: Song,
    // index: number
}

interface SongsListProps {
    songs: Song[],
    // isFetched: boolean,
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
    isMoreLoading: boolean,
    flatListRef: React.MutableRefObject<FlatList<Song>>,
    onCardClick: (song: Song)=>void, 
    onFavoritesButtonClick: (song: Song)=>void,
    onMoreButtonClick: (song: Song)=>void,
    onPageChanged: ()=>void
}

// const renderItem = ({item: song}: RenderItemProps) => {
//     return (
//         <SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick} onMoreButtonClick={onMoreButtonClick}/>
//     )
// }

// const SongsList = ({songs, onCardClick, onFavoritesButtonClick, onPageChanged}: SongsListProps) =>{
const SongsList = ({flatListRef, songs, onCardClick, onFavoritesButtonClick, onMoreButtonClick, isMoreLoading, onPageChanged, onScroll}: SongsListProps) =>{
    console.log('SongsList rerender')

    
    // const memoizedRender = useMemo(()=> renderItem, [songs])
    return (
        <FlatList
            ref={flatListRef}
            contentContainerStyle={{ flexGrow: 1 }}
            data={songs}
            // keyboardDismissMode={'on-drag'}
            // keyboardShouldPersistTaps={'always'}
            // keyboardDismissMode={'none'}
            // estimatedItemSize={80}
            // onScrollBeginDrag={(e)=>onScroll(e)}
            // onScrollEndDrag={(e)=>onScroll(e)}
            onScroll={(e) => onScroll(e)}
            // onScroll={Animated.event(
            //     [{nativeEvent: {contentOffset: {y: anim}}}],
            //     {useNativeDriver: false}
            // )}
            scrollEventThrottle={50}
            showsVerticalScrollIndicator={false}
            // renderItem={memoizedRender}
            renderItem={({item: song})=><SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick} onMoreButtonClick={onMoreButtonClick}/>
            }
            onEndReachedThreshold={0}
            onEndReached={()=>onPageChanged()}
            keyExtractor={item => (item.id).toString()}
            // ListHeaderComponent={()=><SearchBar visible={true} searchQuery={''} onSearch={()=>{}} onScrollToTop={()=>{}}/>}
            // stickyHeaderIndices={[0]}
            // stickyHeaderHiddenOnScroll={true}
            // stickyHeaderHiddenOnScroll={true}
            ListEmptyComponent={NothingHere}
            ListFooterComponent={isMoreLoading ? ListFooter: null}
            ListFooterComponentStyle={{paddingBottom: 8}}
        />
    )
}

export default SongsList
// export default memo(SongsList, (prev, next) => prev.songs.map(song=>song.id + (+song.isFavorite)) === next.songs.map(song=>song.id + (+song.isFavorite)))
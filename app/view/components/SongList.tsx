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

    const renderItem = ({item: song}: RenderItemProps) => {
        return (
            <SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick}/>
        )
    }

    return (
        <FlatList
            
            // style={{ marginTop: 2}}
            data={songs}
            renderItem={renderItem}
            // onEndReachedThreshold={0.5}
            // onEndReached={onPageChanged}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default SongsList
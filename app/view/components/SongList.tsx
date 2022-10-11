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
    onAddToFavoritesClick: (song: Song)=>void,
    onPageChanged: ()=>void
}

const SongsList = ({songs, onCardClick, onAddToFavoritesClick, onPageChanged}: SongsListProps) =>{
    
    console.log('SongsList rerender')

    const renderItem = ({item: song}: RenderItemProps) => {
        return (
            <SongCard song={song} onSongCardClick={onCardClick} onAddToFavoitesButtonClick={onAddToFavoritesClick}/>
        )
    }

    return (
        <FlatList
            
            // style={{ marginBottom: 60}}
            data={songs}
            renderItem={renderItem}
            // onEndReachedThreshold={0.5}
            // onEndReached={onPageChanged}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default SongsList
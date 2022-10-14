import { useState } from "react"
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
    const [selectedItem, setSelectedItem] = useState(0)
    console.log('SongsList rerender')
    console.log(songs[22].isFavorite)

    const renderItem = ({item: song}: RenderItemProps) => {
        return (
            <SongCard song={song} onSongCardClick={onCardClick} onFavoritesButtonClick={onFavoritesButtonClick}/>
        )
    }

    const handleSelectedItem = (idx: number) =>{
        setSelectedItem(idx)
    }

    return (
        <FlatList

            // style={{ marginTop: 2}}
            data={songs}
            renderItem={renderItem}
            // extraData={selectedItem}
            // onEndReachedThreshold={0.5}
            // onEndReached={onPageChanged}

            keyExtractor={item => (item.id + (+item.isFavorite)).toString()}
        />
    )
}

export default SongsList
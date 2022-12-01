import { FlatList, View } from "react-native"
import { Playlist } from "../../model/domain/types"
import Icon, { Icons } from "../../res/icons/icons"
import PressableItem from "../components/PressableItem"
import SubmitButton from "../components/SubmitButton"


// const ListHeader = () => (
//     <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//         {/* <Icon size={20} type={Icons.MaterialCommunityIcons} name='plus' color={'#F7F7F7AA'} /> */}
//         <Text style={{ color: "#F7F7F7AA", fontWeight: '400', fontSize: 18 }}>Select from available playlists</Text>
//         <View style={{ alignSelf: 'stretch', borderBottomColor: "#F7F7F7AA", borderBottomWidth: 0.5, marginVertical: 10 }} />
//     </View>
// )



interface SelectPlaylistModalProps {
    playlists: Array<Playlist>,
    onPlaylistSelected: (playlistId: number) => void,
    onIsNewPlaylist: () => void
}

const SelectPlaylistModal = ({ playlists, onPlaylistSelected, onIsNewPlaylist }: SelectPlaylistModalProps) => (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', margin: 8, alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
            {/* <ListHeader /> */}
            <FlatList
                style={{ flexGrow: 0, marginBottom: 16 }}
                data={playlists}
                showsVerticalScrollIndicator={false}
                // renderItem={({ item }) => <PlaylistCardModal playlist={item} onPlaylistSelected={onPlaylistSelected} />
                renderItem={({ item }) => <PressableItem 
                    handler={() => onPlaylistSelected(item.id)}
                    text={item.name}
                    icon={true}
                    iconStyle={{size: 22, sizePressed: 20, iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-music-outline' }}
                />
                }
                keyExtractor={item => (item.id).toString()}
            />
        </View>
        <SubmitButton icon={<Icon size={20} type={Icons.MaterialCommunityIcons} name='plus' color={'#F7F7F7AA'} />} onSubmit={onIsNewPlaylist} text={'Create new playlist'} />
        {/* <ListFooter onIsNewPlaylist={onIsNewPlaylist} /> */}
    </View>
)

export default SelectPlaylistModal
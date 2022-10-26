import { Box, Text, VStack, } from "@react-native-material/core"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Pressable, BackHandler, FlatList, TextInput, Button } from 'react-native';
import Icon, { Icons } from "../../icons/icons";
import { Playlist } from "../../model/domain/types";
import { ModalScreenProps } from "../../navigation/types";
import Platform from "../../platform/Platform";
import usePlaylistViewModel from "../../view_model/PlaylistViewModel";
import useSongToPlaylistModalViewModel from "../../view_model/SongToPlaylistModalViewModel";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistCardModal from "../components/PlaylistCardModal";


// const ListHeader = () => (
//     <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//         <Text color="#F7F7F7AA">Select from playlist</Text>
//     </View>
// )

interface ListFooterProps {
    onIsNewPlaylist: () => void
}

const ListFooter = ({ onIsNewPlaylist }: ListFooterProps) => (
    <Pressable style={({ pressed }) => [{
        backgroundColor: pressed ? '#1FC159AA' : '#1FC159CC',
        borderRadius: 10,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    }]} onPress={onIsNewPlaylist}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon size={20} type={Icons.MaterialCommunityIcons} name='plus' color={'#F7F7F7AA'} />
            <Text color="#F7F7F7AA">Create new playlist</Text>
        </View>
    </Pressable>
)


const SelectPlaylistModal = ({ song, playlists, onPlaylistSelected, onIsNewPlaylist }: any) => (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', margin: 8 }}>
        {/* <ListHeader/> */}
        <FlatList
            data={playlists}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PlaylistCardModal playlist={item} onPlaylistSelected={onPlaylistSelected} />
            }
            keyExtractor={item => (item.id).toString()}
        />
        <ListFooter onIsNewPlaylist={onIsNewPlaylist} />
    </View>
)


const CreateNewPlaylistModal = ({ song, onSubmit }: any) => {
    const [value, setValue] = useState('')
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput value={value} textAlign='center' onChangeText={(text: string) => setValue(text)} selectionColor='#1FC159' placeholderTextColor='#F7F7F750' placeholder="Enter playlist name..." style={{ fontSize: 24, color: '#F7F7F750' }} />
            <Pressable style={({ pressed }) => [{
                backgroundColor: pressed ? '#1FC159AA' : '#1FC159CC',
                borderRadius: 10,
                // width: width / 2,
                height: 40,
                marginHorizontal: 30,
                margin: 8,
                alignItems: 'center',
                alignSelf: 'stretch',
                justifyContent: 'center',
                padding: 10
            }]} onPress={() => onSubmit(value, song)}>
                <Text color="#F7F7F7AA">Submit</Text>
            </Pressable>
            {/* <View style={{borderBottomWidth: 1 , borderBottomColor: '#000000'}}/> */}
        </View>
    )
}


const ModalMenuScreen = ({ route, navigation }: ModalScreenProps) => {
    const song = route.params.song
    const { playlists, searchPlaylists, handleSaveSongToNewPlaylist, handleSaveSongToPlaylist } = useSongToPlaylistModalViewModel()
    // const [modal, setModal] = useState(true)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [isNewPlaylist, setIsNewPlaylist] = useState(false)

    useFocusEffect(
        useCallback(() => {
            searchPlaylists()
        }, [])
    )

    // const handlePlaylistSelected = useCallback((playlist: Playlist) => {
    //     console.log(playlist.name)
    //     console.log(route.params.song)
    //      // navigation.pop(1)
    // }, [])


    const handleIsNewPlaylist = useCallback(() => {
        setIsNewPlaylist(true)
    }, [])


    // const handleSubmit = useCallback((playlistName: string) => {
    //     console.log(playlistName)
    //     // navigation navigate to new playlist but pop this screen from stack
    //     navigation.pop(1)
    // }, [])

    return (
        <View style={{ flex: 1, marginBottom: bottomTabBarHeight }}>
            {!isNewPlaylist && <SelectPlaylistModal song={song} playlists={playlists} onPlaylistSelected={handleSaveSongToPlaylist} onIsNewPlaylist={handleIsNewPlaylist} />}
            {isNewPlaylist && <CreateNewPlaylistModal song={song} onSubmit={handleSaveSongToNewPlaylist} />}
        </View>

    )
}

export default ModalMenuScreen
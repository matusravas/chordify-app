// import { Box, Text, VStack, } from "@react-native-material/core"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Pressable, BackHandler, FlatList, TextInput, Button, Text, TouchableNativeFeedback } from 'react-native';
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
            <Text style={{ color: "#F7F7F7AA", fontWeight: '500', fontSize: 16 }}>Create new playlist</Text>
        </View>
    </Pressable>
)


const ListHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* <Icon size={20} type={Icons.MaterialCommunityIcons} name='plus' color={'#F7F7F7AA'} /> */}
        <Text style={{ color: "#F7F7F7AA", fontWeight: '400', fontSize: 18 }}>Select from available playlists</Text>
    </View>
)


interface SelectPlaylistModalProps {
    playlists: Array<Playlist>,
    onPlaylistSelected: (playlistId: number) => void,
    onIsNewPlaylist: () => void
}

const SelectPlaylistModal = ({ playlists, onPlaylistSelected, onIsNewPlaylist }: SelectPlaylistModalProps) => (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', margin: 8, alignItems: 'center' }}>
        {/* {playlists.map(playlist=>(
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
            <Icon size={20} type={Icons.MaterialCommunityIcons} name={'playlist-music-outline'} color={'#F7F7F7AA'} />
            <Text style={{ fontSize: 18, margin: 15, fontWeight: '600', color: '#F7F7F7AA' }}>
              {playlist.name}
            </Text>
          </View>
        ))} */}
        <ListHeader />
        <FlatList
            style={{flexGrow: 0, marginBottom: 16}}
            data={playlists}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PlaylistCardModal playlist={item} onPlaylistSelected={onPlaylistSelected} />
            }
            keyExtractor={item => (item.id).toString()}
        />
        <ListFooter onIsNewPlaylist={onIsNewPlaylist} />
    </View>
)


interface CreateNewPlaylistModalProps {
    onSubmit: (playlistName: string) => void,
}

const CreateNewPlaylistModal = ({ onSubmit }: CreateNewPlaylistModalProps) => {
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
            }]} onPress={() => onSubmit(value)}>
                <Text style={{ color: "#F7F7F7AA" }}>Submit</Text>
            </Pressable>
            {/* <View style={{borderBottomWidth: 1 , borderBottomColor: '#000000'}}/> */}
        </View>
    )
}


const ModalMenuScreen = ({ route, navigation }: ModalScreenProps) => {
    const navigator = navigation.getId()
    const song = route.params.song
    const playlist = 'playlist' in route.params? route.params.playlist: undefined
    console.log(song, playlist)
    const title = `${song.artist} - ${song.name}`
    const { playlists, searchPlaylists, handleFavoritesChange, handleSaveSongToPlaylist, handleRemoveSongFromPlaylist } = useSongToPlaylistModalViewModel(song, playlist)
    // const [modal, setModal] = useState(true)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [action, setAction] = useState<'add' | null>(null)
    const [isNewPlaylist, setIsNewPlaylist] = useState(false)

    const items = [
        {
            title: song.isFavorite ? 'Saved as Favorite' : 'Add to Favorites',
            iconType: Icons.MaterialIcons, iconName: 'favorite', color: song.isFavorite ? '#1FC159CC' : '#F7F7F7AA',
            handler: () => handleFavoritesChange(song)
        },
        {
            title: navigator === 'songs' ? 'Add to playlist' : 'Add to another playlist',
            iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-plus', color: '#F7F7F7AA',
            handler: () => setAction('add')
        },
        ...navigator === 'playlists' ? [
            {
                title: 'Remove from this playlist',
                iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-remove', color: '#F7F7F7AA',
                handler: handleRemoveSongFromPlaylist
            }] : [],

        // {title: 'Add to favorites', titleAlt: 'Remove from favorites', iconType: Icons.MaterialIcons, iconTypeAlt: Icons.MaterialCommunityIcons, iconName: 'favorite-outline', iconNameAlt: 'heart-remove-outline'},
        // {title: 'Add to playlist', titleAlt: 'Remove from this playlist', iconType: Icons.MaterialCommunityIcons, iconTypeAlt: null, iconName: 'plus', iconNameAlt: null},
    ]

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({ headerTitle: title.length > 40 ? `${title.slice(0, 40)}...` : title })
            searchPlaylists()
        }, [])
    )

    const handleSaveSong = useCallback((playlist: number | string) => {
        handleSaveSongToPlaylist(song, playlist)
        navigation.pop(1)
    }, [])


    const handleIsNewPlaylist = useCallback(() => {
        setIsNewPlaylist(true)
    }, [])


    // const handleSubmit = useCallback((playlistName: string) => {
    //     console.log(playlistName)
    //     // navigation navigate to new playlist but pop this screen from stack
    //     navigation.pop(1)
    // }, [])

    return (
        <View style={{ flex: 1, marginBottom: bottomTabBarHeight, justifyContent: 'center', alignItems: 'center' }}>
            {!action ? <View>
                {items.map((item, idx) => (
                    //<TouchableNativeFeedback style={{}} onPress={() => { }} background={TouchableNativeFeedback.Ripple('#111317', false)}>
                        <View nativeID={idx.toString()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon size={20} type={item.iconType} name={item.iconName} color={item.color} />
                            <Text onPress={item.handler} style={{ fontSize: 18, margin: 15, fontWeight: '600', color: item.color }}>
                                {item.title}
                            </Text>
                        </View>
                    //</TouchableNativeFeedback>
                ))}
            </View> :
                action === 'add' ? <View style={{ flex: 1 }}>
                    {!isNewPlaylist && <SelectPlaylistModal playlists={playlists} onPlaylistSelected={handleSaveSong} onIsNewPlaylist={handleIsNewPlaylist} />}
                    {isNewPlaylist && <CreateNewPlaylistModal onSubmit={handleSaveSong} />}
                </View> :
                    <View>

                    </View>
            }

        </View>


    )
}

export default ModalMenuScreen
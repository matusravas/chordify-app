// import { Box, Text, VStack, } from "@react-native-material/core"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useRef, useState } from "react";
import { View, Pressable, Text } from 'react-native';
import Icon, { Icons } from "../../icons/icons";
import { ModalScreenProps } from "../../navigation/types";
import useSongToPlaylistModalViewModel from "../../view_model/SongToPlaylistModalViewModel";
import PressableItem from "../components/PressableItem";
import CreateNewPlaylistModal from "./CreateNewPlaylistModal";
import SelectPlaylistModal from "./SelectPlaylistModal";



const ModalMenuScreen = ({ route, navigation }: ModalScreenProps) => {
    const navigator = navigation.getId()
    const parent = navigator === 'songs'? 'Songs': 'PlaylistSongs'
    const songRecieved = useRef(route.params.song).current
    const [song, setSong] = useState(route.params.song)
    const playlist = 'playlist' in route.params ? route.params.playlist : undefined
    const title = `${song.artist} - ${song.name}`
    const { playlists, searchPlaylists, changeFavorite, handleSaveSongToPlaylist, handleRemoveSongFromPlaylist } = useSongToPlaylistModalViewModel(song, playlist)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [isAddToPlaylist, setIsAddToPlaylist] = useState(false)
    const [isNewPlaylist, setIsNewPlaylist] = useState(false)

    const handleFavoritesChange = () => {
        changeFavorite(song)
        const newSong = {...song, isFavorite: !song.isFavorite}
        setSong(newSong)
        navigation.getParent()?.setParams({song: song})
    }

    const items = [
        {
            title: song.isFavorite ? 'Added to Favorites' : 'Add to Favorites',
            iconType: Icons.MaterialIcons, iconName: 'favorite', color: song.isFavorite ? '#1FC159CC' : '#F7F7F7AA', colorPressed: song.isFavorite ? '#1FC15980' : '#F7F7F750',
            handler: handleFavoritesChange
        },
        {
            title: navigator === 'songs' ? 'Add to playlist' : 'Add to another playlist',
            iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-plus', color: '#F7F7F7AA', colorPressed: '#F7F7F750',
            handler: () => setIsAddToPlaylist(true)
        },
        ...navigator === 'playlists' ? [
            {
                title: 'Remove from this playlist',
                iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-remove', color: '#F7F7F7AA', colorPressed: '#F7F7F750',
                handler: handleRemoveSongFromPlaylist
            }] : [],

        // {title: 'Add to favorites', titleAlt: 'Remove from favorites', iconType: Icons.MaterialIcons, iconTypeAlt: Icons.MaterialCommunityIcons, iconName: 'favorite-outline', iconNameAlt: 'heart-remove-outline'},
        // {title: 'Add to playlist', titleAlt: 'Remove from this playlist', iconType: Icons.MaterialCommunityIcons, iconTypeAlt: null, iconName: 'plus', iconNameAlt: null},
    ]

    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                 headerTitle: title.length > 30 ? `${title.slice(0, 30)}...` : title, 
            headerLeft: () => <Pressable onPress={()=>{song.isFavorite === songRecieved.isFavorite? navigation.pop(): navigation.navigate(parent, {song: {...song, isFavorite: !song.isFavorite}})}}>
                <Icon type={Icons.MaterialCommunityIcons} name={'close'} color={'#F7F7F7'} style={{marginRight: 30}}/>
                </Pressable>
            })
            searchPlaylists()
        }, [song])
    )

    const handleSaveSong = useCallback((playlist: number | string) => {
        handleSaveSongToPlaylist(song, playlist)
        navigation.pop(1)
    }, [])


    const handleIsNewPlaylist = useCallback(() => {
        setIsNewPlaylist(true)
    }, [])


    return (
        <View style={{ flex: 1, marginBottom: bottomTabBarHeight, justifyContent: 'center', alignItems: 'center' }}>
            {isAddToPlaylist ? <View style={{ flex: 1 }}>
                {!isNewPlaylist && <SelectPlaylistModal playlists={playlists} onPlaylistSelected={handleSaveSong} onIsNewPlaylist={handleIsNewPlaylist} />}
                {isNewPlaylist && <CreateNewPlaylistModal onSubmit={handleSaveSong} />}
            </View> :
                (
                    items.map((item, idx) => (
                        <PressableItem key={idx}
                            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' } }
                            handler={item.handler}
                            text={item.title}
                            color={{color: item.color, colorPressed: item.colorPressed}}
                            icon={true}
                            iconStyle={{ iconType: item.iconType, iconName: item.iconName }}
                        />
                    ))
                )
            }
        </View>
    )
}

export default ModalMenuScreen
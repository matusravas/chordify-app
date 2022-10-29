// import { Box, Text, VStack, } from "@react-native-material/core"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Pressable, Text } from 'react-native';
import Icon, { Icons } from "../../icons/icons";
import { ModalScreenProps } from "../../navigation/types";
import useSongToPlaylistModalViewModel from "../../view_model/SongToPlaylistModalViewModel";
import CreateNewPlaylistModal from "./CreateNewPlaylistModal";
import SelectPlaylistModal from "./SelectPlaylistModal";



const ModalMenuScreen = ({ route, navigation }: ModalScreenProps) => {
    const navigator = navigation.getId()
    const song = route.params.song
    const playlist = 'playlist' in route.params ? route.params.playlist : undefined
    const title = `${song.artist} - ${song.name}`
    const { playlists, searchPlaylists, handleFavoritesChange, handleSaveSongToPlaylist, handleRemoveSongFromPlaylist } = useSongToPlaylistModalViewModel(song, playlist)
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [isAddToPlaylist, setIsAddToPlaylist] = useState(false)
    const [isNewPlaylist, setIsNewPlaylist] = useState(false)

    const items = [
        {
            title: song.isFavorite ? 'Saved as Favorite' : 'Add to Favorites',
            iconType: Icons.MaterialIcons, iconName: 'favorite', color: song.isFavorite ? '#1FC159CC' : '#F7F7F7AA', colorPressed: song.isFavorite ? '#1FC15920' : '#F7F7F750',
            handler: () => handleFavoritesChange(song)
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


    return (
        <View style={{ flex: 1, marginBottom: bottomTabBarHeight, justifyContent: 'center', alignItems: 'center' }}>
            {isAddToPlaylist ? <View style={{ flex: 1 }}>
                {!isNewPlaylist && <SelectPlaylistModal playlists={playlists} onPlaylistSelected={handleSaveSong} onIsNewPlaylist={handleIsNewPlaylist} />}
                {isNewPlaylist && <CreateNewPlaylistModal onSubmit={handleSaveSong} />}
            </View> :
                <View>
                    {items.map((item, idx) => (
                        <Pressable key={idx} children={({ pressed }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon size={20} type={item.iconType} name={item.iconName} color={item.color} />
                                <Text onPress={item.handler} style={{ fontSize: 18, margin: 15, fontWeight: '600', color: pressed ? item.colorPressed : item.color }}>
                                    {item.title}
                                </Text>
                            </View>
                            )} />
                    ))}
                </View>}
        </View>
    )
}

export default ModalMenuScreen
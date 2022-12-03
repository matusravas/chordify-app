import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, Pressable } from 'react-native';
import Icon, { Icons } from "../../res/icons/icons";
import { ModalScreenProps } from "../../navigation/types";
import useModalViewModel from "../../view_model/ModalViewModel";
import PressableItem from "../components/PressableItem";
import CreateNewPlaylistModal from "./CreateNewPlaylistModal";
import SelectPlaylistModal from "./SelectPlaylistModal";
import { useEffectAfterMount } from "../../utils/hooks";


const ModalMenuScreen = ({ route, navigation }: ModalScreenProps) => {
    const playlist = 'playlist' in route.params ? route.params.playlist : undefined
    const title = `${route.params.song.artist} - ${route.params.song.name}`
    const { playlists, song, actionType, menuItems, isAddToPlaylist, setIsAddToPlaylist, handleSongChanged } = useModalViewModel({ song: route.params.song, playlist })
    const bottomTabBarHeight = useBottomTabBarHeight()
    const [isNewPlaylist, setIsNewPlaylist] = useState(false)


    useFocusEffect(
        useCallback(() => {
            navigation.setOptions({
                headerTitle: title.length > 30 ? `${title.slice(0, 30)}...` : title,
                headerLeft: () =>
                    <Pressable onPress={() => {
                        navigation.pop()
                    }}>
                        <Icon type={Icons.MaterialCommunityIcons} name={'close'} color={'#F7F7F7'} style={{ marginRight: 30 }} />
                    </Pressable>
            })
        }, [song, actionType])
    )


    useEffectAfterMount(()=>{
        route.params.sendDataToParent({song: song, playlist, action: actionType})
        navigation.pop()
    }, [actionType])


    const handleSaveToPlaylist = useCallback((playlist: number | string) => {
        const playlistId = typeof (playlist) === 'number' ? playlist : undefined
        const playlistName = typeof (playlist) === 'string' ? playlist : undefined
        handleSongChanged('add', playlistId, playlistName)
        // navigation.pop(1)
        setIsAddToPlaylist(false)
    }, [])


    const handleIsNewPlaylist = useCallback(() => {
        setIsNewPlaylist(true)
    }, [])


    return (
        <View style={{ flex: 1, marginBottom: bottomTabBarHeight, justifyContent: 'center', alignItems: 'center' }}>
            {isAddToPlaylist ? <View style={{ flex: 1 }}>
                {!isNewPlaylist && <SelectPlaylistModal playlists={playlists} onPlaylistSelected={handleSaveToPlaylist} onIsNewPlaylist={handleIsNewPlaylist} />}
                {isNewPlaylist && <CreateNewPlaylistModal onSubmit={handleSaveToPlaylist} />}
            </View> :
                (
                    menuItems.map((item, idx) => (
                        <PressableItem 
                            key={idx}
                            style={{ alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            handler={item.handler}
                            text={item.title}
                            color={{ color: item.color, colorPressed: item.colorPressed }}
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
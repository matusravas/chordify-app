import { Box, Text, VStack, } from "@react-native-material/core"
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Pressable, BackHandler, FlatList } from 'react-native';
import { Playlist } from "../../model/domain/types";
import { ModalScreenProps } from "../../navigation/types";
import Platform from "../../platform/Platform";
import usePlaylistViewModel from "../../view_model/PlaylistViewModel";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistCardModal from "../components/PlaylistCardModal";

const ModalMenuScreen = ({route, navigation}: ModalScreenProps) => {
    const { playlists, search } = usePlaylistViewModel()
    const [visible, setVisible] = useState(false)

    useFocusEffect(() => {
        search()
    })

    const handlePlaylistSelected = useCallback((playlist: Playlist) => {
        console.log(playlist.name)
        console.log(route.params.song)
    }, [])

    const width = Platform.getWidth()
    const height = Platform.getHeight()
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <Pressable style={({ pressed }) => [{
                    backgroundColor: pressed ? '#1FC15950' : '#1FC159',
                    borderRadius: 10,
                    width: width / 2,
                    margin: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                }]} onPress={() => navigation.navigate('ModalNewPlaylist', {song: route.params.song})}>
                    <Text color="#F7F7F7AA">Create playlist</Text>
                </Pressable>
                {/* <View style={{borderBottomWidth: 1 , borderBottomColor: '#000000'}}/> */}
            </View>

            
            <View style={{ flex: 1}}>


                <FlatList
                    data={playlists}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <PlaylistCardModal playlist={item} onPlaylistSelected={handlePlaylistSelected} />
                    }
                    keyExtractor={item => (item.id).toString()}
                />
            </View>
        </View>
        // </View>
    )
}
const ModalMenu1 = (props: any) => {
    const height = Platform.getHeight()
    const width = Platform.getWidth()

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (props.isOpen) {
                    props.showModal(false);
                    return true;
                } else {
                    return false;
                }
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [props.isOpen])
    );

    return (

        <Box style={{ flex: 1, flexDirection: 'column', position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}>
            <TouchableOpacity style={{ flex: 2, backgroundColor: '#0d0e1380' }} onPress={() => props.showModal(false)}>
                <View>

                </View>
            </TouchableOpacity>
            <View style={{ flex: 1, backgroundColor: "#0d0f12EE", alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={({ pressed }) => [{
                    backgroundColor: pressed ? '#1FC15950' : '#1FC15910',
                    borderRadius: 10,
                    width: width / 2,
                    margin: 8,
                    // flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10

                }]}>
                    <Text color="#F7F7F7AA">Add to Playlist</Text>
                </Pressable>

            </View>

        </Box>
    )
}

export default ModalMenuScreen
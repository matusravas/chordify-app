import { Box, Text, VStack, } from "@react-native-material/core"
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Pressable, BackHandler, FlatList, TextInput } from 'react-native';
import { Playlist } from "../../model/domain/types";
import { ModalScreenProps } from "../../navigation/types";
import Platform from "../../platform/Platform";
import usePlaylistViewModel from "../../view_model/PlaylistViewModel";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistCardModal from "../components/PlaylistCardModal";

const ModalNewPlaylistScreen = ({route, navigation}: ModalScreenProps) => {
    // const { playlists, search } = usePlaylistViewModel()
    // const [visible, setVisible] = useState(false)
    const [value, setValue] = useState('')
    // const textInput = useRef<TextInput>(null)
    const handleSubmit = useCallback(() => {
        console.log(value)
        console.log(route.params.song)
    }, [])

    const width = Platform.getWidth()
    const height = Platform.getHeight()
    return (
        // <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' , backgroundColor: '#111317' }}>
                <TextInput value={value} textAlign='center' onChangeText={(text: string) => setValue(text)} selectionColor='#1FC159' placeholderTextColor='#F7F7F720' placeholder="Enter playlist name..." style={{fontSize: 24, color: '#F7F7F750'}}/>
                <Pressable style={({ pressed }) => [{
                    backgroundColor: pressed ? '#1FC15950' : '#1FC159',
                    borderRadius: 10,
                    // width: width / 2,
                    height: 40,
                    marginHorizontal: 30,
                    margin: 8,
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    justifyContent: 'center',
                    padding: 10
                }]} onPress={handleSubmit}>
                    <Text color="#F7F7F7AA">Submit</Text>
                </Pressable>
                {/* <View style={{borderBottomWidth: 1 , borderBottomColor: '#000000'}}/> */}
            </View>
        // </View>
    )
}

export default ModalNewPlaylistScreen
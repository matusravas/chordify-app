import { Box, Text, VStack, } from "@react-native-material/core"
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Pressable, BackHandler, FlatList, TextInput } from 'react-native';
import Icon, { Icons } from "../../icons/icons";
import { Playlist } from "../../model/domain/types";
import { ModalScreenProps } from "../../navigation/types";
import Platform from "../../platform/Platform";
import usePlaylistViewModel from "../../view_model/PlaylistViewModel";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistCardModal from "../components/PlaylistCardModal";

const Modal1 = ({playlists, onPlaylistSelected, onIsNewPlaylist}: any) => {
    const width = Platform.getWidth()
    
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 8 }}>
            {/* <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}> */}
            
                <Pressable style={({ pressed }) => [{
                    backgroundColor: pressed ? '#1FC15950' : '#1FC159',
                    borderRadius: 10,
                    width: width / 2,
                    margin: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10
                }]} onPress={onIsNewPlaylist}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon size={20} type={Icons.MaterialCommunityIcons} name='plus' color={'#F7F7F7AA'}/>
                        <Text color="#F7F7F7AA">Create new playlist</Text>
                    </View>
                </Pressable>
            
                {/* <View style={{borderBottomWidth: 1 , borderBottomColor: '#000000'}}/> */}
            {/* </View> */}

            
            {/* <View style={{ flex: 1}}> */}


                <FlatList
                    data={playlists}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <PlaylistCardModal playlist={item} onPlaylistSelected={onPlaylistSelected} />
                    }
                    keyExtractor={item => (item.id).toString()}
                />
            {/* </View> */}
        </View>
    )
}


const Modal2 = ({onSubmit}: any) => {
    const [value, setValue] = useState('')
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput value={value} textAlign='center' onChangeText={(text: string) => setValue(text)} selectionColor='#1FC159' placeholderTextColor='#F7F7F750' placeholder="Enter playlist name..." style={{fontSize: 24, color: '#F7F7F750'}}/>
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
                }]} onPress={()=>onSubmit(value)}>
                    <Text color="#F7F7F7AA">Submit</Text>
                </Pressable>
                {/* <View style={{borderBottomWidth: 1 , borderBottomColor: '#000000'}}/> */}
            </View>
    )
}


const ModalMenuScreen = ({route, navigation}: ModalScreenProps) => {
    const { playlists, search } = usePlaylistViewModel()
    // const [modal, setModal] = useState(true)
    const [isNewPlaylist, setIsNewPlaylist] = useState(false)

    useFocusEffect(() => {
        search()
    })

    const handlePlaylistSelected = useCallback((playlist: Playlist) => {
        console.log(playlist.name)
        console.log(route.params.song)
         // navigation.pop(1)
    }, [])
    
    
    const handleIsNewPlaylist = useCallback(() => {
        console.log('---------------')
        setIsNewPlaylist(true)
    }, [])
    
    
    const handleSubmit = useCallback((playlistName: string) => {
        console.log(playlistName)
        // navigation.pop(1)
    }, [])

    return (
        <View style={{flex: 1}}>
            {!isNewPlaylist && <Modal1 playlists={playlists} onPlaylistSelected={handlePlaylistSelected} onIsNewPlaylist={handleIsNewPlaylist}/>}
            {isNewPlaylist && <Modal2 onSubmit={handleSubmit}/>}
        </View>
        
    )
}

export default ModalMenuScreen
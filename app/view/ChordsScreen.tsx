import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React, { memo, useEffect } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { ChordsScreenProps } from '../navigation/types';
import Icon, { Icons } from '../res/icons/icons';
import useSongChordsViewModel from '../view_model/SongChordsViewModel';

// interface SongChordsScreenProps {

// }


const styles = { html: { b: { color: '#1FC159' }, body: {fontSize: 10,  color: '#FFFFFF', margin: 0, padding: 0 } } }


const ChordsScreen = ({ navigation, route }: ChordsScreenProps) => {
  // props.params.
  const {song, html, handleFavoritesChange} = useSongChordsViewModel(route.params.song)
  const playlist = 'playlist' in route.params ? route.params.playlist : undefined  //?route.params.playlist: undefined

  // const [song, setSong] = useState<Song>(route.params.song)
  const bottomTabBarHeight = useBottomTabBarHeight()
  const { width } = useWindowDimensions()
  // const navigation = useNavigation()
  // Todo on back pressed pop it from stack
  console.log('Chords rerender')

  useEffect(() => {
    navigation.setOptions({
      headerTitle: song.name,
      // headerLeft: () => (
      //   <Pressable onPress={() => {
      //     // route.params.updateFavoriteSongs()
      //     navigation.pop()
      //   }}>
      //   <Icon type={Icons.MaterialCommunityIcons} name={'dots-vertical'} color={'#F7F7F7'} style={{}} />
      // </Pressable>
      // ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => {
            handleFavoritesChange()
          }}>
            <Icon type={Icons.MaterialIcons} name={song.isFavorite?'favorite': 'favorite-outline'} color={song.isFavorite ? '#1FC159CC' : '#F7F7F7AA'} style={{ marginRight: 10 }} />
          </Pressable>
          <Pressable onPress={() => {
              navigation.navigate('Modal', {song, playlist})
            }}>
            <Icon type={Icons.MaterialCommunityIcons} name={'dots-vertical'} color={'#F7F7F7'} style={{}} />
          </Pressable>
        </View>
      )
    })
  }, [song])

  return (
    // <SafeAreaView style={{marginBottom: 125}}>
    // <View>
    //   <Text style={{color:"#FFFFFF"}}>
    //     {data.html}
    //   </Text>
    // </View>
    <ScrollView

      // automaticallyAdjustContentInsets={true}
      // Todo 
      // ! https://stackoverflow.com/questions/68966120/react-native-render-html-you-seem-to-update-the-x-prop-of-the-y-component-in-s

      style={{ marginBottom: bottomTabBarHeight, paddingLeft: 10, paddingRight: 10 }}>
      {html.html && <RenderHtml
        tagsStyles={styles.html}
        contentWidth={width}
        source={html}
      />}
    </ScrollView>

  )

}

export default memo(ChordsScreen, (prev, next) => prev.route.params.song.id === next.route.params.song.id)
// export default memo(SongChordsScreen, (prev, next)=>prev.props.route.params.song.id === next.props.route.params.song.id)
// export default memo(SongChordsScreen, (prev, next)=>true)
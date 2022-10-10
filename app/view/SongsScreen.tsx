import { useNavigation } from '@react-navigation/native';
import useSongListViewModel from '../view_model/SongListViewModel';
import { Song } from '../model/domain/types';
import SearchBar from './components/SearchBar';
import SongsList from './components/SongList';
import {View} from 'react-native'

const SongsScreen = () => {
    const [songs, searchQuery, currentPage, setSongs, setSearchQuery, setCurrentPage] = useSongListViewModel()
    // const navigation = useNavigation<any>();
    
    
    const handleCardClick = (song: Song) => {
      console.log(song)
      // navigation.navigate('Song', {song: song})
    }
    
    const handlePageChanged = () => {
      console.log(`Page change: current page: ${currentPage} + 1` )
      // navigation.navigate('Song', {song: song})
    }
    
    const handleAddToFavorites = (song: Song) => {
      console.log(song)
    }
    
    
    const handleSearch = (query: string) => {
      console.log(`handling search ${query}`)
      setSearchQuery(query)
    }
    
  
    return (
      <View>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
        <SongsList songs={songs} 
              onCardClick={handleCardClick} 
              onAddToFavoritesClick={handleAddToFavorites}
              onPageChanged={handlePageChanged}
              />
      </View>
    );
  };

export default SongsScreen
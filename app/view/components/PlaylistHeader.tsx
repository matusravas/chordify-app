import {View, Text} from 'react-native';
import {memo} from 'react';
import { Playlist } from '../../model/domain/types';

interface PlaylistHeaderProps {
    playlist: Playlist
}

const PlaylistHeader = ({playlist}: PlaylistHeaderProps) => (
    <View style={{flexDirection: 'column', backgroundColor: '#0d0f12', alignItems: 'center', paddingVertical: 10, borderBottomColor: '#1FC15910', paddingHorizontal: 10 }}>
        <Text style={{fontSize: 20, fontWeight: '300', color: '#F7F7F7AA'}}>
        {playlist.name} {playlist.id > 0? 'playlist': 'songs'}
        </Text>
        {playlist.id > 0 && <Text style={{fontSize: 11, color: '#F7F7F750'}}>
        (Total songs {playlist.songsCount})
        </Text>}

    </View>
)

export default memo(PlaylistHeader, (prev, next) => prev.playlist.id === next.playlist.id)
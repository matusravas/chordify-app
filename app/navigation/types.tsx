import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC } from 'react';
import { Icons } from '../icons/icons';
import { Playlist, Song } from '../model/domain/types';
import PlaylistsScreen from '../view/PlaylistsScreen';
import PlaylistStackScreen, { PlaylistStackParamList } from './PlaylistStack';
import SongStackScreen, { SongStackParamList } from './SongStack';

type Screen = {
    component: FC<JSX.Element>,
    name: string,
    label: string,
    iconFocused: string
    iconType: any
    iconNotFocused: string,
}


type PlaylistsScreenProps = NativeStackScreenProps<PlaylistStackParamList, 'Playlists'>;
type PlaylistSongsScreenProps = NativeStackScreenProps<PlaylistStackParamList, 'PlaylistSongs'>;
type PlaylistSongScreenRouteProps = RouteProp<PlaylistStackParamList, 'Song'>;

type SongsScreenProps = NativeStackScreenProps<SongStackParamList, 'Songs'>;

type SongChordsScreenRouteProps = RouteProp<SongStackParamList, 'Song'>;

// type ChordsScreenRouteProps = SongChordsScreenRouteProps | PlaylistSongScreenRouteProps

type ChordsScreenProps = NativeStackScreenProps<SongStackParamList & PlaylistStackParamList, 'Song'>;
// type ModalScreenProps = NativeStackScreenProps<SongStackParamList & PlaylistStackParamList, 'Modal'>;
type ModalScreenProps = NativeStackScreenProps<SongStackParamList | PlaylistStackParamList, 'Modal'>;


const tabs: Array<Screen> = [
    {
        component: SongStackScreen,
        name: 'Search',
        label: 'Search',
        iconType: Icons.MaterialIcons,
        iconFocused: 'search',
        iconNotFocused: 'search',
    },
    {
        component: PlaylistStackScreen,
        name: 'Playlists',
        label: 'Playlists',
        iconType: Icons.MaterialIcons,
        iconFocused: 'music-note',
        iconNotFocused: 'music-note',
    },
]

export default tabs
export type {
    SongsScreenProps,
    SongChordsScreenRouteProps,
    ChordsScreenProps,
    PlaylistsScreenProps,
    PlaylistSongsScreenProps,
    PlaylistSongScreenRouteProps,
    ModalScreenProps
}
import { FC } from 'react';
import { Icons } from '../icons/icons';
import PlaylistsScreen from '../view/PlaylistScreen';
import SongStackScreen from './SongStack';

type Screen = {
    component: FC<any>,
    name: string,
    label: string,
    iconFocused: string
    iconType: any
    iconNotFocused: string,
}

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
        component: PlaylistsScreen,
        name: 'Playlists',
        label: 'Playlists',
        iconType: Icons.MaterialIcons,
        iconFocused: 'music-note',
        iconNotFocused: 'music-note',
    },
]

export default tabs
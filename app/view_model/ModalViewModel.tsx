import Repository from "../repository/Repository"
import { useState, useEffect, useCallback, useRef } from 'react'
import { Playlist, Song } from "../model/domain/types"
import { Icons } from "../icons/icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SongStackParamList } from "../navigation/SongStack";
import { PlaylistStackParamList } from "../navigation/PlaylistStack";
import { ActionType } from "../model/types";



interface ModalViewModalProps {
    song: Song,
    playlist: Playlist | undefined
}

function useModalViewModel({ playlist, ...props }: ModalViewModalProps) {
    const repository = Repository.getInstance()
    const [song, setSong] = useState(props.song)
    const [playlists, setPlaylists] = useState([] as Playlist[])
    const [isAddToPlaylist, setIsAddToPlaylist] = useState(false)
    const [actionType, setActionType] = useState<ActionType>()


    useEffect(() => {
        searchPlaylists()
    }, [])


    const searchPlaylists = useCallback(async () => {
        try {
            let result = await repository.findPlaylistInfo()
            if (result.ok && result.data && result.data.length > 0) {
                if (playlist) setPlaylists(result.data.filter(e => e.id !== playlist.id && e.id !== 1))
                else setPlaylists(result.data)
            }
        } catch {

        }
    }, [])


    const handleSongChanged = useCallback(async (action: 'add' | 'remove', playlistId?: number, playlistName?: string) => {
        try {
            if (action === 'add') {
                let songWithChords = undefined
                const data = await repository.searchSongChords(song)
                if (data.data && data.data.chords) {
                    songWithChords = { chords: data.data.chords, ...song }
                    if (playlistId || playlistName) {
                        if (playlistId) {
                            const resultAddSong = await repository.addSongToPlaylist(songWithChords, playlistId)
                            console.log(resultAddSong)
                        }
                        if (playlistName) {
                            let resultAddPlaylist = await repository.addNewPlaylist(playlistName)
                            if (resultAddPlaylist.ok && resultAddPlaylist.data) {
                                const resultAddSong = await repository.addSongToPlaylist(songWithChords, resultAddPlaylist.data)
                                console.log(resultAddSong)
                            }
                        }
                        setActionType(ActionType.Add)
                    }
                    else { //favorites
                        const resultAddSong = await repository.addSongToPlaylist(songWithChords, 1)
                        console.log(resultAddSong)
                        const newSong = { ...song, isFavorite: !song.isFavorite }
                        setSong(newSong)
                        setActionType(ActionType.FavoritesAdd)
                    }
                }
            }
            if (action === 'remove') {
                if (playlistId) {
                    const resultDelete = await repository.removeSongFromPlaylist(song.id, playlistId)
                    if (resultDelete) setActionType(ActionType.Remove)
                }
                else {
                    const resultDelete = await repository.removeSongFromPlaylist(song.id, 1)
                    if (resultDelete) {
                        // setRemoved(true)
                        const newSong = { ...song, isFavorite: !song.isFavorite }
                        setSong(newSong)
                        setActionType(ActionType.FavoritesRemove)
                    }
                }
            }
        } catch (err) {

        }
    }, [song])


    const menuItems = [
        {
            title: song.isFavorite ? 'Added to Favorites' : 'Add to Favorites',
            iconType: Icons.MaterialIcons, iconName: 'favorite', color: song.isFavorite ? '#1FC159CC' : '#F7F7F7AA', colorPressed: song.isFavorite ? '#1FC15980' : '#F7F7F750',
            handler: () => handleSongChanged(song.isFavorite ? 'remove' : 'add')
        },
        {
            title: playlist ? 'Add to another playlist' : 'Add to playlist',
            iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-plus', color: '#F7F7F7AA', colorPressed: '#F7F7F750',
            handler: () => setIsAddToPlaylist(true)
        },
        ...playlist && playlist.id !== 1 && actionType !== ActionType.Remove ? [
            {
                title: 'Remove from this playlist',
                iconType: Icons.MaterialCommunityIcons, iconName: 'playlist-remove', color: '#F7F7F7AA', colorPressed: '#F7F7F750',
                handler: () => handleSongChanged('remove', playlist.id) //handleRemoveSongFromPlaylist
            }] : [],

        // {title: 'Add to favorites', titleAlt: 'Remove from favorites', iconType: Icons.MaterialIcons, iconTypeAlt: Icons.MaterialCommunityIcons, iconName: 'favorite-outline', iconNameAlt: 'heart-remove-outline'},
        // {title: 'Add to playlist', titleAlt: 'Remove from this playlist', iconType: Icons.MaterialCommunityIcons, iconTypeAlt: null, iconName: 'plus', iconNameAlt: null},
    ]

    return {
        song,
        playlists,
        menuItems,
        actionType,
        isAddToPlaylist,
        setIsAddToPlaylist,
        searchPlaylists,
        handleSongChanged
    }
}

export default useModalViewModel
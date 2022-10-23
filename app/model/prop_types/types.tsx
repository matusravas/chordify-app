import { Playlist, Song } from "../domain/types";

export interface SongCardProps {
    // index: number,
    song: Song,
    onSongCardClick: (song: Song) => void
    onFavoritesButtonClick: (song: Song) => void,
    onMoreButtonClick: (song: Song) => void
}

export interface PlaylistCardProps {
    playlist: Playlist,
    onPlaylistCardClick: (playlist: Playlist) => void
}
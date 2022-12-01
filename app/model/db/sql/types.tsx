import { ResultSet } from "react-native-sqlite-storage"

export type InsertSongToPlaylist = {
    songId: number,
    playlistId: number
    songPlaylistId?: number
}

export type PlaylistInfoDto = {
    count: number,
    playlist_id: number,
    name: string,
    timestamp_edited: number,
    timestamp_created: number,
}

export type FavoriteSongIds = {
    song_id: number
}

export type PlaylistItemDto = {
    id: number, 
    name: string,
}

export type SQLResult<T=any> = {
    ok: boolean,
    error?: string,
    result?: ResultSet,
    data?: Array<T> //|T
}
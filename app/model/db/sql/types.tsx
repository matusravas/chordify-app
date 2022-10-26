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
    timestamp_visit: number,
    timestamp_create: number,
}

export type FavoriteSongIds = {
    song_id: number
}

export type SQLResult<T=any> = {
    ok: boolean,
    error?: string,
    result?: ResultSet,
    data?: Array<T> //|T
}
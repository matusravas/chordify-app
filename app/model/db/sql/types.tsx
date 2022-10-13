import { ResultSet } from "react-native-sqlite-storage"

export type InsertSongToPlaylist = {
    songId: number,
    playlistId: number
    songPlaylistId?: number
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
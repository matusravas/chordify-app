export type InsertSongToPlaylist = {
    songId: number,
    playlistId: number
    songPlaylistId?: number
}

export type SQLResult<T = {}> = {
    ok: boolean,
    error?: string,
    data?: T
}
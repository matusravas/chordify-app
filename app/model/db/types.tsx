export type SongDto = {
    id: number,
    artist: string, 
    name: string, 
    chords_link: string, 
    full_url: string, 
    votes: number,
    rating: number,
    score: number,
    chords: string
}

export type PlaylistDto = {
    id?: number, 
    name: string,
    timestamp_created: number,
    timestamp_lastVisit?: number,
}

export type SongPlaylistDto = {
    id?: number, 
    playlist_id: number,
    song_id: number,
    timestampAdded: number,
}
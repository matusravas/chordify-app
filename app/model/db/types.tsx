export type SongDto = {
    id: number,
    artist: string, 
    name: string, 
    chords_link: string, 
    full_url: string, 
    votes: number,
    rating: number,
    chords?: string
    timestamp_visit?: number
    timestamp_added?: number
}

export type PlaylistDto = {
    id?: number, 
    name: string,
    timestamp_created: number,
    timestamp_visit?: number,
}

export type SongPlaylistDto = {
    id?: number, 
    playlist_id: number,
    song_id: number,
    timestamp_added: number,
}
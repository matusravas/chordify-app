export type Data<T> = {
    ok: boolean,
    data?: T,
    error?: string,
    // online?: boolean
}

export type Song = {
    id: number,
    artist: string, 
    name: string, 
    chordsLink: string, 
    fullUrl: string, 
    votes: number, 
    rating: number,
    hits: number,
    chords?: string,
    isFavorite: boolean,
    chordsMetadata?: ChordsMetadata
    timestampSaved?: number,
    timestampAddedToPlaylist?: number,
}

export type Playlist = {
    songsCount: number,
    id: number,
    name: string,
    timestampEdited: number,
    timestampCreated: number,
}

export type PlaylistItem = {
    id: number,
    name: string,
}

// export type Playlist = {
//     id?: number, 
//     name: string,
//     timestampCreated?: number,
//     timestampLastVisit?: number,
// }

export type ChordsMetadata = {
    capo: string,
    tuning: string,
    tuningValues: string,
    tonality: string,
}

// export type SongChords = {
//     song: Song
//     chordsHtmlString: string,
//     chordsMetadata?: ChordsMetadata
// }
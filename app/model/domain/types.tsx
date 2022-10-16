export type Data<T> = {
    // ok: boolean,
    data?: T,
    // error?: string,
    online?: boolean
}

export type Song = {
    id: number,
    artist: string, 
    name: string, 
    chordsLink: string, 
    fullUrl: string, 
    votes: number, 
    rating: number,
    chords?: string,
    isFavorite: boolean,
    chordsMetadata?: ChordsMetadata
    timestampLastVisit?: string,
}

export type Playlist = {
    id?: number, 
    name: string,
    timestampCreated?: number,
    timestampLastVisit?: number,
}

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
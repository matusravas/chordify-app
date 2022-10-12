export type Song = {
    id: number,
    artist: string, 
    name: string, 
    chordsLink: string, 
    fullUrl: string, 
    votes: number, 
    rating: number,
    chords?: string,
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
export type Song = {
    id: number,
    artist: string, 
    name: string, 
    chordsLink: string, 
    fullUrl: string, 
    statistics: Statistics
}

export type Statistics = { 
    votes: number, 
    rating: number 
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

export type SongChords = {
    song: Song
    chordsHtmlString: string,
    chords_metadata: ChordsMetadata
}
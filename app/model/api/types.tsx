export type Response<T> = {
    data?: T,
    ok: boolean,
    error?: string
}

export type SongDto = {
    id: number,
    artist: string, 
    name: string, 
    chords_link: string, 
    full_url: string, 
    statistics: StatisticsDto
}

export type StatisticsDto = { 
    votes: number, 
    rating: number,
    hits: number 
}

export type ChordsMetadataDto = {
    capo: string,
    tuning: string,
    tuningValues: string,
    tonality: string,
}

export type SongChordsDto = {
    song: SongDto
    chords: string,
    chords_metadata: ChordsMetadataDto
}
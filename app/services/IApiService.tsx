import { Response, SongChordsDto, SongDto } from "../model/api/types"

export interface IApiService {
    
    getSongs(query: string, page: number, type: number, sortOrder: string): Promise<Response<Array<SongDto>>>
    
    getSongDetails(chordsLink: string): Promise<Response<SongDto>>
    
    getSongChords(chordsLink: string): Promise<Response<SongChordsDto>>
}
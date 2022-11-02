import { Response, SongChordsDto, SongDto } from "../model/api/types"

export interface IApiService {
    
    getSongs(query: string, page: number, top100: boolean, type: number, sortOrder: string): Promise<Response<Array<SongDto>>>
    
    getSongChords(chordsLink: string): Promise<Response<SongChordsDto>>
}
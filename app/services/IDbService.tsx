import { Response } from "../model/api/types"
import { Song, SongChords } from "../model/domain/types"

export interface IDbService {
    
    getSongs(query: string, type: number, sortOrder: string, page: number): Promise<Response<Array<Song>>>
    
    getSongDetails(chordsLink: string): Promise<Response<Song>>
    
    getSongChords(chordsLink: string): Promise<Response<SongChords>>
}
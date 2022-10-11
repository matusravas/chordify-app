import { ResultSet, ResultSetRowList } from "react-native-sqlite-storage"
import { Response } from "../model/api/types"
import { PlaylistDto, SongDto } from "../model/db/types"
import { Song, SongChords } from "../model/domain/types"

export interface IDbService {
    
    insertSongToPlaylist(song: SongDto, playlistId: number): Promise<ResultSet[]>
    
    insertSong(song: SongDto): Promise<ResultSet[]>
    
    insertPlaylist(playlist: PlaylistDto): Promise<ResultSet[]>
    
    findAllSongsInPlaylist(playlistId: number): Promise<ResultSetRowList>
}
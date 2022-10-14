import { ResultSet, ResultSetRowList } from "react-native-sqlite-storage"
import { InsertSongToPlaylist, SQLResult } from "../model/db/sql/types"
import { PlaylistDto, SongDto } from "../model/db/types"
import { Song, } from "../model/domain/types"

export interface IDbService {
    
    insertSongToPlaylist(song: SongDto, playlistId: number): Promise<SQLResult<InsertSongToPlaylist>>
    
    findFavoriteSongIdsBySongIds(songIds: Array<number>): Promise<SQLResult>
    
    findSongsInPlaylist(playlistId: number, query: string, numRows: number, sortOrder: string, count: number): Promise<SQLResult<SongDto>>
    
    findSongInPlaylistById(songId: number): Promise<SQLResult<SongDto>>

    findLastSavedSongs(limit: number): Promise<SQLResult<SongDto>>

    createPlaylist(playlist: PlaylistDto): Promise<SQLResult>

    deleteSongFromPlaylist(songId: number, playlistId: number): Promise<SQLResult>
    
}
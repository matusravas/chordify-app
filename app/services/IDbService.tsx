import { ResultSet, ResultSetRowList } from "react-native-sqlite-storage"
import { InsertSongToPlaylist, PlaylistInfoDto, SQLResult } from "../model/db/sql/types"
import { PlaylistDto, SongDto } from "../model/db/types"
import { Song, } from "../model/domain/types"

export interface IDbService {
    
    insertSong(song: SongDto): Promise<SQLResult>
    
    insertSongToPlaylist(songId: number, playlistId: number): Promise<SQLResult>
    
    findFavoriteSongIdsBySongIds(songIds: Array<number>): Promise<SQLResult>
    
    findSongsInPlaylist(playlistId: number, query: string, timestampAdded: number, sortOrder: string, count: number): Promise<SQLResult<SongDto>>
    
    findSavedSong(songId: number): Promise<SQLResult<SongDto>>

    findLastSavedSongs(query: string, timestampSaved: number, sortOrder: string): Promise<SQLResult<SongDto>>

    findPlaylistInfo(): Promise<SQLResult<PlaylistInfoDto>> 

    createPlaylist(playlistName: string): Promise<SQLResult>

    deleteSongFromPlaylist(songId: number, playlistId: number): Promise<SQLResult>

    updatePlaylistTimestampVisit(playlistId: number): Promise<SQLResult>
    
}
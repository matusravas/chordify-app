import { PlaylistInfoDto, SQLResult, PlaylistItemDto } from "../model/db/sql/types"
import { SongDto } from "../model/db/types"

export interface IDbService {
    
    insertSong(song: SongDto): Promise<SQLResult>
    
    insertSongToPlaylist(songId: number, playlistId: number): Promise<SQLResult>
    
    findFavoriteSongIdsBySongIds(songIds: Array<number>): Promise<SQLResult>
    
    findSongsInPlaylist(playlistId: number, query: string, timestampAdded: number, sortOrder: string, count: number): Promise<SQLResult<SongDto>>
    
    findSavedSong(songId: number): Promise<SQLResult<SongDto>>

    findLastSavedSongs(query: string, timestampSaved: number, sortOrder: string): Promise<SQLResult<SongDto>>

    findPlaylistInfo(): Promise<SQLResult<PlaylistInfoDto>> 
    
    findAvailablePlaylists(songId: number): Promise<SQLResult<PlaylistItemDto>> 

    createPlaylist(playlistName: string): Promise<SQLResult>

    deleteSongFromPlaylist(songId: number, playlistId: number): Promise<SQLResult>

    updatePlaylistTimestampVisit(playlistId: number): Promise<SQLResult>
    
}
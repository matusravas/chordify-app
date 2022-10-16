import { ResultSet } from "react-native-sqlite-storage"
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types"
import { InsertSongToPlaylist, PlaylistInfoDto, SQLResult } from "../model/db/sql/types"
import { PlaylistDto, SongDto as SongDb } from "../model/db/types"
import { Data, Playlist, PlaylistInfo, Song } from "../model/domain/types"

export interface IRepository {

    // ------------------------------------------------------------------------
    searchSongChords(song: Song): Promise<Data<Song>>

    findFavoriteSongsIds(songIds: Array<number>): Promise<Data<Array<number>>>
    
    fetchSongs(query: string, page: number, top100: boolean, type: number, sortOrder: string): Promise<Data<Array<Song>>>
    
    addSongToPlaylist(song: Song, playlistID: number): Promise<boolean> // status true/false

    removeSongFromPlaylist(songId: number, playlistId: number): Promise<boolean> // status true/false

    findPlaylistInfo(): Promise<Array<PlaylistInfo>> 
    // ------------------------------------------------------------------------
    
    
    // Not implemented
    // searchSongsInPlaylist(playlistId: number, query: string, numRows: number, sortOrder: string): Promise<SQLResult<Song>>
    
    // searchLastSavedSongs(limit?: number): Promise<SQLResult<Song>>
    
    // findAllPlaylists(name: string, sortOrder: string): Promise<SQLResult<Playlist>>

    
}
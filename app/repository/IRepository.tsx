import { ResultSet } from "react-native-sqlite-storage"
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types"
import { InsertSongToPlaylist, SQLResult } from "../model/db/sql/types"
import { PlaylistDto, SongDto as SongDb } from "../model/db/types"
import { Playlist, Song } from "../model/domain/types"

export interface IRepository {
    
    // API calls
    fetchSongs(query: string, page: number, top100: boolean, type: number, sortOrder: string): Promise<Response<Array<Song>>>
    
    fetchSongChords(chordsLink: string): Promise<Response<Song>>
    
    // DB queries
    addSongToPlaylist(song: Song, playlistID: number): Promise<SQLResult<InsertSongToPlaylist>>
    
    searchSongsInPlaylist(playlistId: number, query: string, numRows: number, sortOrder: string): Promise<SQLResult<Song>>
    
    findFavoriteSongs(songIds: Array<number>): Promise<SQLResult<number>>
    
    findAllPlaylists(name: string, sortOrder: string): Promise<SQLResult<Playlist>>
}
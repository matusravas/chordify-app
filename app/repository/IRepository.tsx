import { Data, Playlist, PlaylistItem, Song } from "../model/domain/types"

export interface IRepository {

    // ------------------------------------------------------------------------
    searchSongChords(song: Song): Promise<Data<Song>>

    findFavoriteSongsIds(songIds: Array<number>): Promise<Data<Array<number>>>
    
    fetchSongs(query: string, page: number, top100: boolean, type: number, sortOrder: string): Promise<Data<Array<Song>>>
    
    addSongToPlaylist(song: Song, playlistId: number): Promise<Data<boolean>> // status true/false

    addNewPlaylist(playlistName: string): Promise<Data<number>> // status true/false

    removeSongFromPlaylist(songId: number, playlistId: number): Promise<Data<boolean>> // status true/false

    findSavedSongs(playlistId: number, query: string, timestampAdded: number, sortOrder: string): Promise<Data<Array<Song>>>
    
    findLastSavedSongs(query: string, timestampVisit: number, sortOrder: string): Promise<Data<Array<Song>>>
    
    findPlaylistInfo(): Promise<Data<Array<Playlist>>> 
    
    findAvailablePlaylists(songId: number): Promise<Data<Array<PlaylistItem>>>
 
    // ------------------------------------------------------------------------
    
    
    // Not implemented
    // searchSongsInPlaylist(playlistId: number, query: string, numRows: number, sortOrder: string): Promise<SQLResult<Song>>
    
    // searchLastSavedSongs(limit?: number): Promise<SQLResult<Song>>
    
    // findAllPlaylists(name: string, sortOrder: string): Promise<SQLResult<Playlist>>

    
}
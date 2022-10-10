import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types"
import { PlaylistDto, SongDto as SongDb } from "../model/db/types"
import { Playlist, Song, SongChords } from "../model/domain/types"

export interface IRepository {
    
    fetchSongs(query: string, page: number, top100: boolean, type: number, sortOrder: string): Promise<Response<Array<Song>>>
    
    fetchSongDetails(chordsLink: string): Promise<Response<Song>>
    
    fetchSongChords(chordsLink: string): Promise<Response<SongChords>>
    

    createPlaylist(name: PlaylistDto): number
    
    addSongToPlaylist(song: SongDb, playlistID: number): number
    
    searchSavedSongs(query: string, numRows: number, sortOrder: string): Promise<Response<Array<Song>>>
    
    searchSongsInPlaylist(query: string, playlistID: number, numRows: number, sortOrder: string): Promise<Response<Array<Song>>>
    
    searchAllPlaylists(sortOrder: string): Promise<Response<Playlist>>
}
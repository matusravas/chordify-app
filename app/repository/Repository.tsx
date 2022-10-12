import axios from "axios";
import { ResultSet } from "react-native-sqlite-storage";
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types";
import { InsertSongToPlaylist, SQLResult } from "../model/db/sql/types";
import { PlaylistDto, SongDto as SongDb } from "../model/db/types";
import { Playlist, Song } from "../model/domain/types";
import ApiService from "../services/ApiService";
import DbService from "../services/DbService";
import { IRepository } from "./IRepository";
import { mapSongApiToDomain, mapSongChordsApiToDomain, mapSongDbToDomain, mapSongDomainToDb } from "./mapper/song";


class Repository implements IRepository {
    static _instance: Repository

    apiService = ApiService.getInstance()
    dbService = DbService.getInstance()

    private constructor() {}

    fetchSongs(query: string, page: number, top100: boolean=false, type: number=300, sortOrder: string='desc'): Promise<Response<Song[]>> {
        // return this.apiService.getSongs(query, page, top100, type, sortOrder) as unknown as Promise<Response<Song[]>> //todo map to domain
        const result: Promise<Response<Song[]>> = this.apiService.getSongs(query, page, top100, type, sortOrder).then(data=>{
            if (data.ok && data.data) { 
                const songs: Song[] = data.data.map((songApi: SongApi) => {
                    const song = mapSongApiToDomain(songApi)
                    // const {statistics, full_url, chords_link, ...rest} = songApi
                    // const song = {votes: statistics.votes, rating: statistics.rating, 
                    //     chordsLink: chords_link, fullUrl: full_url, ...rest}
                    return song
                })
                return {data: songs, ok: data.ok}
            }
            return {data: [], ok: data.ok}
        }).catch(err => {
            return {data: [], ok: false, error: err}
        })
        return result
    }

    // fetchSongDetails(chordsLink: string): Promise<Response<Song>> {
    //     throw new Error("Method not implemented.");
    // }
    fetchSongChords(chordsLink: string): Promise<Response<Song>> {
        const result: Promise<Response<Song>> = this.apiService.getSongChords(chordsLink).then(data=>{
            if (data.ok && data.data) { 
                console.log(data)
                const song = mapSongChordsApiToDomain(data.data)
                return {data: song, ok: data.ok}
            }
            return {ok: data.ok}
        }).catch(err => {
            return {ok: false, error: err}
        })
        return result
    }

    
    addSongToPlaylist(song: Song, playlistID: number): Promise<SQLResult<InsertSongToPlaylist>> {
        // console.log(songchords)
        // const {song: song, chordsHtmlString: chords, chordsMetadata: chordsMetadata } = songchords
        // const songDto: SongDb = {chords_link: song.chordsLink, full_url: song.fullUrl, ...song, chords}
        const songDb = mapSongDomainToDb(song)
        return this.dbService.insertSongToPlaylist(songDb, playlistID)
        // return this.dbService.insertSongToPlaylist({id: song.id, artist: song.artist, name: song.name,
        //      chords_link: song.chords_link, full_url: song.full_url, chords: '',
        //      votes: song.statistics.votes, rating: song.statistics.rating }, playlistID)
    }

    searchSongsInPlaylist(playlistId: number, query: string='', numRows: number=-1, sortOrder: string='desc'): Promise<SQLResult<Array<Song>>> {
        const result: Promise<SQLResult<Array<Song>>> = this.dbService.findSongsInPlaylist(playlistId, query, numRows, sortOrder).then(data => {
            if(data.ok && data.data){
                const songs = data.data.map(songDb => mapSongDbToDomain(songDb))
                return {ok: data.ok, data: songs}
            }
            return {ok: data.ok}
        }).catch(err => {
            return {ok: false, error: err}
        })

        return result
    }
    
    // searchSongsInPlaylist(query: string, playlistID: number, numRows: number, sortOrder: string): Promise<Response<Song[]>> {
    //     throw new Error("Method not implemented.");
    // }
    createPlaylist(playlist: PlaylistDto): Promise<SQLResult<number>> {
        throw new Error("Method not implemented.");
    }
    
    findAllPlaylists(name: string = '', sortOrder: string='desc'): Promise<SQLResult<Array<Playlist>>> {
        throw new Error("Method not implemented.");
    }


    static getInstance(): Repository {
        return this._instance || (this._instance = new this());
    }

}

export default Repository
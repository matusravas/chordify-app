import axios from "axios";
import { ResultSet } from "react-native-sqlite-storage";
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types";
import { PlaylistDto, SongDto as SongDb } from "../model/db/types";
import { Song, SongChords, Statistics } from "../model/domain/types";
import ApiService from "../services/ApiService";
import DbService from "../services/DbService";
import { IRepository } from "./IRepository";


class Repository implements IRepository {
    static _instance: Repository

    apiService = ApiService.getInstance()
    dbService = DbService.getInstance()

    private constructor() {}

    fetchSongs(query: string, page: number, top100: boolean=false, type: number=300, sortOrder: string='desc'): Promise<Response<Song[]>> {
        // return this.apiService.getSongs(query, page, top100, type, sortOrder) as unknown as Promise<Response<Song[]>> //todo map to domain
        const result: Promise<Response<Song[]>> = this.apiService.getSongs(query, page, top100, type, sortOrder).then(data=>{
            if (data.ok) { 
                const songs: Song[] = data.data.map((songApi: SongApi) => {
                    const {statistics, full_url, chords_link, ...rest} = songApi
                    const song = {statistics: statistics as Statistics, 
                        chordsLink: chords_link, fullUrl: full_url, ...rest}
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

    fetchSongDetails(chordsLink: string): Promise<Response<Song>> {
        throw new Error("Method not implemented.");
    }
    fetchSongChords(chordsLink: string): Promise<Response<SongChords>> {
        throw new Error("Method not implemented.");
    }
    createPlaylist(playlist: PlaylistDto): number {
        throw new Error("Method not implemented.");
    }
    
    addSongToPlaylist(song: Song, playlistID: number): Promise<ResultSet[]> {
        console.log(song)
        return this.dbService.insertSongToPlaylist({...song, chords: '', full_url: song.fullUrl, chords_link: song.chordsLink,
             votes: song.statistics.votes, rating: song.statistics.rating }, playlistID)
        // return this.dbService.insertSongToPlaylist({id: song.id, artist: song.artist, name: song.name,
        //      chords_link: song.chords_link, full_url: song.full_url, chords: '',
        //      votes: song.statistics.votes, rating: song.statistics.rating }, playlistID)
    }

    searchSavedSongs(query: string, numRows: number, sortOrder: string): Promise<Response<Song[]>> {
        throw new Error("Method not implemented.");
    }
    searchSongsInPlaylist(query: string, playlistID: number, numRows: number, sortOrder: string): Promise<Response<Song[]>> {
        throw new Error("Method not implemented.");
    }
    searchAllPlaylists(sortOrder: string): Promise<Response<PlaylistDto>> {
        throw new Error("Method not implemented.");
    }

    static getInstance(): Repository {
        return this._instance || (this._instance = new this());
    }



}

export default Repository
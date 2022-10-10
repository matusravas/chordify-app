import axios from "axios";
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types";
import { PlaylistDto, SongDto as SongDb } from "../model/db/types";
import { Song, SongChords } from "../model/domain/types";
import ApiService from "../services/ApiService";
import { IRepository } from "./IRepository";


class Repository implements IRepository {
    static _instance: Repository

    apiService = ApiService.getInstance()

    private constructor() {}

    fetchSongs(query: string, page: number, type: number=300, sortOrder: string='desc'): Promise<Response<Song[]>> {
        throw new Error("Method not implemented.");
        // return {...this.apiService.getSongs(query, page, type, sortOrder)} //todo map to domain
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
    addSongToPlaylist(song: SongDb, playlistID: number): number {
        throw new Error("Method not implemented.");
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
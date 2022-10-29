import axios from "axios";
import { ResultSet } from "react-native-sqlite-storage";
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types";
import { FavoriteSongIds, InsertSongToPlaylist, PlaylistInfoDto, SQLResult } from "../model/db/sql/types";
import { PlaylistDto, SongDto as SongDb } from "../model/db/types";
import { Data, Playlist, Song } from "../model/domain/types";
import ApiService from "../services/ApiService";
import DbService from "../services/DbService";
import { IRepository } from "./IRepository";
import { mapPlaylistInfoDbToDomain, mapSongApiToDomain, mapSongChordsApiToDomain, mapSongDbToDomain, mapSongDomainToDb } from "./mapper/mapper";


class Repository implements IRepository {
    static _instance: Repository

    apiService = ApiService.getInstance()
    dbService = DbService.getInstance()

    private constructor() { }


    async findFavoriteSongsIds(songIds: number[]): Promise<Data<Array<number>>> {
        const result = await this.dbService.findFavoriteSongIdsBySongIds(songIds)
        if (result.ok && result.data && result.data) {
            const songIds = result.data.map(e => e.song_id)
            return { data: songIds , ok: true}
        }
        return {ok: false}
    }


    async searchSongChords(song: Song): Promise<Data<Song>> {
        const resultDb = await this.dbService.findSavedSong(song.id)
        if (resultDb.ok && resultDb.data && resultDb.data[0] && resultDb.data[0].id) {
            const song = resultDb.data.map(songDb => mapSongDbToDomain(songDb, true))
            return {data: song[0], ok: true}
        }
        else {
            const resultApi = await this.apiService.getSongChords(song.chordsLink)
            if (resultApi.ok && resultApi.data) {
                const song = mapSongChordsApiToDomain(resultApi.data)
                return { data: song , ok: true}
            }
        }
        return {ok: false}
    }


    async fetchSongs(query: string, page: number, top100: boolean = false, type: number = 300, sortOrder: string = 'desc'): Promise<Data<Array<Song>>> {
        const resultApi = await this.apiService.getSongs(query, page, top100, type, sortOrder)
        if (resultApi.ok && resultApi.data) {
            const songs = resultApi.data.map(song => mapSongApiToDomain(song))
            return { data: songs, ok: true }
        }
        const resultDb = await this.dbService.findLastSavedSongs(query, 50, sortOrder)
        if (resultDb.ok && resultDb.data) {
            const songs = resultDb.data.map(song => mapSongDbToDomain(song))
            return { data: songs, ok: false }
        }
        return {ok: false}
    }
    

    async removeSongFromPlaylist(songId: number, playlistId: number): Promise<boolean> {
        const result = await this.dbService.deleteSongFromPlaylist(songId, playlistId)
        if (result.ok && result.result && result.result.rowsAffected > 0){
            return true
        }
        return false
    }


    async addSongToPlaylist(song: Song, playlistId: number): Promise<boolean> {
        const songDb = mapSongDomainToDb(song)
        const resultInsertSong = await this.dbService.insertSong(songDb)
        const songId = (resultInsertSong.ok && resultInsertSong.result && resultInsertSong.result.rowsAffected > 0)? resultInsertSong.result.insertId: 
        (resultInsertSong.ok && resultInsertSong.result && resultInsertSong.result.rowsAffected === 0)? songDb.id: songDb.id
        const resultUpdatePlaylistTimestampVisit = await this.dbService.updatePlaylistTimestampVisit(playlistId)
        const resultInsertSongToPlaylist = await this.dbService.insertSongToPlaylist(songId, playlistId)
        if (resultInsertSongToPlaylist.ok && resultInsertSongToPlaylist.result && resultInsertSongToPlaylist.result.rowsAffected > 0) return true
        else if (resultInsertSongToPlaylist.ok && resultInsertSongToPlaylist.result && resultInsertSongToPlaylist.result.rowsAffected === 0) return false
        else return false
    }


    async addNewPlaylist(playlistName: string): Promise<Data<number>> {
        const result = await this.dbService.createPlaylist(playlistName)
        if(result.ok && result.result && result.result.rowsAffected > 0 && result.result.insertId){
            return {ok: true, data: result.result.insertId}
        }
        return {ok: false}
    }

    async findPlaylistInfo(): Promise<Data<Array<Playlist>>> {
        const result = await this.dbService.findPlaylistInfo()
        console.log(result)
        if(result.ok && result.data){
            const favorites = mapPlaylistInfoDbToDomain(result.data.shift()!)
            let playlistInfos = result.data.sort((a,b)=> b.timestamp_edited - a.timestamp_edited).map(playlistInfo=>{
            return mapPlaylistInfoDbToDomain(playlistInfo)})
            playlistInfos.unshift(favorites)
            return {data: playlistInfos, ok: true}
        }
        return {ok: false}
    }
    
    
    async findSavedSongs(playlistId: number, query: string, timestampAdded: number, sortOrder: string = 'desc'): Promise<Data<Array<Song>>> {
        const result = await this.dbService.findSongsInPlaylist(playlistId, query, timestampAdded, sortOrder)
        if(result.ok && result.data){
            const songs = result.data.map(playlistInfo=>{
                return mapSongDbToDomain(playlistInfo)
            })
            return {data: songs, ok: true}
        }
        return {ok: false}
    }
    
    
    async findLastSavedSongs(query: string, timestampVisit: number, sortOrder: string = 'desc'): Promise<Data<Array<Song>>> {
        const result = await this.dbService.findLastSavedSongs(query, timestampVisit, sortOrder)
        if(result.ok && result.data){
            const songs = result.data.map(playlistInfo=>{
                return mapSongDbToDomain(playlistInfo)
            })
            return {data: songs, ok: true}
        }
        return {ok: false}
    }


    static getInstance(): Repository {
        return this._instance || (this._instance = new this());
    }

}

export default Repository
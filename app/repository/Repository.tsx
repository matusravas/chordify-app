import axios from "axios";
import { ResultSet } from "react-native-sqlite-storage";
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types";
import { FavoriteSongIds, InsertSongToPlaylist, SQLResult } from "../model/db/sql/types";
import { PlaylistDto, SongDto as SongDb } from "../model/db/types";
import { Data, Playlist, Song } from "../model/domain/types";
import ApiService from "../services/ApiService";
import DbService from "../services/DbService";
import { IRepository } from "./IRepository";
import { mapSongApiToDomain, mapSongChordsApiToDomain, mapSongDbToDomain, mapSongDomainToDb } from "./mapper/song";


class Repository implements IRepository {
    static _instance: Repository

    apiService = ApiService.getInstance()
    dbService = DbService.getInstance()

    private constructor() {}


    findFavoriteSongsIds(songIds: number[]): Promise<Data<Array<number>>> {
        return new Promise<Data<Array<number>>>((resovle, reject)=>{
            this.dbService.findFavoriteSongIdsBySongIds(songIds).then(data=>{
                if(data.ok && data.data && data.data) {
                    const songIds = data.data.map(e=>e.song_id)
                    // resovle({ok: true, data: songIds})
                    resovle({data: songIds})
                }
            }).catch(err=>{
                // reject({ok: false, data: [], error: err})
                reject('Unable to find favorite songs')
            })
        })
    }

    
    searchSong(song: Song): Promise<Data<Song>> {
        return new Promise<Data<Song>>((resolve, reject) => { 
            this.dbService.findSavedSong(song.id).then(resDb => {
                console.log(resDb)
                if(resDb.ok && resDb.data && resDb.data[0] && resDb.data[0].id){
                    const song = resDb.data.map(songDb => mapSongDbToDomain(songDb, true))
                    console.log('Resolve DB')
                    // resolve({data: song[0], ok: true})
                    resolve({data: song[0]})
                }
            this.apiService.getSongChords(song.chordsLink).then(resApi=>{
                if(resApi.ok && resApi.data){
                    const song = mapSongChordsApiToDomain(resApi.data)
                    console.log('Resolve API')
                    // resolve({data: song, ok: true})
                    resolve({data: song})
                }
            }).catch(errApi=>{
                console.log(errApi)
                // reject({ok: false, error: 'Song can not be fetched'})
                reject('Unable to fetch songs')
            })
        }).catch(errDb => {
            console.log(errDb)
            // reject({ok: false, error: `Song not found in saved`})
            reject('Unable to find songs')
        })
    })}


    searchLastSavedSongs(limit: number=50): Promise<SQLResult<Song>> {
        const result = this.dbService.findLastSavedSongs(limit).then(data=>{
            if(data.ok && data.data){
                const songs = data.data.map(s=>{
                    const song = mapSongDbToDomain(s)
                    return song
                })
                return {ok: data.ok, data: songs}
            }
            else{
                return {ok: data.ok, data: []} 
            }
            
        }).catch(err=>{
            return {ok: false, data: []}
        })
        return result
    }


    fetchSongs(query: string, page: number, top100: boolean=false, type: number=300, sortOrder: string='desc'): Promise<Data<Array<Song>>> {
        return new Promise<Data<Array<Song>>>((resolve, reject) => {
            this.apiService.getSongs(query, page, top100, type, sortOrder).then(data => {
                if(data.ok && data.data){
                    const songs = data.data.map(song=>mapSongApiToDomain(song))
                    // resolve({ok: true, data: songs})
                    resolve({data: songs})
                }
                resolve({})
            }).catch(err=>{
                // reject({ok: false, error: err})
                reject('Unable to fetch songs')
            })
        })
    }

    removeSongFromPlaylist(songId: number, playlistId: number): Promise<boolean>{
        return new Promise<boolean>((resolve, reject) => {
            this.dbService.deleteSongFromPlaylist(songId, playlistId).then(data=>{
                if(data.ok && data.result && data.result.rowsAffected > 0) resolve(true)
                resolve(false)
            }).catch(err=>{
                reject('Can not remove song from favorites')
            })
        })
    }

    addSongToPlaylist(song: Song, playlistID: number): Promise<boolean> {
        const songDb = mapSongDomainToDb(song)
        return new Promise<boolean>((resolve, reject) => {
            this.dbService.insertSongToPlaylist(songDb, playlistID).then(data => {
                if(data.ok && data.result && data.result.rowsAffected > 0) resolve(true)
            }).catch(err=>{
                reject('Can not add song to playlist')
            })
        })
    }

    // searchSongsInPlaylist(playlistId: number, query: string='', numRows: number=-1, sortOrder: string='desc'): Promise<SQLResult<Song>> {
    //     const result: Promise<SQLResult<Song>> = this.dbService.findSongsInPlaylist(playlistId, query, numRows, sortOrder).then(res => {
    //         // if(res.ok && res.data && Array.isArray(res.data)){
    //         if(res.ok && res.data){
    //             const songs = res.data.map(songDb => mapSongDbToDomain(songDb))
    //             return {ok: res.ok, data: songs}
    //         }
    //         return {ok: res.ok}
    //     }).catch(err => {
    //         return {ok: false, error: err}
    //     })
    //     return result
    // }
    
    
    // createPlaylist(playlist: PlaylistDto): Promise<SQLResult<number>> {
    //     throw new Error("Method not implemented.");
    // }
    
    // findAllPlaylists(name: string = '', sortOrder: string='desc'): Promise<SQLResult<Playlist>> {
    //     throw new Error("Method not implemented.");
    // }


    static getInstance(): Repository {
        return this._instance || (this._instance = new this());
    }

}

export default Repository
import axios from "axios";
import { ResultSet } from "react-native-sqlite-storage";
import { Response, SongChordsDto, SongDto as SongApi } from "../model/api/types";
import { FavoriteSongIds, InsertSongToPlaylist, PlaylistInfoDto, SQLResult } from "../model/db/sql/types";
import { PlaylistDto, SongDto as SongDb } from "../model/db/types";
import { Data, Playlist, Song } from "../model/domain/types";
import ApiService from "../services/ApiService";
import DbService from "../services/DbService";
import { IRepository } from "./IRepository";
import { mapPlaylistInfoDbToDomain, mapSongApiToDomain, mapSongChordsApiToDomain, mapSongDbToDomain, mapSongDomainToDb } from "./mapper/song";


class Repository implements IRepository {
    static _instance: Repository

    apiService = ApiService.getInstance()
    dbService = DbService.getInstance()

    private constructor() { }


    findFavoriteSongsIds(songIds: number[]): Promise<Data<Array<number>>> {
        return new Promise<Data<Array<number>>>((resovle, reject) => {
            this.dbService.findFavoriteSongIdsBySongIds(songIds).then(data => {
                if (data.ok && data.data && data.data) {
                    const songIds = data.data.map(e => e.song_id)
                    // resovle({ok: true, data: songIds})
                    resovle({ data: songIds })
                }
            }).catch(err => {
                // reject({ok: false, data: [], error: err})
                reject('Unable to find favorite songs')
            })
        })
    }


    searchSongChords(song: Song): Promise<Data<Song>> {
        return new Promise<Data<Song>>((resolve, reject) => {
            this.dbService.findSavedSong(song.id).then(result => {
                // console.log(resDb)
                if (result.ok && result.data && result.data[0] && result.data[0].id) {
                    const song = result.data.map(songDb => mapSongDbToDomain(songDb, true))
                    console.log('Resolve DB')
                    return { found: true, data: song[0] }
                }
                else return { found: false }
            }).then(resultDb => {
                if (resultDb.found && resultDb.data) {
                    resolve({ data: resultDb.data })
                }
                else {
                    this.apiService.getSongChords(song.chordsLink).then(resApi => {
                        if (resApi.ok && resApi.data) {
                            const song = mapSongChordsApiToDomain(resApi.data)
                            console.log('Resolve API')
                            resolve({ data: song })
                        }
                        else {
                            reject('Could not fetch song')
                        }
                    })
                }
            }).catch(errDb => {
                console.log(errDb)
                reject('Unable to find songs')
            })
        })
    }
    // searchSong(song: Song): Promise<Data<Song>> {
    //     return new Promise<Data<Song>>((resolve, reject) => { 
    //         this.dbService.findSavedSong(song.id).then(resDb => {
    //             // console.log(resDb)
    //             if(resDb.ok && resDb.data && resDb.data[0] && resDb.data[0].id){
    //                 const song = resDb.data.map(songDb => mapSongDbToDomain(songDb, true))
    //                 console.log('Resolve DB')
    //                 // resolve({data: song[0], ok: true})
    //                 return resolve({data: song[0]})
    //             }
    //         console.log('Continuing')
    //         this.apiService.getSongChords(song.chordsLink).then(resApi=>{
    //             if(resApi.ok && resApi.data){
    //                 const song = mapSongChordsApiToDomain(resApi.data)
    //                 console.log('Resolve API')
    //                 // resolve({data: song, ok: true})
    //                 resolve({data: song})
    //             }
    //         }).catch(errApi=>{
    //             console.log(errApi)
    //             // reject({ok: false, error: 'Song can not be fetched'})
    //             reject('Unable to fetch songs')
    //         })
    //     }).catch(errDb => {
    //         console.log(errDb)
    //         // reject({ok: false, error: `Song not found in saved`})
    //         reject('Unable to find songs')
    //     })
    // })}


    fetchSongs(query: string, page: number, top100: boolean = false, type: number = 300, sortOrder: string = 'desc'): Promise<Data<Array<Song>>> {
        return new Promise<Data<Array<Song>>>((resolve, reject) => {
            this.apiService.getSongs(query, page, top100, type, sortOrder).then(data => {
                if (data.ok && data.data) {
                    const songs = data.data.map(song => mapSongApiToDomain(song))
                    resolve({ data: songs, online: true })
                }
                return {online: false}
            }).catch(err => {
                console.log('axios error catched')
                return {online: false}
            }).then(res => {
                console.log('Fetching songs from DB')
                this.dbService.findLastSavedSongs(query, 50, sortOrder).then(data => {
                    if (data.ok && data.data) {
                        const songs = data.data.map(song => mapSongDbToDomain(song))
                        resolve({ data: songs, online: false })
                    }
                    reject('Can not find any data...')
                }).catch(err => {
                    reject('Unable to search latest saved songs')
                })
            })
        })
    }

    removeSongFromPlaylist(songId: number, playlistId: number): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.dbService.deleteSongFromPlaylist(songId, playlistId).then(data => {
                if (data.ok && data.result && data.result.rowsAffected > 0) resolve(true)
                else resolve(false)
            }).catch(err => {
                reject('Can not remove song from favorites')
            })
        })
    }

    addSongToPlaylist(song: Song, playlistID: number): Promise<boolean> {
        const songDb = mapSongDomainToDb(song)
        return new Promise<boolean>((resolve, reject) => {
            this.dbService.insertSong(songDb).then(result => {
                if (result.ok && result.result && result.result.rowsAffected > 0) return result.result.insertId
                else if (result.ok && result.result && result.result.rowsAffected === 0) return songDb.id
                else return songDb.id
            }).then(songId => {
                return this.dbService.insertSongToPlaylist(songId, playlistID)
            }).then(result2 => {
                if (result2.ok && result2.result && result2.result.rowsAffected > 0) resolve(true)
                else if (result2.ok && result2.result && result2.result.rowsAffected === 0) resolve(false)
                else resolve(false)
            }).catch(err => {
                reject('Something went wrong during insertion')
            })
        })
    }


    findPlaylistInfo(): Promise<Array<Playlist>> {
        return new Promise<Array<Playlist>>((resolve, reject) => {
            this.dbService.findPlaylistInfo().then(data=>{
                if(data.ok && data.data){
                    const playlistInfos = data.data.map(playlistInfo=>{
                        return mapPlaylistInfoDbToDomain(playlistInfo)
                    })
                    resolve(playlistInfos)
                }
            }).catch(err=>{
                reject('Can not find any playlist data')
            })
        })
    }

    // searchLastSavedSongs(limit: number=50): Promise<SQLResult<Song>> {
    //     const result = this.dbService.findLastSavedSongs(limit).then(data=>{
    //         if(data.ok && data.data){
    //             const songs = data.data.map(s=>{
    //                 const song = mapSongDbToDomain(s)
    //                 return song
    //             })
    //             return {ok: data.ok, data: songs}
    //         }
    //         else{
    //             return {ok: data.ok, data: []} 
    //         }

    //     }).catch(err=>{
    //         return {ok: false, data: []}
    //     })
    //     return result
    // }

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
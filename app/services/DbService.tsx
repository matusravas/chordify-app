import { IDbService } from "./IDbService";
import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
import { SongDto } from "../model/db/types";
import { FavoriteSongIds as FavoriteSongId, PlaylistInfoDto, SQLResult } from "../model/db/sql/types";

class DbService implements IDbService{
    static _instance: DbService

    private constructor(){
        enablePromise(true)
        Promise.all([
            this.enableForeignKeys(),
            this.createSongTable(),
            this.createPlaylistTable(),
            this.createSongPlaylistTable()
        ]).then(res=>{
            console.log('Tables created')
        }).catch(err=>{
            console.log(err)
        })
    }


    async findFavoriteSongIdsBySongIds(songIds: Array<number>): Promise<SQLResult<FavoriteSongId>>{
        const selectSongs = `SELECT sp.song_id FROM song_playlist as sp WHERE (sp.playlist_id = 1 AND sp.song_id IN (${[...songIds]}))`
        return this.executeQuery(selectSongs)
    }

    async findSongsInPlaylist(playlistId: number, query: string, timestampAdded: number, sortOrder: string): Promise<SQLResult<SongDto>> {
        const values = 's.id, s.name, s.artist, s.chords_link, s.full_url, s.votes, s.rating, sp.timestamp_added AS timestamp_added_to_playlist'
        const queryClause = query?`AND (lower(s.name) LIKE lower('%${query}%') OR lower(s.artist) LIKE lower('%${query}%'))` : ''
        const pagingClause = timestampAdded > 0?`AND sp.timestamp_added ${sortOrder && sortOrder === 'desc'? '<':'>'} ${timestampAdded}`: ''
        // const limitClause = numRows > 0?`LIMIT ${numRows}` : ''
        const limitClause = 'LIMIT 50'
        const orderClause = sortOrder?`ORDER BY sp.timestamp_added ${sortOrder.toUpperCase()}` : ''
        const selectSongs = `SELECT ${values} FROM song as s INNER JOIN song_playlist as sp ON sp.song_id = s.id WHERE (sp.playlist_id = ?) ${pagingClause} ${queryClause} ${orderClause} ${limitClause}`;
        console.log(selectSongs)
        return this.executeQuery(selectSongs, [playlistId])
    }
    
    async findLastSavedSongs(query: string, timestampSaved: number, sortOrder: string): Promise<SQLResult<SongDto>> {
        const values = 's.id, s.name, s.artist, s.chords_link, s.full_url, s.votes, s.rating, s.timestamp_saved'
        const queryClause = query?`WHERE (lower(s.name) LIKE lower('%${query}%') OR lower(s.artist) LIKE lower('%${query}%'))` : ''
        const pagingClause = timestampSaved > 0?`${query?'AND': 'WHERE'} s.timestamp_saved ${sortOrder && sortOrder === 'desc'? '<':'>'} ${timestampSaved}`: ''
        // const limitClause = numRows > 0?`LIMIT ${numRows}` : ''
        const limitClause = 'LIMIT 50'
        const orderClause = sortOrder?`ORDER BY timestamp_saved ${sortOrder.toUpperCase()}` : ''
        const selectSongs = `SELECT ${values} FROM song as s ${queryClause} ${pagingClause} ${orderClause} ${limitClause}`;
        console.log(selectSongs)
        return this.executeQuery(selectSongs)
    }
    
    
    async findSavedSong(songId: number): Promise<SQLResult<SongDto>> {
        const values = 's.id, s.name, s.artist, s.chords_link, s.full_url, s.votes, s.rating, s.chords'
        const selectSong = `SELECT ${values} FROM song as s WHERE (s.id = ?)`
        return this.executeQuery(selectSong, [songId])
    }

    // async findLastSavedSongs(query: string, numRows: number, sortOrder: string): Promise<SQLResult<SongDto>> {
    //     const values = 's.id, s.name, s.artist, s.chords_link, s.full_url, s.votes, s.rating'
    //     const queryClause = query?`WHERE (lower(s.name) LIKE lower('%${query}%') OR lower(s.artist) LIKE lower('%${query}%'))` : ''
    //     const limitClause = numRows > 0?`LIMIT ${numRows}` : ''
    //     // const orderClause = sortOrder?`ORDER BY sp.timestamp_added ${sortOrder.toUpperCase()}` : ''
    //     // const selectSong = `SELECT ${values} FROM song as s WHERE (s.id = ?)`
    //     const selectSong = `SELECT ${values} FROM song as s INNER JOIN song_playlist as sp ON s.id = sp.id ${queryClause} ORDER BY sp.timestamp_added ${sortOrder.toUpperCase()} ${limitClause}`
    //     return this.executeQuery(selectSong)
    // }


    async findPlaylistInfo(): Promise<SQLResult<PlaylistInfoDto>> {
        const selectQuery = `SELECT P.ID AS playlist_id, P.NAME, COUNT(S.ID) AS count, P.TIMESTAMP_EDITED AS timestamp_edited, P.TIMESTAMP_CREATED as timestamp_created FROM PLAYLIST AS P
         LEFT JOIN SONG_PLAYLIST AS SP ON P.ID = SP.PLAYLIST_ID LEFT JOIN SONG AS S ON S.ID = SP.SONG_ID GROUP BY P.ID`
        // const selectQuery = `SELECT COUNT(*) AS count, MAX(S.TIMESTAMP_VISIT) AS timestamp_visit, SP.PLAYLIST_ID, P.NAME FROM SONG AS S INNER JOIN SONG_PLAYLIST AS SP
        //  ON S.ID = SP.SONG_ID INNER JOIN PLAYLIST AS P ON P.ID = SP.PLAYLIST_ID GROUP BY SP.PLAYLIST_ID`
        return this.executeQuery(selectQuery)
    }
    
    
    async insertSong(song: SongDto): Promise<SQLResult> {
        const timestampNow = new Date().getTime()
        const insertSong = `INSERT OR IGNORE INTO song (id, artist, name, chords_link, full_url, votes, rating, chords, timestamp_saved) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        return this.executeQuery(insertSong, [song.id, song.artist, song.name, song.chords_link, song.full_url, song.votes, song.rating, song.chords?song.chords:'', timestampNow])
    }
    
    async insertSongToPlaylist(songId: number, playlistId: number): Promise<SQLResult> {
        const timestampNow = new Date().getTime()
        const insertSongPlaylist = `INSERT INTO song_playlist (id, song_id, playlist_id, timestamp_added) VALUES (?, ?, ?, ?)`
        return this.executeQuery(insertSongPlaylist, [songId * playlistId, songId, playlistId, timestampNow])
    }
    
    async updatePlaylistTimestampVisit(playlistId: number): Promise<SQLResult> {
        const timestampNow = new Date().getTime()
        const updatePlaylist = `UPDATE playlist SET timestamp_edited = ? WHERE id = ?`
        return this.executeQuery(updatePlaylist, [timestampNow, playlistId])
    }

    // async insertSongToPlaylist(song: SongDto, playlistId: number): Promise<SQLResult<InsertSongToPlaylist>> {
    //     const timestampNow = new Date().getTime()
    //     const insertSong = `INSERT OR IGNORE INTO song (id, artist, name, chords_link, full_url, votes, rating, chords, timestamp_visit) 
    //                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    //     const result1 = this.executeQuery(insertSong, [song.id, song.artist, song.name, song.chords_link, song.full_url, song.votes, song.rating, song.chords?song.chords:'', timestampNow])
    //     // if (result1.result?.rowsAffected && result1.result?.rowsAffected > 0){
    //     // const insertSongPlaylist = `INSERT OR IGNORE INTO song_playlist (song_id, playlist_id, timestamp_added) VALUES (?, ?, ?)`;
    //     // ! Todo this is not executed, WHEN INSERTING FIRST ITEM TO SP THE SELECT RETURNS 0ROWS BECAUSE NOTHING IS THERE!!!! 
    //     // ! THIS WOULD ONLY WORKS IF ALREADY SOM ROWS!!!! 
    //     // const insertSongPlaylist = `INSERT INTO song_playlist (song_id, playlist_id, timestamp_added) SELECT ?, ?, ? FROM song_playlist as sp WHERE (sp.song_id != ? OR sp.playlist_id != ?) LIMIT 1`
    //     const insertSongPlaylist = `INSERT INTO song_playlist (id, song_id, playlist_id, timestamp_added) VALUES (?, ?, ?, ?)`
    //     const result2 = this.executeQuery(insertSongPlaylist, [song.id * playlistId, song.id, playlistId, timestampNow])
    //     // return [result1, result2]
    //     return new Promise<SQLResult<InsertSongToPlaylist>>((resolve, reject) => {
    //         Promise.all([result1, result2]).then(results=>{
    //             const songId = results[0].result?.insertId
    //             if (songId !== undefined) resolve({ok: true, data: [{songId: songId, playlistId: playlistId, songPlaylistId: results[1].result?.insertId}]})
    //             else resolve({ok: true})
                
    //             // return {song_id: res1.result?.insertId}
    //         }).catch(err=>{
    //             reject({ok: false, error: err})
    //         })
    //     })
    // }

    async createPlaylist(playlistName: string): Promise<SQLResult> {
        const now = new Date().getTime()
        const createPlaylist = `INSERT INTO playlist (name, timestamp_created, timestamp_edited) VALUES (?, ?, ?)`
        return this.executeQuery(createPlaylist, [playlistName, now, now]) 
    }
    
    async deleteSongFromPlaylist(songId: number, playlistId: number): Promise<SQLResult> {
        const deleteSongPlaylist = `DELETE FROM song_playlist as sp WHERE (sp.song_id = ? AND sp.playlist_id = ?)`
        return this.executeQuery(deleteSongPlaylist, [songId, playlistId])
    }

    
    
    getDBConnection = async () => {
        return openDatabase({name: 'chordify.db', location: 'default'})
        
    };

    private enableForeignKeys = async () => {
        const db = await this.getDBConnection()
        await db.executeSql('PRAGMA foreign_keys = ON')
    }

    // ------------------
    // Creating tables
    // ------------------
    private createSongTable = async () => {
        const query = `CREATE TABLE IF NOT EXISTS song
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                artist TEXT NOT NULL, name TEXT NOT NULL, chords_link TEXT NOT NULL, full_url TEXT NOT NULL,
                votes INTEGER NOT NULL, rating NUMBER NOT NULL,
                chords TEXT NOT NULL, timestamp_saved NUMBER
                );`
        await this.executeQuery(query)
      };
    
      private createPlaylistTable = async () => {
        const timestampNow = new Date().getTime()
        const query = `CREATE TABLE IF NOT EXISTS playlist
              (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, timestamp_created NUMBER NOT NULL, timestamp_edited NUMBER);`
        const query1 = `INSERT OR IGNORE INTO playlist (id, name, timestamp_created) VALUES (?, ?, ?);`
        await this.executeQuery(query)
        await this.executeQuery(query1, [1, 'Favorites', timestampNow])
        
      };
      
      private createSongPlaylistTable = async () => {
        const query = `CREATE TABLE IF NOT EXISTS song_playlist
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                song_id INTEGER REFERENCES song(id) ON DELETE CASCADE, 
                playlist_id INTEGER REFERENCES playlist(id) ON DELETE CASCADE, 
                timestamp_added NUMBER NOT NULL
                );`
        await this.executeQuery(query)
      };
    

    static getInstance(): DbService{
        return this._instance || (this._instance = new this());
    }

    private executeQuery = (query: string, params?: Array<number|string>) => {
        return new Promise<SQLResult>((resolve, reject) => {
            this.getDBConnection().then(db=>{
                db.transaction(tx=>{
                    tx.executeSql(query, params, (_tx, result)=>{
                        // console.log(result)
                        resolve({data: result.rows.raw(), result: result, ok: true})
                    })
                }).catch(err=>{
                    console.error(err)
                    reject(err)
                })
            }).catch(err=>{
                console.log('Can not connect to DB. '+ err)
                reject({ok: false, error: 'Can not connect to DB'})
            })})
    }
    
}

export default DbService
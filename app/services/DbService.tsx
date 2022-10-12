import { Response } from "../model/api/types";
import { Song } from "../model/domain/types";
import { IDbService } from "./IDbService";
import {openDatabase, enablePromise, ResultSet, ResultSetRowList} from 'react-native-sqlite-storage';
import { SongDto, PlaylistDto } from "../model/db/types";
import { InsertSongToPlaylist, SQLResult } from "../model/db/sql/types";

class DbService implements IDbService{
    static _instance: DbService

    private constructor(){
        enablePromise(true)
        Promise.all([
            this.createSongTable(),
            this.createPlaylistTable(),
            this.createSongPlaylistTable()
        ]).then(res=>{
            console.log('Tables created')
        }).catch(err=>{
            console.log(err)
        })
    }


    async removeSongFromPlaylist(song: SongDto, playlistId: number): Promise<SQLResult> {
        // const deleteSong = `DELETE FROM song WHERE song.id = ?`;
        // const resultSong = await (await this.getDBConnection()).executeSql(deleteSong, [song.id])
        const deleteSongPlaylist = `DELETE FROM song_playlist as sp WHERE (sp.song_id = ? AND sp.playlist_id = ?`;
        const resultSongPlaylist = await (await this.getDBConnection()).executeSql(deleteSongPlaylist, [song.id, playlistId])
        return {ok: true}
    }

    async createPlaylist(playlist: PlaylistDto): Promise<SQLResult<number>> {
        const createPlaylist = `INSERT INTO playlist (name, timestamp_created) VALUES (?, ?, ?)`;
        const result = await (await this.getDBConnection()).executeSql(createPlaylist, [playlist.name, playlist.timestamp_created])
        return {ok: true, data: result[0].insertId}  
    }

    async findSongsInPlaylist(playlistId: number, query: string, numRows: number, sortOrder: string): Promise<SQLResult<Array<SongDto>>> {
        const values = 's.id, s.name, s.artist, s.chords_link, s.full_url, s.votes, s.rating'
        const queryClause = query?`AND (lower(s.name) LIKE lower('%${query}%') OR lower(s.artist) LIKE lower('%${query}%'))` : ''
        const limitClause = numRows>0?`LIMIT ${numRows}` : ''
        const orderClause = sortOrder?`ORDER BY sp.timestamp_added ${sortOrder.toUpperCase()}` : ''
        const selectSong = `SELECT ${values} FROM song as s INNER JOIN song_playlist as sp ON sp.song_id = s.id WHERE (sp.playlist_id = ?) ${queryClause} ${orderClause} ${limitClause}`;
        console.log(selectSong)
        const db = await this.getDBConnection()
        const result = await db.executeSql(selectSong, [playlistId])
        await db.close()
        // const result = db.transaction(tx=>{
        //     tx.executeSql(selectSong, [playlistId], (tx, res)=>{
        //         return res.rows.raw().map(item=>{
        //             return {...item} as SongDto
        //         })
        //     })
        // }).then(result=>result).catch(err=>err)
        // console.log(result)
        return {ok: true, data: result[0].rows.raw()}
    }

    async insertSongToPlaylist(song: SongDto, playlistId: number): Promise<SQLResult<InsertSongToPlaylist>> {
        const timestampNow = new Date().getTime()
        console.log(song)
        const insertSong = `INSERT OR IGNORE INTO song (id, artist, name, chords_link, full_url, votes, rating, chords, timestamp_visit) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result1 = await (await this.getDBConnection()).executeSql(insertSong, 
            [song.id, song.artist, song.name, song.chords_link, song.full_url,
                 song.votes, song.rating, song.chords, timestampNow]
            )
        if (result1[0].insertId > 0 && result1[0].rowsAffected && result1[0].rowsAffected > 0){
            const inserSongPlaylist = `INSERT INTO song_playlist (song_id, playlist_id, timestamp_added) VALUES (?, ?, ?)`;
            const result2 = await (await this.getDBConnection()).executeSql(inserSongPlaylist, [song.id, playlistId, timestampNow])
            
            return {ok: true, data: {songId: song.id, playlistId: playlistId, songPlaylistId: result2[0].insertId}}
        }
        return {ok: true, data: {songId: song.id, playlistId: playlistId}}
    }
    
    
    getDBConnection = async () => {
        const db = await openDatabase({name: 'chordify.db', location: 'default'});
        return db
    };

    private createSongTable = async () => {
        const query = `CREATE TABLE IF NOT EXISTS song
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                artist TEXT NOT NULL, name TEXT NOT NULL, chords_link TEXT NOT NULL, full_url TEXT NOT NULL,
                votes INTEGER NOT NULL, rating NUMBER NOT NULL,
                chords TEXT NOT NULL, timestamp_visit NUMBER
                );
            `;
        await (await this.getDBConnection()).executeSql(query)
      };
    
      private createPlaylistTable = async () => {
        const timestampNow = new Date().getTime()
        const query = `CREATE TABLE IF NOT EXISTS playlist
              (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, timestamp_created NUMBER NOT NULL, timestamp_visit NUMBER);

                INSERT OR IGNORE INTO playlist (id, name, timestamp_created) VALUES (?, ?, ?);
            `;
        const query1 = `INSERT OR IGNORE INTO playlist (id, name, timestamp_created) VALUES (?, ?, ?);
        `;
        const result = await (await this.getDBConnection()).executeSql(query)
        console.log(result)
        // if (result[0].insertId !== undefined) 
        await (await this.getDBConnection()).executeSql(query1, [1, 'Favorites', timestampNow])
      };
      
      private createSongPlaylistTable = async () => {
        const query = `CREATE TABLE IF NOT EXISTS song_playlist
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                song_id INTEGER REFERENCES song(id), 
                playlist_id INTEGER REFERENCES playlist(id), 
                timestamp_added NUMBER NOT NULL
                );
            `;
        await (await this.getDBConnection()).executeSql(query)
      };
    

    static getInstance(): DbService{
        return this._instance || (this._instance = new this());
    }
    
}

export default DbService
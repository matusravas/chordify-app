import { Response } from "../model/api/types";
import { Song } from "../model/domain/types";
import { IDbService } from "./IDbService";
import {openDatabase, enablePromise, ResultSet, ResultSetRowList} from 'react-native-sqlite-storage';
import { SongDto, PlaylistDto } from "../model/db/types";
import { SongToPlaylistInsert } from "../model/db/sql/types";

class DbService implements IDbService{
    static _instance: DbService
    // private db; 

    private constructor(){
        console.log('DbService private constructor')
        enablePromise(true)
        Promise.all([
            this.createSongTable(),
            this.createPlaylistTable(),
            this.createSongPlaylistTable()
        ]).then(res=>{
            console.log('Tables should be created')
        }).catch(err=>{
            console.log(err)
        })
    }

    async insertSongToPlaylist(song: SongDto, playlistId: number): Promise<SongToPlaylistInsert> {
        const timestampNow = new Date().getTime()
        // INTO song_playlist VALUES (?, ?, ?)
        console.log(song)
        const querySong = `INSERT OR IGNORE INTO song (id, artist, name, chords_link, full_url, votes, rating, chords, timestamp_visit) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) 
                    
            `;
        const result1 = await (await this.getDBConnection()).executeSql(querySong, 
            [
                song.id, song.artist, song.name, song.chords_link, song.full_url, song.votes, song.rating, song.chords, timestampNow,
            ]
            )
        if (result1[0].insertId > 0 && result1[0].rowsAffected && result1[0].rowsAffected > 0){
            const queryPlaylist = `INSERT INTO song_playlist (song_id, playlist_id, timestamp_added) 
                VALUES (?, ?, ?)
                
                `;
            const result2 = await (await this.getDBConnection()).executeSql(queryPlaylist, 
                [
                    song.id, playlistId, timestampNow
                ]
                )
            
            return {songId: song.id, playlistId: playlistId, songPlaylistId: result2[0].insertId}
        }
        return {songId: song.id, playlistId: playlistId}
    }

    insertSong(song: SongDto): Promise<ResultSet[]> {
        throw new Error("Method not implemented.");
    }
    insertPlaylist(playlist: PlaylistDto): Promise<ResultSet[]> {
        throw new Error("Method not implemented.");
    }
    findAllSongsInPlaylist(playlistId: number): Promise<ResultSetRowList> {
        throw new Error("Method not implemented.");
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
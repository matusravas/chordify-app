import { Response } from "../model/api/types";
import { Song, SongChords } from "../model/domain/types";
import { IDbService } from "./IDbService";
import {openDatabase, enablePromise, ResultSet, ResultSetRowList} from 'react-native-sqlite-storage';
import { SongDto, PlaylistDto } from "../model/db/types";

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

    async insertSongToPlaylist(song: SongDto, playlistId: number): Promise<ResultSet[]> {
        const timestampNow = new Date().getMilliseconds()
        // INTO song_playlist VALUES (?, ?, ?)
        console.log(song)
        const query = `INSERT INTO song (artist, name, chords_link, full_url, votes, rating, chords, timestamp_visit) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    
            `;
        console.log(timestampNow)
        return await (await this.getDBConnection()).executeSql(query, 
            [
                song.artist, song.name, song.chords_link, song.full_url, song.votes, song.rating, song.chords, timestampNow,
                // song.id, playlistId, timestampNow
            ]
            )
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
        const query = `CREATE TABLE IF NOT EXISTS playlist
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL, timestamp_created NUMBER NOT NULL, timestamp_visit NUMBER
                );
            `;
        await (await this.getDBConnection()).executeSql(query)
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
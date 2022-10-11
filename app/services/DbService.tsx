import { Response } from "../model/api/types";
import { Song, SongChords } from "../model/domain/types";
import { IDbService } from "./IDbService";
import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

class DbService implements IDbService{
    static _instance: DbService
    // private db; 

    private constructor(){
        enablePromise(true)
        // this.db = this.getDBConnection()
    }
    
    getDBConnection = async () => {
        const db = await openDatabase({name: 'chordify.db', location: 'default'});
        return db
    };

    private createSongTable = async () => {
        // create table if not exists
        const query = `CREATE TABLE IF NOT EXISTS song(
              value TEXT NOT NULL
          );`;
      
        await (await this.getDBConnection()).executeSql(query)
      };

    

    static getInstance(): DbService{
        return this._instance || (this._instance = new this());
    }

    getSongs(query: string, type: number, sortOrder: string, page: number): Promise<Response<Song[]>> {
        throw new Error("Method not implemented.");
    }
    getSongDetails(chordsLink: string): Promise<Response<Song>> {
        throw new Error("Method not implemented.");
    }
    getSongChords(chordsLink: string): Promise<Response<SongChords>> {
        throw new Error("Method not implemented.");
    }
    
}
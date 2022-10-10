import axios from "axios";
import { Response, SongChordsDto, SongDto } from "../model/api/types";
import { IApiService } from "./IApiService";


class ApiService implements IApiService {
    static _instance: ApiService

    private _apiToken = '2lpbxtDLNIO4yKgIQOjaJxw8qBzSkbvh'

    private _baseURL = 'https://chordify-ws.herokuapp.com/api'
    // private const _baseURL = 'http://10.0.2.2:5000'

    private constructor(){}

    static getInstance(): ApiService {
        return this._instance || (this._instance = new this());
    }
    
    async getSongs(query: string, page: number, top100: boolean, type: number, sortOrder: string): Promise<Response<SongDto[]>> {
        return axios({
            method: 'GET',
            url: `${this._baseURL}/songs?query=${query}&page=${page}&type=${type}&sort_order=${sortOrder}&top100=${top100}`,
            responseType: 'json',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this._apiToken
            },
            validateStatus: function (status) {
                return status >= 200 || status <= 300 ? true : false
            }
        }).then(res => {
            return {ok: res.data.ok, data: res.data.data as SongDto[]}
        }).catch(err => {
            console.error(err)
            return {ok: false, data: {} as SongDto[]}
        })
    }

    async getSongDetails(chordsLink: string): Promise<Response<SongDto>> {
        return axios({
            method: 'GET',
            url: `${this._baseURL}/song?tab=${chordsLink}`,
            responseType: 'json',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this._apiToken
            },
            validateStatus: function (status) {
                return status >= 200 || status <= 300 ? true : false
            }
        }).then(res => {
            return {ok: res.data.ok, data: res.data.data as SongDto}
        }).catch(err => {
            console.error(err)
            return {ok: false, data: {} as SongDto}
        })
    }

    async getSongChords(chordsLink: string): Promise<Response<SongChordsDto>> {
        return axios({
            method: 'GET',
            url: `${this._baseURL}/song/chords?tab=${chordsLink}`,
            responseType: 'json',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: this._apiToken
            },
            validateStatus: function (status) {
                return status >= 200 || status <= 300 ? true : false
            }
        }).then(res => {
            return {ok: res.data.ok, data: res.data.data as SongChordsDto}
        }).catch(err => {
            console.error(err)
            return {ok: false, data: {} as SongChordsDto}
        })
    }
}

export default ApiService
import { SongChordsDto as SongChordsApi, SongDto as SongApi} from "../../model/api/types";
import { PlaylistInfoDto as PlaylistInfoDb } from "../../model/db/sql/types";
import { SongDto as SongDb, PlaylistDto as PlaylistDb} from "../../model/db/types";
import { Playlist, Song } from "../../model/domain/types";

export const mapSongApiToDomain = (songApi: SongApi): Song => {
    const {statistics, full_url, chords_link, ...rest} = songApi
    const song: Song = {votes: statistics.votes, rating: statistics.rating, 
        chordsLink: chords_link, fullUrl: full_url, isFavorite: false, ...rest}
    return song
}

export const mapSongDomainToApi = (song: Song): SongApi => {
    const {fullUrl: full_url, chordsLink: chords_link, rating, votes, ...rest} = song
    const songApi: SongApi = {statistics: {votes, rating}, chords_link, full_url, ...rest}
    return songApi
}

export const mapSongDbToDomain = (songDb: SongDb, showChords: boolean=false): Song => {
    const {full_url: fullUrl, chords_link: chordsLink, timestamp_last_visit: timestampLastVisit, chords, ...rest} = songDb
    const song: Song = {chordsLink, fullUrl, timestampLastVisit, isFavorite: false, ...rest, ...(showChords && { chords: chords })}
    return song
}

export const mapSongDomainToDb = (song: Song): SongDb => {
    const {fullUrl: full_url, chordsLink: chords_link, rating, votes, ...rest} = song
    const songDb: SongDb = {chords_link, full_url, votes, rating, chords: rest.chords? rest.chords: '', ...rest}
    return songDb
}

export const mapSongChordsApiToDomain = (songChordsApi: SongChordsApi): Song => {
    const {song: songApi, chords, chords_metadata: metadata} = songChordsApi
    const song = {...mapSongApiToDomain(songApi), chords}
    return song
}

export const mapPlaylistInfoDbToDomain = (playlistInfo: PlaylistInfoDb): Playlist => {
    const {count, playlist_id, name, timestamp_visit, timestamp_create: timestamp_created} = playlistInfo
    const playlist: Playlist = {id: playlist_id, name: name, songsCount: count, timestampVisit: timestamp_visit, timestampCreated: timestamp_created}
    return playlist
}
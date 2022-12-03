import { Playlist, Song } from "./domain/types"

// export type ActionType = 'add'|'remove'|'favoritesAdd'|'favoritesRemove'
export enum ActionType { PlaylistAdd, PlaylistRemove, FavoritesAdd, FavoritesRemove}

export type Action = {
    song: Song,
    playlist?: Playlist
    action?: ActionType,
}

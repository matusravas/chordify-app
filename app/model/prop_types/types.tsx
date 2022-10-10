import { Song } from "../domain/types";

export interface SongCardProps {
    song: Song,
    onSongCardClick: (song: Song) => void
    onAddToFavoitesButtonClick: (song: Song) => void
}
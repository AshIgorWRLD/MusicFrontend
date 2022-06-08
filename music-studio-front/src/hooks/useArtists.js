import {useMemo} from "react";

export const useSortedArtists = (artists, sort) => {
    const sortedArtists = useMemo(() => {
        if (sort) {
            return [...artists].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return artists;
    }, [sort, artists])

    return sortedArtists
}

export const useArtists = (artists, sort, query) => {
    const sortedArtists = useSortedArtists(artists, sort)
    const sortedAndSearchedArtists = useMemo(() => {
        return sortedArtists.filter(artist => artist.stageName.includes(query))
    }, [query, sortedArtists])

    return sortedAndSearchedArtists;
}
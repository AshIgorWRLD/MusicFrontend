import {useMemo} from "react";

export const useSortedGroups = (groups, sort) => {
    const sortedGroups = useMemo(() => {
        if (sort) {
            return [...groups].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return groups;
    }, [sort, groups])

    return sortedGroups
}

export const useGroups = (groups, sort, query) => {
    const sortedGroups = useSortedGroups(groups, sort)
    const sortedAndSearchedGroups = useMemo(() => {
        return sortedGroups.filter(group => group.name.includes(query))
    }, [query, sortedGroups])

    return sortedAndSearchedGroups;
}
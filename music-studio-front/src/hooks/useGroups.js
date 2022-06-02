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
    const sortedUsers = useSortedGroups(groups, sort)
    const sortedAndSearchedGroups = useMemo(() => {
        return sortedUsers.filter(group => group.name.includes(query))
    }, [query, sortedUsers])

    return sortedAndSearchedGroups;
}
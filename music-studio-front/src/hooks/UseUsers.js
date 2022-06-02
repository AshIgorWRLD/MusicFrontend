import {useMemo} from "react";

export const useSortedUsers = (users, sort) => {
    const sortedUsers = useMemo(() => {
        if (sort) {
            return [...users].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return users;
    }, [sort, users])

    return sortedUsers
}

export const useUsers = (users, sort, query) => {
    const sortedUsers = useSortedUsers(users, sort)
    const sortedAndSearchedUsers = useMemo(() => {
        return sortedUsers.filter(user => user.name.includes(query))
    }, [query, sortedUsers])

    return sortedAndSearchedUsers;
}
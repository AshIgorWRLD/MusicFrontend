import {useMemo} from "react";

export const useSortedClients = (clients, sort) => {
    const sortedClients = useMemo(() => {
        if (sort) {
            return [...clients].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return clients;
    }, [sort, clients])

    return sortedClients
}

export const useClients = (clients, sort, query) => {
    const sortedClients = useSortedClients(clients, sort)
    const sortedAndSearchedClients = useMemo(() => {
        return sortedClients.filter(client => client.type.includes(query))
    }, [query, sortedClients])

    return sortedAndSearchedClients;
}
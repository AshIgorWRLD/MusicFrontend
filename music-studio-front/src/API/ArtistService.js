import axios from "axios";

export default class ArtistService {
    static async getAll(limit = 10, page = 0, field = null) {
        const response = await axios.get('http://localhost:8080/ynmusic/users/clients/artists', {
            params: {
                limit: limit,
                page: page,
                sortBy: field
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8080/ynmusic/users/clients/artists' + id)
        return response
    }

    static async post(clientId, groupId, stageName, genre, creationDate) {
        const response = await axios.post('http://localhost:8080/ynmusic/users/clients/artists',
            {clientId, groupId, stageName, genre, creationDate})
        return response
    }

    static async put(id, clientId, groupId, stageName, genre, creationDate) {
        const response = await axios.put('http://localhost:8080/ynmusic/users/clients/artists' + id,
            {clientId, groupId, stageName, genre, creationDate})
        return response
    }

    static async delete(id) {
        const response = await axios.delete('http://localhost:8080/ynmusic/users/clients/artists' + id)
        return response
    }
}
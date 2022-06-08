import axios from "axios";

export default class ClientService {
    static async getAll(limit = 10, page = 0, field = null) {
        const response = await axios.get('http://localhost:8080/ynmusic/users/clients', {
            params: {
                limit: limit,
                page: page,
                sortBy: field
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8080/ynmusic/users/clients/' + id)
        return response
    }

    static async post(userId, type) {
        const response = await axios.post('http://localhost:8080/ynmusic/users/clients/',
            {userId, type})
        return response
    }

    static async put(id, userId, type) {
        const response = await axios.put('http://localhost:8080/ynmusic/users/clients/' + id,
            {userId, type})
        return response
    }

    static async delete(id) {
        const response = await axios.delete('http://localhost:8080/ynmusic/users/clients/' + id)
        return response
    }
}
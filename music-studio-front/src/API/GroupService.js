import axios from "axios";

export default class GroupService {
    static async getAll(limit = 10, page = 0, field = null) {
        const response = await axios.get('http://localhost:8080/ynmusic/groups', {
            params: {
                limit: limit,
                page: page,
                sortBy: field
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8080/ynmusic/groups/' + id)
        return response
    }

    static async post(name, creationDate) {
        const response = await axios.post('http://localhost:8080/ynmusic/groups',{name, creationDate})
        return response
    }

    static async put(id, name, creationDate) {
        const response = await axios.put('http://localhost:8080/ynmusic/groups/' + id,{name, creationDate})
        return response
    }

    static async delete(id) {
        const response = await axios.delete('http://localhost:8080/ynmusic/groups/' + id)
        return response
    }
}
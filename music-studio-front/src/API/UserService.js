import axios from "axios";

export default class UserService {
    static async getAll(limit = 10, page = 0, field = null) {
        const response = await axios.get('http://localhost:8080/ynmusic/users', {
            params: {
                limit: limit,
                page: page,
                sortBy: field
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8080/ynmusic/users/' + id)
        return response
    }

    static async post(name, login, password) {
        const response = await axios.post('http://localhost:8080/ynmusic/users',{name, login, password})
        return response
    }

    static async put(id, name, login, password) {
        const response = await axios.put('http://localhost:8080/ynmusic/users/' + id,{name, login, password})
        return response
    }

    static async delete(id) {
        const response = await axios.delete('http://localhost:8080/ynmusic/users/' + id)
        return response
    }
}
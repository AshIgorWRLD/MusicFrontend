import axios from "axios";

export default class EventService {
    static async getAll(limit = 10, page = 0, field = null) {
        const response = await axios.get('http://localhost:8080/ynmusic/events', {
            params: {
                limit: limit,
                page: page,
                sortBy: field
            }
        })
        return response
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8080/ynmusic/events/' + id)
        return response
    }

    static async post(eventName, audienceAmount, point, eventDate, timing, eventRank) {
        console.log(eventName, audienceAmount, point, eventDate, timing, eventRank)
        const response = await axios.post('http://localhost:8080/ynmusic/events',
            {eventName, audienceAmount, point, eventDate, timing, eventRank})
        return response
    }

    static async put(id, eventName, audienceAmount, point, eventDate, timing, eventRank) {
        console.log(eventName, audienceAmount, point, eventDate, timing, eventRank)
        const response = await axios.put('http://localhost:8080/ynmusic/events/' + id,
            {eventName, audienceAmount, point, eventDate, timing, eventRank})
        return response
    }

    static async delete(id) {
        const response = await axios.delete('http://localhost:8080/ynmusic/events/' + id)
        return response
    }
}
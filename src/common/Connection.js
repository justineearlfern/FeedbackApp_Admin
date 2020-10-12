import axios from "axios";

export default class Connection {

    constructor() {
        this.server = "https://ceu5r-api.herokuapp.com"

    }

    getToken() {
        return localStorage.getItem("token")
    }

    async get(url) {
        return axios.get(`${this.server}/${url}`, {
            headers: {
                Authorization: `Bearer ${await this.getToken()}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response;
        })
    }

    login = async (url, data,) => {
        return axios.post(`${this.server}/${url}`, data,).then(response => {
            return response;
        })
    }

    post = async (url, data,) => {
        return axios.get(`${this.server}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${await this.getToken()}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response;
        })
    }

    put = async (url, data,) => {
        return axios.put(`${this.server}/${url}`, data, {
            headers: {
                Authorization: `Bearer ${await this.getToken()}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response;
        })
    }

    delete = async (url,) => {
        return axios.delete(`${this.server}/${url}`, {
            headers: {
                Authorization: `Bearer ${await this.getToken()}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response;
        })
    }
}
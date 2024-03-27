import axios from "axios";

class UserService {

    getUser(id){
        const API_URL = `http://localhost:3000/users/${id}`;
        return axios.get(API_URL);
    }

    getAllUser(){
        const API_URL = `http://localhost:3000/users`;
        return axios.get(API_URL);
    }

    createUser(){
        const API_URL = `http://localhost:3000/users`;
        return axios.post(API_URL);
    }

    updateUser(){
        const API_URL = `http://localhost:3000/users/${id}`;
        return axios.patch(API_URL);
    }

    deleteUser(){
        const API_URL = `http://localhost:3000/users/${id}`;
        return axios.delete(API_URL);
    }


}
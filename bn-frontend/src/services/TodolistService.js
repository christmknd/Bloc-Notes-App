import axios from "axios";

class TodolistService {

    getTodolistById(id){
        const API_URL = `http://localhost:3000/todolist/${id}`;
        return axios.get(API_URL);
    }

    getAllTodolist(){
        const API_URL = `http://localhost:3000/todolist`;
        return axios.get(API_URL);
    }

    createTodolist(){
        const API_URL = `http://localhost:3000/todolist`;
        return axios.post(API_URL);
    }

    updateTodolist(id){
        const API_URL = `http://localhost:3000/todolist/${id}`;
        return axios.patch(API_URL);
    }

    deleteTodolist(id){
        const API_URL = `http://localhost:3000/todolist/${id}`;
        return axios.delete(API_URL);
    }


}

export default TodolistService;
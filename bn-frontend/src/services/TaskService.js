import axios from "axios";

class TaskService {

    getTask(id){
        const API_URL = `http://localhost:3000/task/${id}`;
        return axios.get(API_URL);
    }

    getAllTask(){
        const API_URL = `http://localhost:3000/task`;
        return axios.get(API_URL);
    }

    createTask(){
        const API_URL = `http://localhost:3000/task`;
        return axios.post(API_URL);
    }

    updateTask(){
        const API_URL = `http://localhost:3000/task/${id}`;
        return axios.patch(API_URL);
    }

    deleteTask(){
        const API_URL = `http://localhost:3000/task/${id}`;
        return axios.delete(API_URL);
    }

}

export default TaskService;
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props) => {

    const [tasks, setTasks] = useState([]);
    const baseUrl = "http://localhost:3001/api/tasks/";

    useEffect(() => {
        async function fetchData() {
            await getAllTasks();
        }
        fetchData();
    }, []);

    function getAllTasks() {
        return axios.get(baseUrl)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function getTask(taskId) {
        return axios.get(baseUrl + id).then((response) => {
            return new Promise((resolve) => resolve(response.data));
        })
            .catch(error => {
                console.log(error);
            });
    }

    function addTask(newTask) {
        return axios.post(baseUrl, task).then((response) => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data))
                .catch(error => {
                    console.log(error);
                });
        })
    }

    function updateTask(id, task) {
        return axios.put(baseUrl + id, task).then(response => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data))
                .catch(error => {
                    console.log(error);
                });
        })
    }

    function deleteTask(id) {
        return axios.delete(baseUrl + id).then(response => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data))
                .catch(error => {
                    console.log(error);
                });
        })
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            getTask,
            addTask,
            updateTask,
            deleteTask
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};
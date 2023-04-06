import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props) => {

    const [task, setTasks] = useState([]);
    const baseUrl = "http://localhost:3000/api/tasks/";

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
        return axios.get(baseUrl + taskId).then((response) => {
            return new Promise((resolve) => resolve(response.data));
        })
            .catch(error => {
                console.log(error);
            });
    }

    function addTask(task) {
        return axios.post(baseUrl, task).then((response) => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data))
                .catch(error => {
                    console.log(error);
                });
        })
    }

    function updateTask(taskId, task) {
        return axios.put(baseUrl + taskId, task).then(response => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data))
                .catch(error => {
                    console.log(error);
                });
        })
    }

    function deleteTask(taskId) {
        return axios.delete(baseUrl + taskId).then(response => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data))
                .catch(error => {
                    console.log(error);
                });
        })
    }

    return (
        <TaskContext.Provider value={{
            task,
            getTask,
            addTask,
            updateTask,
            deleteTask
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};
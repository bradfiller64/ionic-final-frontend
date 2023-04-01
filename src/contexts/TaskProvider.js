import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";

export const TaskProvider = (props) => {

    const [tasks, setTasks] = useState([]);
    const baseUrl = "http://localhost:3000/api/tasks/";

    useEffect(() => {
        getTasks();
    }, []);

    function getTasks() {
        axios.get(baseUrl)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addTask(newTask) {
        axios.post(baseUrl, { title: newTask, completed: false })
            .then(response => {
                setTasks([...tasks, response.data]);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function updateTask(task) {
        axios.put(`${apiUrl}/${task.TaskId}`, task)
            .then(response => {
                const updatedTasks = tasks.map(t => {
                    if (t.TaskId === task.TaskId) {
                        return response.data;
                    }
                    return t;
                });
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.log(error);
            });
    }
};
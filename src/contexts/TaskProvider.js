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
        return axios.get(baseUrl)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function addTask(newTask) {
        return axios.post(baseUrl, { title: newTask, completed: false })
            .then(response => {
                setTasks([...tasks, response.data]); // spread operator to create new array with new task added
            })
            .catch(error => {
                console.log(error);
            });
    }

    function updateTask(task) {
        return axios.put(`${baseUrl}/${task.taskId}`, task)
            .then(response => {
                const updatedTasks = tasks.map(t => { // map to return new array based on the updated task status
                    if (t.taskId === task.taskId) {
                        return response.data; // matches 'id' with 'completed' for changed task
                    }
                    return t; // returns updated task
                });
                setTasks(updatedTasks); // updates the local state of tasks
            })
            .catch(error => {
                console.log(error);
            });
    }

    function deleteTask(taskId) {
        axios.delete(`${baseUrl}/${taskId}`)
            .then(response => {
                const updatedTasks = tasks.filter(t => t.TaskId !== taskId);
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const incompleteTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <TaskContext.Provider value={{
            tasks,
            incompleteTasks,
            completedTasks,
            getTasks,
            addTask,
            updateTask,
            deleteTask
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};
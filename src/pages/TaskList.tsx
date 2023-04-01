import { IonCheckbox, IonItem, IonItemSliding, IonLabel, IonList } from '@ionic/react';
import React from 'react';
import { Task } from "../models/task";

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <IonList>
      <h2>Incomplete Tasks</h2>
      {incompleteTasks.map((task) => (
        <IonItemSliding key={task.taskId}>
          <IonItem>
            <IonCheckbox
              checked={task.completed}
              onIonChange={() => onToggleTask(task)}
            />
            <IonLabel>{task.title}</IonLabel>
          </IonItem>
        </IonItemSliding>
      ))}

      <h2>Completed Tasks</h2>
      {completedTasks.map((task) => (
        <IonItemSliding key={task.taskId}>
          <IonItem>
            <IonCheckbox
              checked={task.completed}
              onIonChange={() => onToggleTask(task)}
            />
            <IonLabel>{task.title}</IonLabel>
          </IonItem>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default TaskList;


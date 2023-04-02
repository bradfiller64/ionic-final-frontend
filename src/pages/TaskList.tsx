import { IonButton, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useContext } from 'react';
import TaskContext from '../contexts/TaskContext';
import { TaskProvider } from '../contexts/TaskProvider';

interface Task {
  taskId: number;
  title: string;
  completed: boolean;
}

const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const handleTaskCheckboxChange = (task: Task) => {
    const updatedTasks = tasks.map((t: Task) => {
      if (t.taskId === task.taskId) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });
    updateTask(updatedTasks);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleAddTask = () => {
    addTask(newTaskName);
    setShowAddTaskDialog(false);
    setNewTaskName('');
  };


  return (
    <IonPage>
      <TaskProvider>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Link's To-Do List:</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <div>
              {tasks.filter((task: Task) => !task.completed).map((task: Task) => (
                <IonItemSliding key={task.taskId}>
                  <IonItem>
                    <IonLabel>{task.title}</IonLabel>
                    <IonCheckbox slot="end" checked={task.completed} onIonChange={() => handleTaskCheckboxChange(task)} />
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonButton color="danger" onClick={() => handleDeleteTask(task.taskId)}>Delete</IonButton>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </div>
          </IonList>
          <IonButton onClick={() => setShowAddTaskDialog(true)}>Add Task</IonButton>
          <IonList>
            <div>
              {tasks.filter((task: Task) => task.completed).map((task: Task) => (
                <IonItemSliding key={task.taskId}>
                  <IonItem>
                    <IonLabel>{task.title}</IonLabel>
                    <IonCheckbox slot="end" checked={task.completed} onIonChange={() => handleTaskCheckboxChange(task)} />
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonButton color="danger" onClick={() => handleDeleteTask(task.taskId)}>Delete</IonButton>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </div>
          </IonList>
          <IonInput
            placeholder="New task name"
            value={newTaskName}
            onIonChange={(e) => setNewTaskName(e.detail.value as string)}
          />
          <IonButton onClick={() => handleAddTask()}>Add</IonButton>
        </IonContent>
      </TaskProvider>
    </IonPage>
  );
};

export default TaskList;
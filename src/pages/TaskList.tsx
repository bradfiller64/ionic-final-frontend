import { IonButton, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask } = useContext(TaskContext);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const handleTaskCheckboxChange = (tasks: { taskId: number, title: string, completed: boolean }) => {
    const updatedTask = { ...tasks, completed: !tasks.completed };
    updateTask(updatedTask);
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tasks.filter((task: { taskId: number, title: string, completed: boolean }) => !task.completed).map((task: { taskId: number, title: string, completed: boolean }) => (
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
        </IonList>
        <IonButton onClick={() => setShowAddTaskDialog(true)}>Add Task</IonButton>
        <IonList>
          {tasks.filter((task: { taskId: number, title: string, completed: boolean }) => task.completed).map((task: { taskId: number, title: string, completed: boolean }) => (
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
        </IonList>
        <IonInput
          placeholder="New task name"
          value={newTaskName}
          onIonChange={(e) => setNewTaskName(e.detail.value as string)}
        />
        <IonButton onClick={() => handleAddTask()}>Add</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TaskList;
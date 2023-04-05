import { IonButton, IonCheckbox, IonContent, IonHeader, IonInput, IonItem, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useContext } from 'react';
import TaskContext from '../contexts/TaskContext';
import { TaskProvider } from '../contexts/TaskProvider';

const TaskList: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);

  const taskComplete = (task: any) => {
    updateTask(task.id, { title: task.title, completed: true })
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const taskIncomplete = (task: any) => {
    updateTask(task.id, { title: task.title, completed: false })
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const slideToDelete = (id: any) => {
    deleteTask(id)
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      });
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
              {tasks.filter((task: { completed: any; }) => !task.completed).map((task: TaskProps) => (
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
              {tasks.filter((task: { completed: any; }) => !task.completed).map((task: TaskProps) => (
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
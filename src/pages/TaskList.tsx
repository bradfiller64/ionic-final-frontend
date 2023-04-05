import { IonCheckbox, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

const TaskList: React.FC = () => {
  const { addTask, updateTask, deleteTask } = useContext(TaskContext);

  const taskComplete = (task: any) => {
    updateTask(task.taskId, { title: task.title, completed: true })
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const taskIncomplete = (task: any) => {
    updateTask(task.taskId, { title: task.title, completed: false })
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      }); 1
  };

  const slideToDelete = (taskId: any) => {
    deleteTask(taskId)
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      });
  };

  // const handleAddTask = () => {
  //   setShowPrompt(true);
  // }

  // const handlePromptSubmit = () => {
  //   addTask({ title: '', completed: false })
  //     .then(() => {
  //       setShowPrompt(false);
  //       setNewTaskName("");
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }


  return (
    <div>
      <div>
        <IonHeader>
          <IonLabel>Link's To-Do List</IonLabel>
        </IonHeader>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList key={task.taskId}>
                <IonListHeader color="warning">
                  <IonLabel color="light" className="ion-margin">
                    Incomplete
                  </IonLabel>
                </IonListHeader>
                {task.map((task: any) => {
                  if (task.completed === false) {
                    return (
                      <IonItemSliding>
                        <IonItem>
                          <IonLabel>{task.title}</IonLabel>
                          <IonCheckbox
                            onIonChange={() => taskComplete(task)}
                            slot="start"
                          ></IonCheckbox>
                        </IonItem>
                        <IonItemOptions side="end">
                          <IonItemOption
                            onClick={() => slideToDelete(task.taskId)}
                            color="danger"
                          >
                            <IonIcon slot="icon-only" icon={trash}></IonIcon>
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    );
                  }
                })}
              </IonList>
            );
          }}
        </TaskContext.Consumer>
      </div>
      <div>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList key={task.taskId}>
                <IonListHeader color="success">
                  <IonLabel color="light" className="ion-margin">
                    Complete
                  </IonLabel>
                </IonListHeader>
                {task.map((task: any) => {
                  if (task.completed === true) {
                    return (
                      <IonItemSliding>
                        <IonItem>
                          <IonLabel>{task.title}</IonLabel>
                          <IonCheckbox
                            onIonChange={() => taskIncomplete(task)}
                            checked={true}
                            slot="start"
                          ></IonCheckbox>
                        </IonItem>
                        <IonItemOptions side="end">
                          <IonItemOption
                            onClick={() => slideToDelete(task.id)}
                            color="danger"
                          >
                            <IonIcon slot="icon-only" icon={trash}></IonIcon>
                          </IonItemOption>
                        </IonItemOptions>
                      </IonItemSliding>
                    );
                  }
                })}
              </IonList>
            );
          }}
        </TaskContext.Consumer>
      </div>
    </div>
  );
}

export default TaskList;
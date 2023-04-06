import { IonCheckbox, IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, } from '@ionic/react';
import { trash } from 'ionicons/icons';
import { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';
import './TaskList.css'

const TaskList: React.FC = () => {
  const { updateTask, deleteTask } = useContext(TaskContext);

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
      });
  };

  const slideToDelete = (taskId: any) => {
    deleteTask(taskId)
      .then(() => { })
      .catch((error: any) => {
        console.log(error);
      });
  };


  return (
    <div>
      <div>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList key={task.taskId}>
                <IonListHeader color="success">
                  <IonLabel id='incomplete' className="ion-margin">
                    Incomplete
                  </IonLabel>
                </IonListHeader>
                {task.map((task: any) => {
                  if (task.completed === false) {
                    return (
                      <IonItemSliding>
                        <IonItem lines="inset">
                          <IonLabel>{task.title}</IonLabel>
                          <IonCheckbox
                            onIonChange={() => taskComplete(task)}
                            slot="end" color="success"
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
                  <IonLabel id='completed' className="ion-margin">
                    Completed
                  </IonLabel>
                </IonListHeader>
                {task.map((task: any) => {
                  if (task.completed === true) {
                    return (
                      <IonItemSliding>
                        <IonItem lines="inset">
                          <IonLabel>{task.title}</IonLabel>
                          <IonCheckbox
                            onIonChange={() => taskIncomplete(task)}
                            checked={true}
                            slot="end" color="success"
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
    </div>
  );
}

export default TaskList;
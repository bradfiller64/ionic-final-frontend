import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import TaskContext from '../contexts/TaskContext';

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
    <div>
      <div>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList key={task.id}>
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
      <div>
        <TaskContext.Consumer>
          {({ task }) => {
            return (
              <IonList key={task.id}>
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
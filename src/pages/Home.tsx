import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonAlert, IonIcon } from "@ionic/react";
import sword from './sword.svg'
import triforce from './triforce.svg'
import { useContext } from "react";
import TaskContext from "../contexts/TaskContext";
import TaskList from "../components/TaskList";
import './Home.css'

const Home: React.FC = () => {
  const [presentAlert] = useIonAlert();
  let { addTask } = useContext(TaskContext);

  const createTask = () => {
    presentAlert({
      header: 'Enter Task',
      buttons: [
        {
          text: 'Add',
          handler: (alertData: { task: any }) => {
            addTask({ title: alertData.task, Completed: false })
              .then(() => { })
              .catch((error: any) => {
                console.log(error);
              });
          },
        },
      ],
      inputs: [
        {
          name: 'task',
          placeholder: 'Task',
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="new" >
          <IonTitle class="ion-text-center">Quest Objectives</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TaskList></TaskList>
        <IonButton onClick={createTask} color="new">
          <IonIcon icon={sword} slot="icon-only" size="large"></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
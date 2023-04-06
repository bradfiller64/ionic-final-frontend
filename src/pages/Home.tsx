import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonAlert } from "@ionic/react";
import { useContext } from "react";
import TaskContext from "../contexts/TaskContext";
import TaskList from "../components/TaskList";

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
            addTask({ Title: alertData.task, Completed: false })
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
        <IonToolbar color="primary">
          <IonTitle>Task List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TaskList></TaskList>
        <IonButton onClick={createTask} expand="block" color="success">
          Add Task
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
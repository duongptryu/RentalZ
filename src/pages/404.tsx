import {
    IonButtons,
    IonContent,
    IonHeader,

    IonPage,
    IonToolbar,

    IonButton,

    IonIcon,
    IonTitle,

  } from "@ionic/react";
  import { useHistory } from "react-router";
  import { arrowBackOutline } from "ionicons/icons";
  
  const NotFound: React.FC = () => {
    let history = useHistory()
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  history.push("/");
                }}
              >
                {" "}
                <IonIcon icon={arrowBackOutline}></IonIcon> Back
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
  
        <IonContent className="ion-padding">
            <h1>404 Not found</h1>
        </IonContent>
      </IonPage>
    );
  };
  
  export default NotFound;
  
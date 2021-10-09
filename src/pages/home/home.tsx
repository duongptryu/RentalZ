import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCard,
  IonCardTitle,
  IonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HouseRental } from "../../model/house";

const Home: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let result = await HouseRental.GetProjects();
    setData(result);
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.length > 0 &&
          data.map((e) => {
            return (
              <IonCard>
                <img src="https://via.placeholder.com/350x150" />
                <IonCardHeader>
                  <IonCardSubtitle>{e["CreatedAt"]}</IonCardSubtitle>
                  <IonCardTitle>{e["PricePerMonth"]}$/ month</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Property Type: {e["PropertyType"]}
                  <br />
                  Bed room: {e["BedRoom"]},
                  <br />
                  Reporter: {e["NameReporter"]}
                </IonCardContent>
              </IonCard>
            );
          })}
        {/* <IonCard>
          <img src="https://via.placeholder.com/350x150"/>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </IonCardContent>
        </IonCard> */}
      </IonContent>
      <IonLoading
        // cssClass='my-custom-class'
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={"Please wait..."}
      />
    </IonPage>
  );
};

export default Home;

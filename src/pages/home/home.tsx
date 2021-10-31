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
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonItem,
  IonImg
} from "@ionic/react";
import { RefresherEventDetail } from '@ionic/core';
import { useEffect, useState } from "react";
import { HouseRental } from "../../model/house";
import { chevronDownCircleOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("")
  const [dataDisplay, setDataDisplay] = useState<any>([])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let result = await HouseRental.GetProjects();
    setData(result);
    setDataDisplay(result)
    setLoading(false);
  };

  async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    await fetchData()
    setSearchText("")
    setLoading(false)
    event.detail.complete();
  }

  const handleSearch = (key: string) => {
    setSearchText(key)
    let tag = ""
    if (key === ""){
      setDataDisplay(data)
    }else {
      var result:[] = []
      data.forEach(e => {
        tag = e["Tag"]
        if (tag.toLowerCase().includes(key.toLowerCase())) {
          result.push(e)
        }
      })
      setDataDisplay(result)
    }
  }

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
      <IonContent className="ion-padding">
        <IonSearchbar placeholder="Search for name, price ..." value={searchText} onIonChange={e => handleSearch(e.detail.value!)}></IonSearchbar>

        {dataDisplay.length > 0 &&
          dataDisplay.map((e: any) => {
            return (
              <IonCard onClick={() => {document.location.href="/detail/" + e["id"]}}>
                <img src={URL.createObjectURL(e["DataBlob"])} width="350" height="150" alt="abc"/>
                <IonCardHeader>
                  <IonCardSubtitle>{e["CreatedAt"]}</IonCardSubtitle>
                  <IonCardTitle>{e["Title"]}</IonCardTitle>
                  <IonNote style={{fontSize:"11px", color:"yellow"}}>{e["PricePerMonth"]}$/ month</IonNote>
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
          {dataDisplay.length < 1 && (
            <h1>No result!</h1>
          )}
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing...">
        </IonRefresherContent>
      </IonRefresher>


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

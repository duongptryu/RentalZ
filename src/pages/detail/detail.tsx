import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonCard,
  IonCardTitle,
  IonLoading,
  IonBackButton,
  IonButton,
  IonList,
  IonIcon,
  IonItem,
  IonBadge,
  IonImg,
  IonNote,
  IonItemDivider,
  IonLabel,
  IonText,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router";
import {
  trash,
  arrowBackOutline,
  createOutline,
  locationOutline,
  cashOutline,
} from "ionicons/icons";
import { HouseRental } from "../../model/house";

const Detail: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  try {
    var id_num = parseInt(id);
  } catch (e) {
    <Redirect to="/" />;
  }
  const [propertyType, setPropertyType] = useState<string>("");
  const [bedRoom, setBedRoom] = useState<string>("");
  const [pricePerMonth, setPricePerMonth] = useState<Number>(0);
  const [furnitures, setFurniture] = useState<string[]>([]);
  const [furnitureStr, setFurnitureStr] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [nameReporter, setNameReporter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [pictureURL, setPictureURL] = useState("")
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchData(id_num);
  }, []);

  const fetchData = async (id: number) => {
    setLoading(true);
    let result = await HouseRental.GetAProject(id);
    if (result === undefined) {
      return <Redirect to="/404"/>
    }
    console.log(result)
    setTitle(result["Title"]);
    setLocation(result["Location"]);
    setPropertyType(result["PropertyType"]);
    setBedRoom(result["BedRoom"]);
    setPricePerMonth(result["PricePerMonth"]);
    setFurniture(result["Furniture"]);
    setFurnitureStr(furnitures.join(","));
    setNameReporter(result["NameReporter"]);
    setNotes(result["Notes"]);
    setTime(result["CreatedAt"]);
    setPictureURL(result["DataBlob"])
    setLoading(false);
  };

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
          <IonTitle>Detail Page</IonTitle>
          <IonButtons slot="end" color="danger">
            <IonIcon
              slot="icon-only"
              icon={createOutline}
              style={{ marginRight: "5px" }}
              onClick={() => {
                history.push("/edit/" + id_num);
              }}
            ></IonIcon>
            <IonIcon
              slot="icon-only"
              icon={trash}
              style={{ color: "#ff1a1a" }}
              onClick={() => {
                setShowAlert(true);
              }}
            ></IonIcon>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem style={{ paddingBottom: "20px" }}>
          {/* <IonImg src={window.URL.createObjectURL(pictureURL)} alt="abc"></IonImg> */}
          <img src={URL.createObjectURL(pictureURL)} alt="abc"/>
          </IonItem>
          <IonItem
            lines="none"
            style={{ marginBottom: "0px", paddingBottom: "0px" }}
          >
            <h5>💥{title}</h5>
          </IonItem>
          <IonItem style={{ marginTop: "0px", paddingTop: "0px" }}>
            <p>
              <IonIcon icon={locationOutline}></IonIcon> {location}
            </p>
          </IonItem>
          <IonItem style={{ marginTop: "0px", paddingTop: "0px" }}>
            <p>
              <IonIcon icon={cashOutline}></IonIcon> {pricePerMonth}$/ Month
            </p>
          </IonItem>
        </IonList>

        <IonList>
          <IonItemDivider>
            <IonLabel>Detail information</IonLabel>
          </IonItemDivider>
          <IonItem>
            <IonLabel>
              Property type: <p>{propertyType}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Bed room: <p>{bedRoom}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Furniture: <p>{furnitureStr}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Notes: <p>{notes}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Name reporter: <p>{nameReporter}</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              Time: <p>{time}</p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

      <IonLoading
        // cssClass='my-custom-class'
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={"Please wait..."}
      />

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={"Confirm!"}
        message={"Are you sure want to delete this project"}
        buttons={[
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: () => {
              setShowAlert(false);
            },
          },
          {
            text: "Yes",
            handler: async () => {
              try {
                await HouseRental.DeleteProject(id_num);
                setErr("Delete successful")
                setShowToast(true)
                setLoading(false)
                history.push("/");
              } catch (e) {
                setErr("Error server, cannot delete, please try again")
                setShowToast(true)
                setLoading(false)
              }
            },
          },
        ]}
      />

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={err}
        position="top"
        color="warning"
        animated={true}
        duration={2000}
      />
    </IonPage>
  );
};

export default Detail;

import {
  IonButtons,
  IonLabel,
  IonContent,
  IonHeader,
  IonItem,
  IonListHeader,
  IonList,
  IonPage,
  IonToolbar,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonLoading,
  IonToast,
  IonIcon,
  IonTitle,
  IonAlert
} from "@ionic/react";
import { useEffect, useState, useRef } from "react";
import { HouseRental } from "../../model/house";
import { useParams, Redirect, useHistory } from "react-router";
import { arrowBackOutline } from "ionicons/icons";

const Edit: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const history = useHistory();
  var inputRef = useRef<HTMLInputElement>(null);
  try {
    var id_num = parseInt(id);
  } catch (e) {
    <Redirect to="/" />;
  }

  const [propertyType, setPropertyType] = useState<string>("");
  const [bedRoom, setBedRoom] = useState<string>("");
  const [pricePerMonth, setPricePerMonth] = useState<number>();
  const [furnitures, setFurniture] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [nameReporter, setNameReporter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState<string>("");
  const [pictureURL, setPictureURL] = useState("")
  const [showToast, setShowToast] = useState(false);
  const [err, setErr] = useState("");
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState("")

  useEffect(() => {
    fetchData(id_num);
  }, []);

  const fetchData = async (id: number) => {
    setLoading(true);
    let result = await HouseRental.GetAProject(id);
    if (result === undefined) {
      setLoading(false)
      return history.push("/404")
    }
    setTitle(result["Title"]);
    setLocation(result["Location"]);
    setPropertyType(result["PropertyType"]);
    setBedRoom(result["BedRoom"]);
    setPricePerMonth(Number(result["PricePerMonth"]));
    setFurniture(result["Furniture"]);
    setNameReporter(result["NameReporter"]);
    setNotes(result["Notes"]);
    setTime(result["CreatedAt"]);
    setPictureURL(result["DataBlob"])
    setLoading(false);
  };

  const handelCancel = () => {
    setLoading(true);
    setTimeout(() => {
      setPropertyType("");
      setBedRoom("");
      setPricePerMonth(0);
      setFurniture([]);
      setNotes("");
      setNameReporter("");
      setTitle("");
      setLocation("");
      setLoading(false);
    }, 500);
  };

  const handleEdit = async () => {
    setLoading(true);
    if (propertyType === "") {
      setErr("Property type field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    } else if (bedRoom === "") {
      setErr("Bed room field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    } else if (Number(pricePerMonth) < 0 || isNaN(Number(pricePerMonth))) {
      setErr("Price cannot be empty and must be biger than or equal 0");
      setShowToast(true);
      setLoading(false);
      return false;
    } else if (nameReporter === "") {
      setErr("Name reporter field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    } else if (title === "") {
      setErr("Title field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    } else if (location === "") {
      setErr("Location field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    }
    const tagArray = [
      ...furnitures,
      propertyType,
      bedRoom,
      String(pricePerMonth),
      nameReporter,
      notes,
      title,
      location,
    ];

    const response = await fetch(pictureURL);
    const blob = await response.blob();

    const tag = tagArray.join(",");
    try {
      let newHouseRental = new HouseRental(
        propertyType,
        bedRoom,
        Number(pricePerMonth),
        furnitures,
        notes,
        nameReporter,
        tag,
        location,
        title,
        blob
      );
      await newHouseRental.Update(id_num);
    } catch (e) {
      setErr(String(e));
      setShowToast(true);
      setLoading(false);
      return;
    }
    await setTimeout(() => {
      // setPropertyType("");
      // setBedRoom("");
      // setPricePerMonth(0);
      // setFurniture([]);
      // setNotes("");
      // setNameReporter("");
      // setTitle("")
      // setLocation("")
      setErr("Update project rental success");
      setShowToast(true);
      setLoading(false);
      return (document.location.href = "/detail/" + id_num);
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                history.push("/detail/" + id_num);
              }}
            >
              {" "}
              <IonIcon icon={arrowBackOutline}></IonIcon> Back
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonListHeader lines="none">
            <IonLabel
              style={{ textAlign: "center", marginTop: "0px" }}
              color="primary"
            >
              {" "}
              🎀𝓡𝓮𝓷𝓽𝓪𝓵𝓩🎀{" "}
            </IonLabel>
          </IonListHeader>
          <IonItem lines="none">
            <IonLabel
              style={{ textAlign: "center", marginTop: "0px" }}
              color="tertiary"
            >
              Edit Project RentalZ
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel position="floating">
              Title <span style={{ color: "red" }}>*</span>
            </IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => {
                setTitle(e.detail.value!);
              }}
              placeholder="Ex: Selling cheap apartment"
              required
            ></IonInput>
          </IonItem>

          <IonItem style={{ marginTop: "15px" }}>
            <IonLabel position="floating">
              Property type <span style={{ color: "red" }}>*</span>
            </IonLabel>
            <IonInput
              value={propertyType}
              onIonChange={(e) => {
                setPropertyType(e.detail.value!);
              }}
              placeholder="Ex: House, Bungalow"
              required
            ></IonInput>
          </IonItem>
          <IonItem style={{ marginTop: "26px" }}>
            <IonLabel>
              Bedrooms <span style={{ color: "red" }}>*</span>
            </IonLabel>
            <IonSelect
              placeholder="Select One"
              onIonChange={(e) => {
                setBedRoom(e.detail.value!);
              }}
              value={bedRoom}
            >
              <IonSelectOption value="0">Studio</IonSelectOption>
              <IonSelectOption value="1">1 Bed room</IonSelectOption>
              <IonSelectOption value="2">2 Bed rooms</IonSelectOption>
              <IonSelectOption value="3">3 Bed rooms</IonSelectOption>
              <IonSelectOption value="4">Other</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem style={{ marginTop: "26px" }}>
            <IonLabel position="stacked">
              Price per month ($)<span style={{ color: "red" }}>*</span>
            </IonLabel>
            <IonInput
              type="number"
              value={pricePerMonth}
              onIonChange={(e) => {
                setPricePerMonth(parseInt(e.detail.value!));
              }}
              placeholder="Ex: 1000, 2000"
              required
            ></IonInput>
          </IonItem>

          <IonItem style={{ marginTop: "30px" }}>
            <IonLabel>Furniture types</IonLabel>
            <IonSelect
              interface="popover"
              multiple={true}
              placeholder="Select Multiple"
              value={furnitures}
              onIonChange={(e) => {
                setFurniture(e.detail.value);
              }}
            >
              <IonSelectOption value="Furnished">Furnished</IonSelectOption>
              <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
              <IonSelectOption value="Part Furnished ">
                Part Furnished{" "}
              </IonSelectOption>
              <IonSelectOption value="other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem style={{ marginTop: "30px" }}>
            <IonLabel position="stacked">Note</IonLabel>
            <IonTextarea
              value={notes}
              onIonChange={(e) => {
                setNotes(e.detail.value!);
              }}
            ></IonTextarea>
          </IonItem>

          <IonItem style={{ marginTop: "20px" }}>
            <IonLabel position="floating">
              Name of reporter<span style={{ color: "red" }}>*</span>
            </IonLabel>
            <IonInput
              placeholder="Edison"
              required
              value={nameReporter}
              onIonChange={(e) => {
                setNameReporter(e.detail.value!);
              }}
            ></IonInput>
          </IonItem>

          <IonItem style={{ marginTop: "20px" }}>
            <IonLabel position="floating">
              Location <span style={{ color: "red" }}>*</span>
            </IonLabel>
            <IonInput
              value={location}
              onIonChange={(e) => {
                setLocation(e.detail.value!);
              }}
              placeholder="Ex: 3 - Dien Bien Phu street"
              required
            ></IonInput>
          </IonItem>

          <IonItem>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (event.target.files && event.target.files.length > 0) {
                  //alert('you selected: '+ event.target.files[0].name)
                  const url = URL.createObjectURL(event.target.files[0]);
                  setPictureURL(url);
                  console.log(url);
                }
              }}
            ></input>
            {pictureURL.length !== 0 && (
                      <img src={URL.createObjectURL(pictureURL)} alt="abc" width="120"
                      height="100"/>
          )}
          {
            pictureURL.length === 0 && (
              <img src="https://via.placeholder.com/350x150" alt="abc" width="120"
              height="100"/>
            )
          }
          </IonItem>


        </IonList>

        <div style={{ marginTop: "20px", marginLeft: "25%" }}>
          <IonButton onClick={() => {setShowAlert(true)}}>Submit</IonButton>
          <IonButton onClick={() => {history.push("/detail/" + id_num)}}>Cancel</IonButton>
        </div>
      </IonContent>
      <IonLoading
        // cssClass='my-custom-class'
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={"Please wait..."}
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

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        cssClass="my-custom-class"
        header={"Confirm!"}
        message={"Are you sure want to change"}
        buttons={[
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              setShowAlert(false)
            },
          },
          {
            text: "Yes",
            handler: () => {
              handleEdit()
            },
          },
        ]}
      />
    </IonPage>
  );
};

export default Edit;

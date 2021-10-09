import {
  IonButtons,
  IonLabel,
  IonContent,
  IonHeader,
  IonItem,
  IonListHeader,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { prototype } from "events";
import { useState } from "react";
import { HouseRental } from "../../model/house";
import "./add.css";

const Add: React.FC = () => {
  const [propertyType, setPropertyType] = useState<string>("");
  const [bedRoom, setBedRoom] = useState<string>("");
  const [pricePerMonth, setPricePerMonth] = useState<number>(0);
  const [furnitures, setFurniture] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [nameReporter, setNameReporter] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [err, setErr] = useState("");

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => {
      setPropertyType("");
      setBedRoom("");
      setPricePerMonth(0);
      setFurniture([]);
      setNotes("");
      setNameReporter("");
      setLoading(false);
    }, 500);
  };

  const handleAdd = async () => {
    setLoading(true);
    if (propertyType === "") {
      setErr("Property type field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false
    } else if (bedRoom === "") {
      setErr("Bed room field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false
    } else if (pricePerMonth < 0 || isNaN(pricePerMonth)) {
      setErr("Price cannot be empty and must be biger than or equal 0");
      setShowToast(true);
      setLoading(false);
      return false
    } else if (nameReporter === "") {
      setErr("Name reporter field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false
    }
    const tagArray =  [...furnitures, propertyType, bedRoom, String(pricePerMonth), nameReporter, notes]
    const tag = tagArray.join(",")
    try{
        let newHouseRental = new HouseRental(propertyType, bedRoom, pricePerMonth, furnitures, notes, nameReporter, tag)
        await newHouseRental.Add()
    }catch(e) {
        setErr(String(e))
        setShowToast(true)
        setLoading(false)
        return
    }
    await setTimeout(() => {
      setPropertyType("");
      setBedRoom("");
      setPricePerMonth(0);
      setFurniture([]);
      setNotes("");
      setNameReporter("");
      setErr("Add project rental success")
      setShowToast(true)
      setLoading(false)
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add Rental House</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
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
              Add New House For Rental
            </IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
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
        </IonList>

        <IonItem>
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
        <div style={{ marginTop: "20px", marginLeft: "30%" }}>
          <IonButton onClick={handleAdd}>Add</IonButton>
          <IonButton onClick={handleReset}>Reset</IonButton>
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
    </IonPage>
  );
};

export default Add;

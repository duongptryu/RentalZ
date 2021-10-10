import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonButton,
  IonList,
  IonIcon,
  IonItem,
  IonNote,
  IonItemDivider,
  IonLabel,
  IonText,
  IonAlert,
  IonToast,
  IonInput,
  IonTextarea,
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

export interface Comment {
  FullName: string;
  Comment: string;
  Time: string;
}

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
  const [pictureURL, setPictureURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [fullName, setFullName] = useState("");
  const [review, setReview] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchData(id_num);
  }, []);

  const fetchData = async (id: number) => {
    setLoading(true);
    try{
      var result = await HouseRental.GetAProject(id);
    }catch(e) {
      history.push("/404")
    }
    if (result === undefined) {
      setLoading(false)
      return history.push("/404")
    }
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
    setPictureURL(result["DataBlob"]);
    setComments(result["Comments"]);
    setLoading(false);
  };

  const handleSubmitReview = async () => {
    setLoading(true);
    if (fullName === "") {
      setErr("Full name field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    } else if (review === "") {
      setErr("Comment field field cannot be empty");
      setShowToast(true);
      setLoading(false);
      return false;
    }
    let obj: any = {
      full_name: fullName,
      comment: review,
      time: new Date().toLocaleString("vi-VN"),
    };
    let list_comment = [...comments];
    list_comment.push(obj);
    try {
      let result = await HouseRental.AddComment(id_num, list_comment);
      console.log(result);
      setErr("Add comment success!");
      setShowToast(true);
      setLoading(false);
      setComments(list_comment);
      fetchData(id_num);
      setFullName("");
      setReview("");
    } catch (e) {
      setErr("Error server, please try again!");
      setShowToast(true);
      setLoading(false);
    }
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
            {pictureURL.length !== 0 && (
              <img src={URL.createObjectURL(pictureURL)} alt="abc" />
            )}
            {pictureURL.length === 0 && (
              <img src="https://via.placeholder.com/350x150" alt="abc" />
            )}
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
          <IonItemDivider color="secondary">
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
        <br />
        <br />

        {/* List review */}
        <IonList>
          <IonItemDivider color="primary">
            <IonLabel>Reviews/ Question</IonLabel>
          </IonItemDivider>

          <IonList>
            {comments.length === 0 && <h1>No comment/ review</h1>}
            {comments.length > 0 &&
              comments.map((e: any) => {
                return (
                  <IonList>
                    <IonItem lines="none">
                      <IonLabel color="primary">
                        {e["full_name"]} <p>{e["time"]}</p>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel class="ion-text-wrap">
                        <p>{e["comment"]}</p>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                );
              })}
          </IonList>
        </IonList>

        {/* add review/ question */}
        <IonList>
          <IonItemDivider color="danger">
            <IonLabel>Write reviews/ Question</IonLabel>
          </IonItemDivider>

          <IonList>
            <IonItem>
              <IonLabel position="floating">
                Full name <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonInput
                value={fullName}
                onIonChange={(e) => {
                  setFullName(e.detail.value!);
                }}
                placeholder="Alex"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">
                Comment <span style={{ color: "red" }}>*</span>
              </IonLabel>
              <IonTextarea
                value={review}
                onIonChange={(e) => {
                  setReview(e.detail.value!);
                }}
              ></IonTextarea>
            </IonItem>
            <IonButton
              style={{ marginLeft: "35%", marginTop: "20px" }}
              color="danger"
              onClick={handleSubmitReview}
            >
              Submit
            </IonButton>
          </IonList>
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
                setErr("Delete successful");
                setShowToast(true);
                setLoading(false);
                history.push("/");
              } catch (e) {
                setErr("Error server, cannot delete, please try again");
                setShowToast(true);
                setLoading(false);
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

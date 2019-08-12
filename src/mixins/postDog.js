import firebase from "../config/firebase";
import router from "../router";

export default (url, comment, author) => {
    let currentDate = new Date();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log(firebase.db);

    firebase.collection("dogs").add({
        url,
        comment,
        info: `Posted by ${author != '' ? author : 'Unknown' } on ${days[currentDate.getDay()]}`,
        created_at: new Date().getTime()
    })
    .then(
        router.go(-1)
    );
};
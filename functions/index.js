const functions = require('firebase-functions');
const admin = require("firebase-admin");
const axios = require("axios");
let cors = require('cors') ({origin:true});
const serverKey = require("./serverKey");

admin.initializeApp(functions.config().firebase);
let firestore = admin.firestore();

exports.GeneralSubscription = functions.https.onRequest((request, response) => {
    console.log('token', request.body.token);

    cors(request, response, () => {
        axios.post(`https://iid.googleapis.com/iid/v1/${request.body.token}/rel/topics/general`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `key=${serverKey}`
            }
        })
        .then((res) => {
            firestore.collection("tokens").add({
                token: request.body.request
            }).then(ref => {
                console.log("Document added ID: ", ref.id);
                response.status(200).send(`notifications subscription successful`);
            });
        })
        .catch((err) => {
            console.log(err);
            console.log(err.response);
            response.status(500).send({
                message: "Whooops! there was an error",
                error: error.response
            });
        });
    });

});

//https://us-central1-simple-pwa-app.cloudfunctions.net/GeneralSubscription

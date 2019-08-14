<template>
  <q-page padding>
    <Camera />

    <div class="q-pa-md q-gutter-sm addButton">
      <q-btn
        push
        color="primary"
        icon="home"
        @click="getMessagingToken"
      />
      <q-btn push color="primary" icon="add_circle_outline" @click="$router.push({name: 'post'})" />
      <q-btn
        push
        color="primary"
        icon="camera_alt"
        @click="$store.dispatch('setCamereModalValue')"
        disabled
      />
    </div>

    <div class="row">
      <div
        class
        style="padding:5px"
        v-for="(dog, index) in dogs"
        :key="dog.id"
        @click="$router.push({name: 'details', params:{ id:dog.id, dogProp:dogs[index] }})"
      >
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon name="pets" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{dog.comment}}</q-item-label>
              <q-item-label caption>{{dog.info}}</q-item-label>
            </q-item-section>
          </q-item>
          <img :src="dog.url" height="270" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="stylus" scoped>
.addButton {
  display: flex;
  justify-content: flex-end;
}
</style>

<script>
import {
  Quasar,
  QCard,
  QItem,
  QItemSection,
  QAvatar,
  QItemLabel,
  QPage
} from "quasar";
import firebase from "../config/firebase";
import Camera from "../views/dogs/Camera";
import store from "../store";
import axios from "axios";
const { messaging } = firebase;
let cors = require("cors") ({origin:true});
export default {
  name: "PageHome",
  components: {
    Quasar,
    QCard,
    QItem,
    QItemSection,
    QAvatar,
    QItemLabel,
    QPage,
    Camera
  },
  data() {
    return {
      dogs: []
    };
  },
  computed: {
    displayCameraModal() {
      return store.getters.displayCameraModal;
    }
  },
  mounted() {
    this.listenTokenRefresh();
    let dogsRef = firebase.db.collection("dogs").orderBy("created_at", "asc");
    dogsRef.get().then(snapshot => {
      snapshot.forEach(dog => {
        this.dogs.push({
          id: dog.id,
          url: dog.data().url,
          comment: dog.data().comment,
          info: dog.data().info
        });
      });
    });
  },
  methods: {
    getMessagingToken() {
      messaging
        .getToken()
        .then(async token => {
          if (token) {
            const currentMessageToken = window.localStorage.getItem(
              "messagingToken"
            );
            console.log("token will be updated", currentMessageToken != token);
            if (currentMessageToken != token) {
              await this.saveToken(token);
            }
          } else {
            console.log(
              "No Instance ID token available. Request permission to generate one."
            );
            this.notificationsPermisionRequest();
          }
        })
        .catch(function(err) {
          console.log("An error occurred while retrieving token. ", err);
        });
    },
    notificationsPermisionRequest() {
      messaging
        .requestPermission()
        .then(() => {
          this.getMessagingToken();
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },
    listenTokenRefresh() {
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      console.log("currentMessageToken", currentMessageToken);
      if (!!currentMessageToken) {
        messaging.onTokenRefresh(function() {
          messaging
            .getToken()
            .then(function(token) {
              this.saveToken(token);
            })
            .catch(function(err) {
              console.log("Unable to retrieve refreshed token ", err);
            });
        });
      }
    },
    saveToken(token) {
      console.log("tokens", token);
      axios
        .post(
          `https://us-central1-simple-pwa-app.cloudfunctions.net/GeneralSubscription`,
          { token }
        )
        .then(response => {
          window.localStorage.setItem("messagingToken", token);
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

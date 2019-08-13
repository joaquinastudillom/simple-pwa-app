<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="basic">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Doggy PWA
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import firebase from "../config/firebase";
import axios from "axios";

const { messaging } = firebase;

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  mounted(){
    this.listenTokenRefresh();
  },
  methods: {
    getMessagingToken(){
      messaging.getToken().then(async (token) => {
        if(token){
          const currentMessageToken = window.localStorage.getItem("messagingToken");
          console.log("token will be updated", currentMessageToken != token);

          if(currentMessageToken != token){
            await this.saveToken(token);
          }
        }else{
          console.log("No instance ID token available. Request permission to generate one");
          this.notificationsPermissionRequest();
        }
      })
      .catch((err) => {
        console.log("Unable to get permission while retrieving token. ", err);
      });
    },
    notificationsPermissionRequest(){
      messaging.requestPermission()
      .then(() => {
        this.getMessagingToken();
      })
      .catch((err) => {
        console.log("Unable to get permission to notify. " ,err);
      });
    },
    listenTokenRefresh(){
      const currentMessageToken = window.localStorage.getItem("messagingToken");
      console.log("currentMessageToken", currentMessageToken);
      if(!!currentMessageToken){
        messaging.onTokenRefresh(() => {
          messaging.getToken().then(token => {
            this.saveToken(token);
          })
          .catch(err => {
            console.log("Unable to retrieve refresh token ", err);
          });
        });
      }
    },
    saveToken(){
      console.log("tokens", token);
      axios.post(`https://us-central1-cropchien.cloudfunctions.net/GeneralSubscription`, {token})
      .then(response => {
        window.localStorage.setItem("messagingToken", token);
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

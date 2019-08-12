<template>
  <q-page padding>

    <Camera />

    <div class="q-pa-md q-gutter-sm addButton">
      <q-btn push color="primary" icon="camera" @click="$store.dispatch('setCamereModalValue')"  />
      <q-btn push color="primary" icon="add_circle_outline" @click="$router.push({name: 'post'})" />
    </div>

    <div class="row">
      <div class="col-6" style="padding:5px" v-for="(dog, index) in dogs" :key="dog.id" @click="$router.push({name: 'details', params:{ id:dog.id, dogProp:dogs[index] }})">
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
    displayCameraModal(){
      return store.getters.displayCameraModal;
    }
  },
  mounted(){
    let dogsRef = firebase.collection("dogs").orderBy("created_at");
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
  }
};
</script>

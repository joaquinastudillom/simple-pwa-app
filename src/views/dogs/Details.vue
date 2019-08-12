<template>
  <q-page padding>
    <q-card class="my-card">
      <img :src="dog.url" />

      <q-list>
        <q-item v-if="dog.comment">
          <q-item-section avatar>
            <q-icon color="red" name="title" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ dog.comment }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="dog.info">
          <q-item-section avatar>
            <q-icon color="primary" name="description" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ dog.info }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import firebase from "../../config/firebase";
import { Quasar, QCard, QCardSection, QImg, QList } from "quasar";
export default {
  name: "DetailsPage",
  components: {
    Quasar,
    QCard,
    QCardSection,
    QImg,
    QList
  },
  props: {
    dogProp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dog: {}
    };
  },
  mounted() {
    if (!!this.dogProp) {
      this.dog = this.dogProp;
    } else {
      const id = this.$route.params.id;
      firebase
        .doc(`dogs/${id}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.dog = doc.data();
          } else {
            console.log("no document found");
          }
        })
        .catch(err => {
          console.log("error getting document", err);
        });
    }
  }
};
</script>

<template>
  <q-page padding>
    <q-card class>
      <div class="q-pa-md q-gutter-sm" id="card-header">
        <q-chip icon="plus_one" color="teal" text-color="white">Add a New Dog</q-chip>
        <q-btn push color="primary" round icon="refresh" @click="refreshImage" />
      </div>

      <q-card class="my-card" v-if="this.dogUrl !== null">
        <q-img :src="dogUrl" spinner-color="white" />
      </q-card>
      <q-img
        src="https://cdn.quasar.dev/img/non-existent-image-src.png"
        style="height: 140px"
        v-else
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">Cannot load image</div>
        </template>
      </q-img>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input filled label="Name" v-model="author" hint="Your name" />

          <q-input filled label="Title" v-model="title" hint="Dog's title"/>

          <div>
            <q-btn label="POST A DOG" icon-right="pets" type="submit" color="primary" @click="post" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import {
  Quasar,
  QForm,
  QInput,
  QCard,
  QCardSection,
  QImg,
  QChip
} from "quasar";
import axios from "axios";
import postDog from "../../mixins/postDog";
import updateDogPicture from "../../mixins/updateDogPicture";
export default {
  name: "PostPage",
  components: {
    Quasar,
    QForm,
    QInput,
    QCard,
    QCardSection,
    QImg,
    QChip
  },
  props: {
    pictureUrl: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      dogUrl: null,
      title: "",
      author: ""
    };
  },
  mounted() {
    if(this.pictureUrl !== ""){
        this.dogUrl = this.pictureUrl;
    }else{
      updateDogPicture("https://dog.ceo/api/breed/appenzeller/images/random")
      .then(data => {
        if (data.status) {
          this.dogUrl = data.message;
        }
      })
      .catch(err => {
        this.dogUrl = null;
      });
    }
  },
  methods: {
    post() {
      postDog(this.dogUrl, this.title, this.author);
    },
    refreshImage() {
      updateDogPicture("https://dog.ceo/api/breed/appenzeller/images/random")
        .then(data => {
          if (data.status) {
            this.dogUrl = data.message;
          }
        })
        .catch(err => {
          this.dogUrl = null;
        });
    }
  }
};
</script>

<style scoped>
#card-header {
  display: flex;
  justify-content: space-between;
}
</style>
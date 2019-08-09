<template>
  <q-page padding>
    <q-card class>
      <div class="q-pa-md q-gutter-sm">
        <div class="text-h4">Insert a new Dog</div>
      </div>

      <q-card class="my-card">
        <q-img :src="dogUrl" spinner-color="white" />
      </q-card>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input filled label="Your name *" hint="Name and surname" />

          <q-input filled type="number" label="Your age *" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Quasar, QForm, QInput, QCard, QCardSection, QImg } from "quasar";
import axios from "axios";
export default {
  name: "PostPage",
  components: {
    Quasar,
    QForm,
    QInput,
    QCard,
    QCardSection,
    QImg
  },
  data() {
    return {
      dogUrl: null,
      title: "",
      author: ""
    };
  },
  mounted() {
    axios
      .get("https://dog.ceo/api/breed/appenzeller/images/random")
      .then(response => {
        if (response.data.status) {
          this.dogUrl = response.data.message;
        } else {
          console.log("error");
        }
      });
  }
};
</script>
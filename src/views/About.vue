<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <p>
          Simple App created to understand how to create and build a Progressive Web Application
          with Vue using Firestore from Google.
        </p>
        <p>
          Developed by <b>Joaquin</b>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Quasar, QCard, QCardSection } from "quasar";
export default {
  name: "PageAbout",
  components: {
    Quasar,
    QCard,
    QCardSection
  }
};
</script>

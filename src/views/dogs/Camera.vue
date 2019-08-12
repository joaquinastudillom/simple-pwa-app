<template>
  <q-dialog v-model="display">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="$store.dispatch('setCamereModalValue')"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { Quasar, QDialog, ClosePopup, QCard, QCardSection, QCardActions } from "quasar";
import store from "../../store";
export default {
  name: "DetailsPage",
  components: {
    Quasar,
    QDialog,
    QCard,
    QCardSection,
    QCardActions
  },
  directives: {
    ClosePopup
  },
  data() {
    return {
    };
  },
  computed: {
      display: {
          get(){
              return store.getters.displayCameraModal;
          },
          set(value){
             
          }
      }
  }
};
</script>

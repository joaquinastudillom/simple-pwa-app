<template>
  <q-dialog v-model="display">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">IN DEVELOPMENT</div>
        <q-space />
        <q-btn
          icon="close"
          @click="$store.dispatch('setCamereModalValue')"
          flat
          round
          dense
          v-close-popup
        />
      </q-card-section>

      <q-card-section>
        <video ref="video" id="video" width="100%" height="100%" autoplay></video>
      </q-card-section>

      <q-card-section style="display: flex;justify-content: center;">
        <q-btn push color="primary" round icon="camera" size="lg" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  Quasar,
  QDialog,
  ClosePopup,
  QCard,
  QCardSection,
  QCardActions,
  QSpace,
  QVideo
} from "quasar";
import store from "../../store";
import firebase from "../../config/firebase";
import postDog from "../../mixins/postDog";
export default {
  name: "DetailsPage",
  components: {
    Quasar,
    QDialog,
    QCard,
    QCardSection,
    QCardActions,
    QSpace,
    QVideo
  },
  directives: {
    ClosePopup
  },
  data() {
    return {
      mediaStream: null,
    };
  },
  mounted() {
    /*if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
        })
        .catch(error => console.error("getUserMedia() error:", error));
    } else if (navigator.getUserMedia) {
      // Standard
      navigator.getUserMedia(
        { video: true },
        function(mediaStream) {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
        },
        errBack
      );
    } else if (navigator.webkitGetUserMedia) {
      // WebKit-prefixed
      navigator.webkitGetUserMedia(
        { video: true },
        function(mediaStream) {
          this.mediaStream = mediaStream;
          console.log(mediaStream);
          this.$refs.video.srcObject = window.webkitURL.createObjectURL(mediaStream);
          this.$refs.video.play();
        },
        errBack
      );
    } else if (navigator.mozGetUserMedia) {
      // Mozilla-prefixed
      navigator.mozGetUserMedia(
        { video: true },
        function(mediaStream) {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = window.URL.createObjectURL(mediaStream);
          this.$refs.video.play();
        },
        errBack
      );
    }*/
  },
  computed: {
    display: {
      get() {
        return store.getters.displayCameraModal;
      },
      set(value) {}
    }
  },
  methods: {
    /*
    capture() {
      const vm = this;
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      return imageCapture.takePhoto().then(blob => {
        firebase.storage
          .ref()
          .child(`images/picture-${new Date().getTime()}`)
          .put(blob)
          .then(res => {
            res.ref.getDownloadURL().then(pictureUrl => {
              console.log("File available at", pictureUrl);
              this.$router.push({
                name: "post",
                params: { pictureUrl }
              });
            });
          })
          .catch(err => {
            console.log(err);
            this.$router.go(-1);
          });
      });
    }*/
  },
  destroyed() {
    //const tracks = this.mediaStream.getTracks();
    //tracks.map(track => track.stop());
  }
};
</script>

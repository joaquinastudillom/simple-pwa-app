<template>
  <q-page padding>
    <div class="row">
      <div class="col-6" style="padding:5px" v-for="dog in dogs" :key="dog.id">
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
.my-card {
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
export default {
  name: "PageHome",
  components: {
    Quasar,
    QCard,
    QItem,
    QItemSection,
    QAvatar,
    QItemLabel,
    QPage
  },
  data(){
    return {
      dogs:[
                {
                    'id': 0,
                    'url': 'https://images.dog.ceo/breeds/germanshepherd/n02106662_13904.jpg',
                    'comment': 'Dog resting',
                    'info': 'Posted by Eder on Friday'
                },
                {
                    'id': 1,
                    'url': 'https://images.dog.ceo/breeds/setter-gordon/n02101006_4491.jpg',
                    'comment': 'Tongue dog',
                    'info': 'Posted by Naye on Tuesday'
                },
                {
                    'id': 2,
                    'url': 'https://images.dog.ceo/breeds/terrier-australian/n02096294_1429.jpg',
                    'comment': 'Terrier Australian dog',
                    'info': 'Posted by Eder on Monday'
                },
                {
                    'id': 3,
                    'url': 'https://images.dog.ceo/breeds/mexicanhairless/n02113978_1595.jpg',
                    'comment': 'Mexico Xoloitzcuintle',
                    'info': 'Posted by Naye on Monday'
                },
                {
                    'id': 4,
                    'url': 'https://images.dog.ceo/breeds/dachshund/dog-495133_640.jpg',
                    'comment': 'Sad dog',
                    'info': 'Posted by Eder on Monday'
                }
            ]
    }
  }
};
</script>

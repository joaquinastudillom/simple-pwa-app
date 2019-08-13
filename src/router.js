import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from './layouts/Default.vue'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Post from "./views/dogs/Post.vue"
import Details from "./views/dogs/Details.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: "/details/:id",
          name: "details",
          props: true,
          component: Details
        },
        {
          path: "/post",
          name: "post",
          props: true,
          component: Post
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    }
  ]
})

import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: require('../components/HelloWorld.vue').default
    }
  ]
})
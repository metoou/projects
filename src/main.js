import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

const firebaseConfig = {
  apiKey: "AIzaSyDwbVwRAOPFE5bU7onhLa2Ob2nRKVjiVdg",
  authDomain: "vue-table-auth.firebaseapp.com",
  projectId: "vue-table-auth",
  storageBucket: "vue-table-auth.appspot.com",
  messagingSenderId: "969935740101",
  appId: "1:969935740101:web:045cda7519e87acb2f24ac"
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

 app = new Vue({
   router,
   store,
   render: h => h(App)
 }).$mount("#app");

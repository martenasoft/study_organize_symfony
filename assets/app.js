/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)

import './css/bootstrap.min.css';
import './font-awesome/4.5.0/css/font-awesome.min.css';
import './css/fonts.googleapis.com.css';
import './css/ace.min.css';
import './css/ace-skins.min.css';
import './css/ace-rtl.min.css';
import './css/jquery-ui.custom.min.css';
import './css/fullcalendar.min.css';

import './js/bootstrap.min';
import './js/jquery-ui.custom.min';
import './js/jquery.ui.touch-punch.min';
//import './js/moment.min.js;

import './js/bootbox';
import './js/jquery.easypiechart.min.js';
import './js/jquery.sparkline.index.min.js';
import './js/jquery.flot.min.js';
import './js/jquery.flot.pie.min.js';
import './js/jquery.flot.resize.min.js';
import './js/ace-elements.min.js';
import './js/ace.min.js';

import './bootstrap';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
import VueResource from 'vue-resource';
import Vuex from "vuex";

import App from './src/App';
import Login from "./src/components/Login";
import Calendar from "./src/components/Calendar";


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

const routes = [
    {
        name: 'Login',
        path: '/user-login',
        component: Login,
        meta: { bodyClass: 'login-layout' }
    },
    {
        name: 'FullCalendar',
        path: '/calendar',
        component: Calendar
    }
];

const router = new VueRouter({
    routes
});

const vueBodyClass = new VueBodyClass(routes);
router.beforeEach((to, from, next) => { vueBodyClass.guard(to, next) });

const store = new Vuex.Store({
    state: {
        user: null
    },

    mutations: {
        getUser () {
            state.user = {id: 2, username: 'Vuex'}
        }
    }
});


new Vue({
    router,
    store,
    render: h =>h(App)
}).$mount('#app');

/*
const apiUrl = 'https://study-organize-api.com.wip';

var signupBox = new Vue({
    el: '#signup-box',

    data: {
        email: 'test33@user.com',
        password: '123123',
        confirmPassword: '123123',
        isVisible: false,
        visible: '',
    },

    methods: {

        submitForm: function () {
            axios.post(apiUrl+'/register', {
                email: this.email,
                password: this.password,
                plainPassword: this.confirmPassword
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error)
            })
        }
    }

});

var loginBox = new Vue({
    el: '#login-box',
    methods: {
        showRegisterForm: function () {
            this.isVisible = !this.isVisible;
            if (this.isVisible) {

                this.visible = 'visible'
            } else {
                signupBox.visible = 'visible';
                this.visible = ''
            }
        }
    },
    data: {
        isVisible: true,
        visible: 'visible',
        loginForm: {
            username : 'test11@user.com'
        }
    }
})*/
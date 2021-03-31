/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)




/*
import './css/bootstrap.min.css';
import './font-awesome/4.5.0/css/font-awesome.min.css';
import './css/fonts.googleapis.com.css';
import './css/ace.min.css';
import './css/ace-skins.min.css';
import './css/ace-rtl.min.css';

import './styles/app.css';

import Vue from 'vue';
import axios from "axios";

const $ = require('jquery');
// start the Stimulus application

import './js/bootstrap.min.js';
import './js/jquery-ui.custom.min.js';
import './js/jquery.ui.touch-punch.min.js';
import './js/jquery.easypiechart.min.js';
import './js/jquery.sparkline.index.min.js';
import './js/jquery.flot.min.js';
import './js/jquery.flot.pie.min.js';
import './js/jquery.flot.resize.min.js';
import './js/ace-elements.min.js';
import './js/ace.min.js';
*/

import './css/bootstrap.min.css';
import './font-awesome/4.5.0/css/font-awesome.min.css';
import './css/fonts.googleapis.com.css';
import './css/ace.min.css';
import './css/ace-skins.min.css';
import './css/ace-rtl.min.css';

import './bootstrap';

import Login from "./src/components/Login";
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './src/App';


Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
    {path: '/user-login', component: Login}
];

const router = new VueRouter({
    routes
});

new Vue({
    router,
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
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

import './bootstrap';


import './vue/user.login';


var signupBox = new Vue({
    el: '#signup-box',
    data: {
        visible: true
    }
});

var loginBox = new Vue({
    el: '#login-box',
    methods: {
        submitForm: function () {
            console.log(this.$data.loginForm);
       //     axios.post('http://127.0.0.1:88002', {'usernamr':'1212'})
        },
        showRegisterForm: function () {
            this.
            alert(23);
        }
    },
    data: {
        loginForm: {
            username : 'test11@user.com'
        }

    }
})
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueBodyClass from 'vue-body-class';
import Login from "../components/Login";
import Timeline from "../components/Timeline";
import Calendar from "../components/Calendar";
import store from "./../store";

Vue.use(VueRouter);

const routes = [
    {
        name: 'Login',
        path: '/user-login',
        component: Login,
        meta: { bodyClass: 'login-layout' }
    },
    {
        name: 'Timeline',
        path: '/timeline',
        component: Timeline
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
router.beforeEach((to, from, next) => {
    vueBodyClass.guard(to, next);
    const user = store.getters.user;

    if (user === null) {
        next({name: 'Login'})
    }
});

export default router;

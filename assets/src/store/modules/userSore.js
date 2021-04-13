import config from './../../config'

export default {
    actions: {
        async userLogin ({commit,state}) {

         //   console.log(state.loginData);

           const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" ,
                    "Origin": "https://study-theme-symfony.wip",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "Content-Type,API-Key"
                //    "Access-Control-Allow-Origin" : "https://study-theme-symfony.wip"
                },
                body: JSON.stringify({
                    username: state.loginData.username,
                    password: state.loginData.password
                })
            };

           try {
               const response = await fetch(config.baseUrl+'/login_check', requestOptions)
                   .then(response => response.json())

               ;
           } catch (e) {

           }


        },

        async fetchUser(ctx) {
            const user = null;
            ctx.commit('updateUser', user);

        },

    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        },
        updateLoginData(state, loginData) {
            state.loginData = loginData;
        }
    },
    state: {
        //user: {id: 1}
        user: null,
        loginData: {
            username: 'user11@user.com',
            password: '123123'
        }

    },

    getters: {
        loginData(state) {
            return state.loginData;
        },
        user(state) {
            return state.user;
        }
    },
}

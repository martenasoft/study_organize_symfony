

export default {
    actions: {
        async userLogin (ctx, user) {
           alert(122);
        },
        async fetchUser(ctx) {
            //alert(config.baseUrl)
            //const res = await fetch(url);
          //  const user = await res.json();
           // const user = {id: 11};
            const user = null;
            ctx.commit('updateUser', user);

        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user;
        }
    },
    state: {
        //user: {id: 1}
        user: null
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
}

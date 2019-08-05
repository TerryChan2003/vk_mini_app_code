import connect from '@vkontakte/vkui-connect-promise'
export default {
    namespaced: true,
    actions: {
        fetchUserData(ctx) {
            connect.send('VKWebAppGetUserInfo', {}).then(r => {
                console.log(r)
                ctx.commit("updateUserData", r.data)
            })
        }
    },
    mutations: {
        updateUserData(state, user) {
            state.user = user
        }
    },
    state: {
        user: {}
    },
    getters: {
        getUserData(state) {
            return state.user
        }
    }
}
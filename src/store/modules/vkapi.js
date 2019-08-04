import connect from '@vkontakte/vkui-connect-promise'
export default {
    actions: {
        fetchFriends(ctx) {
            ctx.commit("updateStatus", "loading")
            connect
                .send("VKWebAppGetAuthToken", {
                    app_id: 7080308,
                    scope: "friends"
                }).catch(e => ctx.commit("updateStatus", "denied"))
                .then(r => {
                    var token = r.data.access_token;
                    connect
                        .send("VKWebAppCallAPIMethod", {
                            method: "friends.get",
                            params: {
                                v: "5.101",
                                fields: "photo_200, sex",
                                count: "10000",
                                access_token: token
                            }
                        })
                        .then(r => {
                            var friends = r.data.response.items;
                            ctx.commit("updateFriends", friends)
                            ctx.commit("updateStatus", "success")
                        })
                });
        }
    },
    mutations: {
        updateFriends(state, friends) {
            state.friends = friends
        },
        updateStatus(state, status) {
            state.status = status
        }
    },
    state: {
        friends: [],
        status: ""
    },
    getters: {
        allFriends(state) {
            return state.friends
        },
        getStatus(state) {
            return state.status;
        }
    }
}
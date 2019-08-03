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
        updateFindName(state, find_name) {
            state.find_name = find_name.toLowerCase()
        },
        updateStatus(state, status) {
            state.status = status
        }
    },
    state: {
        friends: [],
        status: "",
        find_name: ""
    },
    getters: {
        allFriends(state) {
            return state.friends
        },
        countFriends(state) {
            return state.friends.filter((user) => {
                return `${user.first_name} ${user.last_name}`.toLowerCase().indexOf(state.find_name) !== -1
            }).length
        },
        filteredFriends(state) {
            return state.friends.filter((user) => {
                return `${user.first_name} ${user.last_name}`.toLowerCase().indexOf(state.find_name) !== -1
            })
        },
        getStatus(state) {
            return state.status;
        }
    }
}
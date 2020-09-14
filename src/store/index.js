import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        list: [
            {
                name: "张三",
                tel: "13000000000",
                id: 0,
            },
        ],
    },
    mutations: {
        setToken(state, val) {
            state.token = val
        },
        setlist(state, list) {
            state.list = list
            console.log(list)
        }
    },
    actions: {
    },
    modules: {
    },
    plugins: [createPersistedState({
        storage: window.localStorage
    })] //会自动保存创建的状态。刷新还在
})
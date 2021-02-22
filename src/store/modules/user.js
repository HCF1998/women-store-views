export default {
    state: {
        user: '', // 登录的用户
        showLogin: false, // 用于控制是否显示登录组件
        showAgreement: false, // 是否显示协议模态框
        token: ''
    },
    getters: {
        getUser(state) {
            return state.user
        },
        getShowLogin(state) {
            return state.showLogin
        },
        getShowAgreement(state) {
            return state.showAgreement
        }
    },
    mutations: {
        setToken(state, data) {
            state.token = data;
        },
        setUser(state, data) {
            state.user = data
        },
        setShowLogin(state, data) {
            state.showLogin = data
        },
        setShowAgreement(state, payload) {
            state.showAgreement = payload;
        }
    },
    actions: {
        setUser({ commit }, data) {
            commit('setUser', data)
        },
        setShowLogin({ commit }, data) {
            commit('setShowLogin', data)
        },
        setShowAgreement({ commit }, data) {
            commit('setShowAgreement', data)
        }
    },
}

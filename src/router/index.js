import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/reset',
        name: 'Reset',
        component: () => import('../views/ResetPwd.vue'),
    },
    {
        path: '/goodsList',
        name: 'GoodsList',
        component: () => import('../views/GoodsList.vue'),
    },
    {
        path: '/goods/:categoryID',
        name: 'Details',
        component: () => import('../views/Details.vue'),
    },
    {
        path: '/personCenter',
        name: 'PersonCenter',
        component: () => import('../views/PersonCenter.vue'),
    },
    {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import('../views/ShoppingCart.vue'),
        meta: {
            requireAuth: true, // 需要验证登录状态
        },
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () => import('../views/Collect.vue'),
        meta: {
            requireAuth: true, // 需要验证登录状态
        },
    },
    {
        path: '/confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('../views/ConfirmOrder.vue'),
        meta: {
            requireAuth: true, // 需要验证登录状态
        },
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue'),
        meta: {
            requireAuth: true, // 需要验证登录状态
        },
    },
    // {
    //     path: '/error',
    //     name: 'Error',
    //     component: () => import('../components/Error.vue'),
    // },
    // {
    //     path: '*',
    //     redirect: '/error',
    // },
]

const router = new VueRouter({
    routes,
})

export default router

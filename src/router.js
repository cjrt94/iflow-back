import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
            // =============================================================================
            // Main layout routes
            // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
                // =============================================================================
                // Routes
                // =============================================================================
                {
                    path: '/',
                    redirect: '',
                    component: () => import('./views/Home'),
                    meta: {
                        rule: 'admin',
                        authRequired: true
                    }
                },
                /**
                 * Users
                 */
                {
                    path: 'users/list/',
                    name: 'users',
                    component: () => import('./views/users/App'),
                    meta: {
                        rule: 'editor',
                        authRequired: true
                    }
                },
                /**End**/
                /**
                 * Travels
                 */
                {
                    path: 'travels/list/',
                    name: 'travels',
                    component: () => import('./views/travels/App'),
                    meta: {
                        rule: 'editor',
                        authRequired: true
                    }
                },
                /**End**/
                /**
                 * General
                 */
                {
                    path: 'settings/general/',
                    name: 'general',
                    component: () => import('./views/Content'),
                    meta: {
                        rule: 'admin',
                        authRequired: true
                    }
                }
                /**End**/
            ]
        },
        // Full Page Layout
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
                {
                    path: '/pages/login',
                    name: 'page-login',
                    component: () => import('@/views/login/Login.vue'),
                    meta: {
                        rule: 'editor',
                    }
                },
                // Redirect to 404 page, if no match found
                {
                    path: '*',
                    redirect: '/pages/error-404',
                    meta: {
                        rule: 'editor'
                    }
                }
            ]
        }
    ]
})

router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

router.beforeEach((to, from, next) => {
    firebase.auth().onAuthStateChanged(() => {

        // get firebase current user
        const firebaseCurrentUser = firebase.auth().currentUser

        // If auth required, check login. If login fails redirect to login page

        if (to.meta.authRequired) {
            if (!(firebaseCurrentUser)) {
                router.push({ path: '/pages/login', query: { to: to.path } })
            }
        }
        return next()
    })
})

export default router

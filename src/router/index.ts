import AuthService from '@/services/auth';
import Auth from '@/views/auth/index.vue';
import Dashboard from '@/views/dashboard/index.vue';
import App from '@/views/layouts/app.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dashboard',
        component: App,
        meta: { auth: true },
        children: [
            {
                path: '/dashboard',
                component: Dashboard
            }
        ]
    },
    {
        path: "/auth",
        component: Auth
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const auth = new AuthService();
router.beforeEach(async (to, from, next) => {
    if(to.meta.auth)
    {
        const user = await auth.getUser();
        if (user) {
            if (!user.expired) next();
            else next({ path: '/auth' })
        } else next({ path: '/auth' })
    }
    else next();
});

export default router;

import AuthService from '@/services/auth';
import Auth from '@/views/auth/index.vue';
import Create from '@/views/contacts/create.vue';
import Edit from '@/views/contacts/edit.vue';
import Dashboard from '@/views/contacts/index.vue';
import Recent from '@/views/contacts/recent.vue';
import View from '@/views/contacts/view.vue';
import App from '@/views/layouts/app.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/dashboard',
        component: App,
        children: [
            {
                path: '/dashboard',
                component: Dashboard
            },
            {
                path: '/recent',
                component: Recent
            },
            {
                path: '/create',
                component: Create
            },
            {
                path: '/contact/:id',
                component: View
            },
            {
                path: '/contact/:id/edit',
                component: Edit
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

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Auth from '@/views/auth/index.vue';
import Dashboard from '@/views/dashboard/index.vue';
import AuthService from "@/services/auth";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: Auth
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
          authName: AuthService.authName
        }
        
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
  
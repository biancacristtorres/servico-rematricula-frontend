import Vue from 'vue';
import Router from 'vue-router';
import routes from 'vue-auto-routing';
import { createRouterLayout } from 'vue-router-layout';
import beforeEach from '@/config/router/beforeEach';

Vue.use(Router);

const RouterLayout = createRouterLayout((layout) => {
  return import('@/layouts/' + layout + '.vue');
});

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes,
      redirect: '/Resumo',
    },
    {
      path: '*',
      redirect: '/Erro/PaginaNaoEncontrada',
    },
  ],
});
router.beforeEach(beforeEach);

export default router;

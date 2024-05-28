import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import { defineAsyncComponent } from 'vue';

console.log('base:', import.meta.env.BASE_URL);

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: defineAsyncComponent(() => import('@/views/NotesView.vue')),
    },
  ],
});

export default router;

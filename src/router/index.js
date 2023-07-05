import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../views/ProductPage'
import DummyPage from '../views/DummyPage'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ProductPage, props: { page: 'accessories' } },
        { path: '/accessories', component: ProductPage, props: { page: 'accessories' } },
        { path: '/clothing-and-apparels', component: ProductPage, props: { page: 'clothing-and-apparels' } },
        { path: '/footwear', component: DummyPage, props: { page: 'footwear' } },
        { path: '/home-furnishing', component: ProductPage, props: { page: 'home-furnishing' } },
        { path: '/personal-care', component: ProductPage, props: { page: 'personal-care' } },
        { path: '/toys-and-games', component: ProductPage, props: { page: 'toys-and-games' } },
    ]
  })
  
  export default router
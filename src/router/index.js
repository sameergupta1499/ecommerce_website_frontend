import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../views/ProductPage'

const router = createRouter({
    history: createWebHistory('/ecommerce_website_frontend/'),
    routes: [
        { path: '/', component: ProductPage, props: { page: 'footwear' } },
        { path: '/accessories/', component: ProductPage, props: { page: 'accessories' } },
        { path: '/clothing-and-apparels/', component: ProductPage, props: { page: 'clothing-and-apparels' } },
        { path: '/footwear/', component: ProductPage, props: { page: 'footwear' } },
        { path: '/home-furnishing/', component: ProductPage, props: { page: 'home-furnishing' } },
        { path: '/personal-care/', component: ProductPage, props: { page: 'personal-care' } },
        { path: '/toys-and-games/', component: ProductPage, props: { page: 'toys-and-games' } },
    ]
})

export default router
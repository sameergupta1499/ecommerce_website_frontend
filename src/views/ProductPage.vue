<template>
  <div v-if="productData && productData.count > 0">
        <p>hiiii</p>
      <ProductCards :productData="productData" />
    </div>
    <div v-else>
      <p>piiii</p>
      Loading...
    </div>
</template>

<script>
import { onMounted, ref  } from 'vue'
// import axios from 'axios'
import {fetchProducts} from '@/services/products'
import { useStore } from 'vuex';
import ProductCards from '@/components/Products/ProductCards'

export default {
  setup() {
    const store = useStore();
    // Define productData as a computed property
    const productData = ref(store.state.productData);
    
    onMounted(async () => {
      try {
        const data = await fetchProducts();
        store.commit('setProductData', data); // Assuming you have a mutation named SET_PRODUCTS in your Vuex store
        productData.value = data; // Update the value of the ref
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    });
    
    // watch(productData, (newValue, oldValue) => {
    //   console.log("newValue",newValue); // Log the updated value of productData
    //   console.log("productData",productData); // Log the updated value of productData
    //   console.log("oldValue",oldValue); // Log the updated value of productData
    // });


    return {productData};
  },
  components: {
    ProductCards
  },
}
</script>
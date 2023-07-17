<template>
  <div>
    <HeaderComponent />
    <main id="search-base">
      <div id="search-filters-container">
        <ProductFilters :productData="productData" />
      </div>

      <div id="search-product-container">
        <ProductCards :productData="productData" />
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { fetchProducts } from "@/services/products";
import { useStore } from "vuex";
import ProductCards from "@/components/pages/products/ProductCards";
import ProductFilters from "@/components/pages/products/ProductFilters";
import HeaderComponent from "@/components/layout/HeaderComponent";
import { useRouter  } from "vue-router";

export default {
  props: {
    page: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    // Define productData as a computed property
    const productData = ref(store.state.productData);
    const router = useRouter();
    onMounted(async () => {
      try {
        const data = await fetchProducts({"page":props.page});
        store.commit("setProductData", data); // Assuming you have a mutation named SET_PRODUCTS in your Vuex store
        productData.value = data; // Update the value of the ref

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    });

    watch(() => props.page, () => {
      // router.push('/footwear');
      const getproducts = async () => {
      try {
        const data = await fetchProducts({"page":props.page});
        store.commit("setProductData", data); // Assuming you have a mutation named SET_PRODUCTS in your Vuex store
        productData.value = data; // Update the value of the ref
        console.log("fetched from watch")

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getproducts()
      console.log(router)
      // console.log('newValueherepage:', newValue); // Log the updated value of productData
      // console.log('oldValueherepage:', oldValue); // Log the previous value of productData
    },
      { deep: true });
    // watch(props.page)
    return { productData };
  },
  components: {
    ProductCards,
    ProductFilters,
    HeaderComponent,
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/globals.scss';

#search-base {
  margin-top: $header-height;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: $page-margin;
  max-width: $page-max-width;
}

/* Media query for small screens */
@media (max-width: 510px) {
  #search-base {
    flex-direction: column;
    /* Stack items vertically */
  }
}
</style>

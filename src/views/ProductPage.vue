<template>
  <div>
    <HeaderComponent />
    <main id="search-base">
      <div id="search-filters-container">
        <ProductFilters :productData="productData" :activeFilterData="activeFilterData"
          @update:selected-gender="handleSelectedOptionUpdate" />
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
// import { useRouter } from "vue-router";

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
    const activeFilterData = ref(store.state.activeFilters);
    const fetchDataWrapper = async (page,params) => {
      try {
        console.log(props.page,"props.page",params)
        const data = await fetchProducts(page,params);
        store.commit("setProductData", data); // Assuming you have a mutation named SET_PRODUCTS in your Vuex store
        productData.value = data; // Update the value of the ref
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    onMounted(() => fetchDataWrapper(props.page,activeFilterData.value));

    watch(() => props.page, () => fetchDataWrapper(props.page,activeFilterData.value), { deep: true });
    watch(() => activeFilterData, () => fetchDataWrapper(props.page,activeFilterData.value), { deep: true });

    function handleSelectedOptionUpdate(newValue) {
      store.commit("updateActiveFilter", newValue);
      activeFilterData.value = newValue;  
    }
    return {
      productData,
      activeFilterData,
      handleSelectedOptionUpdate
    };
  },
  components: {
    ProductCards,
    ProductFilters,
    HeaderComponent
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
}</style>

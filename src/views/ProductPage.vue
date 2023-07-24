<template>
  <div>
    <HeaderComponent />
    <div class="row-base">
      <span><h1 class="title-title"> {{ convertToCamelCase(page) }} - <span ckass ="title-count">{{productData.count}} items</span></h1></span>
    </div>
    <main id="search-base">

      <div id="search-filters-container">
        <ProductFilters :productData="productData" :activeFilterData="activeFilterData" :currentPath="c_path"
          @update:selected-gender="handleSelectedOptionUpdate" @event:clear-all="clearAll" />
      </div>

      <div id="search-product-container">
        <ProductCards :productData="productData" :activeFilterData="activeFilterData" />
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
import { useRouter, useRoute } from "vue-router";
import { convertToCamelCase } from '@/services/utils';

export default {
  props: {
    page: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const route = useRoute();
    // Define productData as a computed property
    const router = useRouter();
    const productData = ref(store.state.productData);
    const c_path = ref(store.state.currentFullPath)
    let activeFilterData = ref(store.state.activeFilters);
    const fetchDataWrapper = async (page, params) => {
      try {
        const updatedQueryParams = {};
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            // Join non-empty array values with comma-separated values
            updatedQueryParams[key] = value.join(",");
          } else if (value !== "") {
            updatedQueryParams[key] = value;
          }
        });
        await router.push({ query: updatedQueryParams });
        let current_full_path = route.fullPath;
        if (current_full_path != store.state.currentFullPath) {
          store.commit("updateCurrentFullPath", current_full_path);
          c_path.value = current_full_path;
          const data = await fetchProducts(page, updatedQueryParams);
          store.commit("setProductData", data); // Assuming you have a mutation named SET_PRODUCTS in your Vuex store
          productData.value = data; // Update the value of the ref
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    onMounted(() => {
      //logic for deserialization of url and update both active filters and products according to the params
      fetchDataWrapper(props.page, activeFilterData.value)
    });
    function clearAll() {
      store.commit("clearAllFilter");
      activeFilterData.value = store.state.activeFilters;
    }
    watch(() => props.page, () => {
      clearAll();
    });
    watch(() => activeFilterData, (newValue) => {
      fetchDataWrapper(props.page, newValue.value)
    }, { deep: true });

    function handleSelectedOptionUpdate(newValue) {
      store.commit("updateActiveFilter", newValue);
    }
    return {
      productData,
      activeFilterData,
      handleSelectedOptionUpdate,
      clearAll,
      c_path,
      convertToCamelCase
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
  margin: $page-row-margin;
  max-width: $page-max-width;
}
.row-base {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
    margin: $page-margin;
  max-width: $page-max-width;
  span{
    padding:$page-left-padding;
    h1{
      font-weight: 700;
      font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #282c3f;
    max-width: 400px;
    span{
      padding:0;
      font-weight: 400;
      color: #878b94;
    }
    }
  }
  
}

/* Media query for small screens */
@media (max-width: 510px) {
  #search-base {
    flex-direction: column;
    /* Stack items vertically */
  }
}
</style>

<template>
  <div>
    <LoadingOverlay :loadingScreen="loadingScreen"/>
    <HeaderComponent />
    <div class="row-base">
      <span>
        <h1 class="title-title"> {{ convertToCamelCase(page) }} - <span ckass="title-count">{{ productData.count }}
            items</span></h1>
      </span>
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
import LoadingOverlay from "@/components/common/LoadingOverlay";
import { useRouter, useRoute } from "vue-router";
import { convertToCamelCase, parseUrlToParams } from '@/services/utils';

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
    const loadingScreen = ref(false);
    const c_path = ref(store.state.currentFullPath)
    let activeFilterData = ref(store.state.activeFilters);
    let page_changed = false;               //if the page changes then we don't reset it to 1st page.
    const fetchDataWrapper = async (page, params) => {
      try {
        const updatedQueryParams = {};
        // console.log(store.state.loadingScreen)
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
          loadingScreen.value = !loadingScreen.value;
          const data = await fetchProducts(page, updatedQueryParams);
          loadingScreen.value = !loadingScreen.value;

          store.commit("setProductData", data); // Assuming you have a mutation named SET_PRODUCTS in your Vuex store
          productData.value = data; // Update the value of the ref
        }

      } catch (error) {
        console.error("Error fetching products:", error);
        loadingScreen.value = !loadingScreen.value;
      }
    }
    onMounted(() => {
      //logic for deserialization of url and update both active filters and products according to the params
      const parsedParams = parseUrlToParams(route.fullPath);
      console.log(parsedParams);
      store.commit("updateInitialActiveFilter", parsedParams);
      activeFilterData.value = store.state.activeFilters;
      fetchDataWrapper(props.page, activeFilterData.value);// props.page coming from router
    });
    function clearAll() {
      store.commit("clearAllFilter");
      activeFilterData.value = store.state.activeFilters;
    }
    watch(() => props.page, () => {   //if we change page from let's say clothing to beauty then we are resetting activefilters
      clearAll();
    });

        
    watch(() => activeFilterData.value.p, () => {
      page_changed=true;
    });

    watch(() => activeFilterData, (newValue) => {
      if (page_changed == false) {     //if the page any filter or sorting change then setting the p to ""
        newValue.value.p = 1;
      }
      page_changed=false;           //resetting page changed to false
      fetchDataWrapper(props.page, newValue.value);
    }, { deep: true });


    function handleSelectedOptionUpdate(newValue) {
      let oldValue = store.state.activeFilter;   //if the page any filter or sorting change then setting the p to ""
      console.log("here2",newValue,oldValue)
      if (newValue.p === oldValue.p) {
        // newValue.p = 1;
      }
      store.commit("updateActiveFilter", newValue);
    }
    return {
      productData,
      activeFilterData,
      handleSelectedOptionUpdate,
      clearAll,
      c_path,
      convertToCamelCase,
      loadingScreen
    };
  },
  components: {
    ProductCards,
    ProductFilters,
    HeaderComponent,
    LoadingOverlay
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

  span {
    padding: $page-left-padding;

    h1 {
      font-weight: 700;
      font-size: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #282c3f;
      max-width: 400px;

      span {
        padding: 0;
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
}</style>

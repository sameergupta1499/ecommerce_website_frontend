import { createStore } from 'vuex';
export const initialActiveFilters = {
  brands: [],
  category: [],
  ordering: "",
  gender: "",
  p: 1,
};

const store = createStore({
  state() {
    return {
      activeFilters:  { ...initialActiveFilters },
      productData: {
        count: 0,
        current_page: 1,
        next: null,
        previous: null,
        total_pages: 1,
        category: [],
        results: [],
        seller: []
      },
      currentFullPath:"",
    };
  },
  getters: {
    getProductData(state) {
      return state.productData;
    }
  },
  mutations: {
    setProductData(state, payload) {
      state.productData = payload;
    },
    updateActiveFilter(state, newValue) {
      state.activeFilters = newValue;
    },
    updateCurrentFullPath(state, newValue) {
      state.currentFullPath = newValue;
    },
    clearAllFilter(state) {
      state.activeFilters.brands = [];
      state.activeFilters.category = [];
      state.activeFilters.ordering = "";
      state.activeFilters.gender = "";
      state.activeFilters.p =1;
    },
    updateInitialActiveFilter(state,newValue) {
      state.activeFilters.brands = newValue.brands;
      state.activeFilters.category = newValue.category;
      state.activeFilters.ordering = newValue.ordering;
      state.activeFilters.gender = newValue.gender;
      state.activeFilters.p = newValue.p;
    }
  },
  actions: {
    fetchProductData(context, payload) {
      context.commit('setProductData', payload);
    }
  }
});

export default store;

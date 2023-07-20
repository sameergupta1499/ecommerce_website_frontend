import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      activeFilters: {
        brands: [],
        category: [],
        sortBy: "",
        gender: ""
      },
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
      currentFullPath:""
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
      state.activeFilters.sortBy = "";
      state.activeFilters.gender = "";
    }
  },
  actions: {
    fetchProductData(context, payload) {
      context.commit('setProductData', payload);
    }
  }
});

export default store;

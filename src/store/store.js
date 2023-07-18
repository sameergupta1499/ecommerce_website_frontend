import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      activeFilters:{
        brands:[],
        category:[],
        sortBy:"",
        gender:""
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
      }
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
  },
  actions: {
    increment(context, payload) {
      context.commit('increment', payload);
    },
    fetchProductData(context, payload) {
      context.commit('setProductData', payload);
    }
  }
});

export default store;
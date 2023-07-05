import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      counter: 0,
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
    getCounter(state) {
      return state.counter;
    },
    getProductData(state) {
      return state.productData;
    }
  },
  mutations: {
    increment(state, payload) {
      state.counter = state.counter + payload;
    },
    setProductData(state, payload) {
      state.productData = payload;
    }
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

<template>
  <div class="product-container-base">
    <div class="row-base-search">
      <SortBy />
    </div>
    <div id="products-flex-container">
      <div id="product-card-container" v-for="product in productData.results" :key="product.id">
        <div id="product-card-rating-container">{{ product.rating }}
          <img src="@/assets/rating.png" id="rating-img" alt="rating" />
          <span class="rating-separator">|</span>
          <span class="total-rating-text">{{ product.ratingtotal }}</span>
        </div>
        <a href="#" target="_blank" @click.prevent>
          <img :src="product.image_list" alt="Product Image" id="product-card-img">
          <div id="product-card-meta">
            <div id="product-card-meta-brand">
              {{ product.seller }}
            </div>
            <div id="product-card-meta-name">
              {{ product.name }}
            </div>
          </div>
        </a>
        <!-- <p v-if="!productData">Loading...</p>
      <p v-else>{{ productData }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import {  } from 'vue';
import SortBy from '@/components/common/SortBy.vue';

export default {
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // const productData = props.productData

    return {};
  },
  components: {
    SortBy
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/globals.scss';

.product-container-base {
  display: flex;
  flex-direction: column;
  min-width: 1348px;
}

.row-base-search {

  padding: $row-search-base-padding;
  border-bottom: $page-section-border;
}

#products-flex-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  max-width: $products-container-width;
  padding: 15px 20px 0 24px;
}

#product-card-rating-container {
  display: flex;
  align-content: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  margin-left: 10px;
  margin-top: 245px;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 4px;
  background: hsla(0, 0%, 100%, .8);
  border-radius: 2px;
}

#product-card-container {
  position: relative;
  width: 210px;
  height: 360px;
  display: inline-block;
  margin: 0 10px 30px 10px
}

#product-card-img {
  // position: absolute;
  width: 210px;
  height: 280px;
}

#rating-img {
  width: 13px;
  height: 11px;
  margin: 0 4px;
  padding-top: 2px;
}

.rating-separator {
  margin-right: 4px;
}
</style>

<template>
  <div class="product-container-base">
    <div class="row-base-search">
      <SortBy :activeFilterData="activeFilterData" />
    </div>
    <div class="">
      <ActiveFilters :activeFilterData="activeFilterData" />
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
          <div class="product-productMetaInfo">
            <h3 class="product-brand">{{ product.seller }}</h3>
            <h4 class="product-product">{{ product.name }}</h4>
            <div class="product-price"><span><span class="product-discountedPrice">Rs.
                  {{ product.price }}</span><span
                  class="product-strike"> Rs.{{product.mrp }}</span></span><span
                class="product-discountPercentage"> ({{product.discount}} % OFF)</span>
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
import { } from 'vue';
import SortBy from '@/components/common/SortBy.vue';
import ActiveFilters from '@/components/common/ActiveFilters.vue';

export default {
  props: {
    productData: {
      type: Object,
      required: true,
    },
    activeFilterData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    // const productData = props.productData

    return {};
  },
  components: {
    SortBy,
    ActiveFilters
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/globals.scss';

.product-productMetaInfo {
    position: relative;
    z-index: 3;
    background: #fff;
    padding: 0 10px;
    margin-top: 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    height: 68px;
    overflow: hidden;
}

.product-brand {
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
    color: #282c3f;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: uppercase;
}
.product-product {
    color: #535766;
    font-size: 14px;
    line-height: 1;
    margin-bottom: 0;
    margin-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 400;
    display: block;
}


.product-container-base {
  display: flex;
  flex-direction: column;
  max-width: $products-container-width;
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
.product-price {
    font-size: 14px;
    line-height: 15px;
    color: #282c3f;
    white-space: nowrap;
    margin: 8px 0 6px;
    font-weight: 700;
}


.product-discountedPrice {
    font-size: 14px;
    font-weight: 700;
    color: #282c3f;


}
.product-strike {
    text-decoration: line-through;
    color: #7e818c;
    font-weight: 400;
    margin-left: 5px;
    font-size: 12px;
}
.product-discountPercentage {
    color: #ff905a;
    font-weight: 400;
    font-size: 12px;
    margin-left: 5px;
}

</style>

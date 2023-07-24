<template>
  <div class="horizontal-filters-sortContainer">
    <div class="sort-sortBy" @mouseover="showOptions = true" @mouseout="showOptions = false">
      Sort by: <span>{{ options[selectedOptions.ordering] || 'Recommended' }}</span>
      <span class="img-span"><img class="filter-summary-removeIcon" src="@/assets/down-arrow.png" id="down-arrow-image"
          alt="down-arrow-image" /></span>
      <ul class="sort-list" v-show="showOptions">
        <li v-for="(value, item) in options" :key="item">
          <label class="sort-label">
            <input type="radio" name="sort" :value="item" v-model="selectedOptions.ordering">
            {{ value }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  props: {
    activeFilterData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const selectedOptions = ref(props.activeFilterData)
    const showOptions = ref(false);
    const options = {
      "recommended": 'Recommended',
      "price_lth": 'Price: Low to High',
      "price_htl": 'Price: High to Low',
      "ratingtotal_htl": 'Popularity',
      "discount_htl": 'Better Discount',
      "rating_htl": 'Customer Rating',
    }

    return {
      selectedOptions,
      showOptions,
      options,
    };
  },
};
</script>
  
<style lang="scss" scoped>
@import '@/styles/globals.scss';

.horizontal-filters-sortContainer {
  display: inline-block;
  float: right;
  margin-right: 30px;

}

.sort-sortBy {
  width: 255px;
  position: relative;
  padding: 9px 14px;
  border-radius: 2px;
  border: 1px solid #d4d5d9;

  span {
    font-weight: 700;
  }

  .img-span {
    display: inline-flex;
    position: absolute;
    /* float: right; */
    right: 16px;
    top: 12px;
    height: 14px;
    width: 13px;
    opacity: 0.5;
  }
}

.sort-label {
  display: block;
  padding: 10px 20px;
}

.sort-list {
  display: none;
  /* Hide the list of options by default */
  position: absolute;
  top: 33px;
  left: -1px;
  z-index: 11;
  width: 100%;
  background-color: white;
  padding: 16px 0;
  border-radius: 2px;
  border: 1px solid #d4d5d9;
  border-top: none;
}

.sort-sortBy:hover .sort-list,
.sort-list[style*="display: block"] {
  display: block;
  /* Show the list of options when hovering over the "Sort by" element or when showOptions is true */
}</style>
  
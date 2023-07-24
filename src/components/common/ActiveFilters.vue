<template>
  <div class="horizontal-filters-sortContainer">
    <!-- <div class="sort-sortBy" @mouseover="showOptions = true" @mouseout="showOptions = false"> -->
    <div class="filter-summary-selectedFilterContainer">
      <ul class="filter-summary-filterList">
        <li v-for="category in activeFilterData.category" :key="category"
          @click="updateActiveList(category, 'category')">
          <div class="filter-summary-filter">
            <label class="filter-summary-removeFilter"> {{ convertToCamelCase(category) }}
              <span><img class="filter-summary-removeIcon" src="@/assets/close.png" id="close-img"
                  alt="close-image" /></span></label>
          </div>
        </li>
        <li v-for="brand in activeFilterData.brands" :key="brand"
          @click="updateActiveList(brand, 'brands')">
          <div class="filter-summary-filter">
            <label class="filter-summary-removeFilter"> {{ convertToCamelCase(brand) }}
              <span><img class="filter-summary-removeIcon" src="@/assets/close.png" id="close-img"
                  alt="close-image" /></span></label>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- </div> -->
</template>
  
<script>
import { ref } from 'vue';
import { convertToCamelCase } from '@/services/utils';
export default {
  props: {
    activeFilterData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const selectedOptions = ref(props.activeFilterData)
    console.log(selectedOptions)
    function updateActiveList(cat, filter_type) {
      if (filter_type == "category") {
        let indexToRemove = selectedOptions.value.category.indexOf(cat);
        if (indexToRemove !== -1) {
          selectedOptions.value.category.splice(indexToRemove, 1);
        }
      }
      if (filter_type == "brands") {
        let indexToRemove = selectedOptions.value.brands.indexOf(cat);
        if (indexToRemove !== -1) {
          selectedOptions.value.brands.splice(indexToRemove, 1);
        }
      }
    }
    return {
      selectedOptions,
      convertToCamelCase,
      updateActiveList
      // showOptions,
      // options,
    };
  },
};
</script>
  
<style lang="scss" scoped>
@import '@/styles/globals.scss';

.filter-summary-selectedFilterContainer {
  padding-top: 15px;
}

.filter-summary-filterList {
  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
  margin: 0;
  padding-left: 17px !important;
}

input {
  display: none;
}

.filter-summary-filterList li {
  margin: 0 8px 6px 0;
}

.filter-summary-filter {
  position: relative;
  background-color: #fff;
  text-transform: capitalize;
  color: #3e4152;
  cursor: default;
  font-size: 12px;
  padding: 5px 26px 5px 10px;
  -webkit-transition: all .2s ease-out;
  transition: all .2s ease-out;
  border-radius: 20px;
  border: 1px solid #d4d5d9;
}

.filter-summary-removeIcon {
  position: absolute;
  top: 9px;
  right: 7px;
  width: 9px;
  height: 8px;
  z-index: 1;
  text-align: center;
  cursor: pointer;
}
</style>
  
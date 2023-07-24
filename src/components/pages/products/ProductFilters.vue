<template>
  <div id="filter-flex-container">
    <div class="header-container vertical-filters-filters">
      <span class="header-title" >FILTERS</span>
      <span v-if="shouldShowClearAll()" class="header-clearAllBtn" @click="handleClearAllClick">CLEAR ALL</span>
    </div>
    <div v-if="productData.seller && productData.seller.length > 0">
    </div>
    <div class="vertical-filters-filters gender-container">
      <ul class="gender-list" v-for="gender in productData.gender" :key="gender">
        <li class="gender-list-item">
          <label class="gender-label">
            <div
              :class="{ 'common-radioIndicator-active': selectedOptions.gender === gender, 'common-radioIndicator': selectedOptions.gender !== gender }">
            </div>
            <input type="radio" name="gender" :value="gender" v-model="selectedOptions.gender">
            <span>{{ convertToCamelCase(gender) }}</span>
          </label>
        </li>
      </ul>
    </div>

    <div class="vertical-filters-filters categories-container">
      <span class="vertical-filters-header">CATEGORIES</span>
      <ul class="list">
        <li v-for="(category, index) in productData.category" :key="category">
          <template v-if="index < 8">
            <label class="common-customCheckbox vertical-filters-label">
              <input type="checkbox" name="category" :value="category" v-model="selectedOptions.category">
              {{ convertToCamelCase(category) }}
              <div class="common-checkboxIndicator"></div>
            </label>
          </template>
        </li>
      </ul>
      <div class="list-more" v-if="productData.category.length > 8"
        @click="isModalVisible.category = !isModalVisible.category">
        +{{ productData.category.length - 8 }} more
      </div>
      <div v-if="productData.category && productData.category.length > 0" v-show="isModalVisible.category" ref="categoryModalRef">
        <ProductFiltersModal :items="productData.category" filter_type="category" :activeList="activeFilterData.category"
          @update:selected-items="handleSelectedItemsUpdate" @event:close-modal="closeModal"/>/>
      </div>
    </div>

    <div class="vertical-filters-filters brand-container">
      <span class="vertical-filters-header">BRAND</span>
      <ul class="list">
        <li v-for="(seller, index) in productData.seller" :key="seller">
          <template v-if="index < 8">
            <label class="common-customCheckbox vertical-filters-label">
              <input type="checkbox" name="seller" :value="seller" v-model="selectedOptions.brands">
              {{ convertToCamelCase(seller) }}
              <div class="common-checkboxIndicator"></div>
            </label>
          </template>
        </li>
      </ul>
      <div class="list-more" v-if="productData.seller.length > 8" @click="isModalVisible.brand = !isModalVisible.brand">
        <span>+{{ productData.seller.length - 8 }} more</span>
      </div>
      <div v-if="productData.seller && productData.seller.length > 0" v-show="isModalVisible.brand" ref="brandModalRef">
        <ProductFiltersModal :items="productData.seller" filter_type="brand" :activeList="activeFilterData.brands"
          @update:selected-items="handleSelectedItemsUpdate" @event:close-modal="closeModal"/>/>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { convertToCamelCase } from '@/services/utils';
import ProductFiltersModal from "@/components/pages/products/ProductFiltersModal";
import { onClickOutside } from '@vueuse/core'
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
    currentPath: {
      type: String,
    },
  },
  setup(props,{emit}) {
    const selectedOptions = ref(props.activeFilterData)   // selectedOption is a reference, so any changes made to it will be reflected in parent activeFilterData
    const isModalVisible = ref({
      category: false,
      brand: false
    });
    const categoryModalRef = ref(null)
    const brandModalRef = ref(null)
    function handleSelectedItemsUpdate(newValue, filter_type) {
      if (filter_type == "category") {
        selectedOptions.value.category = newValue;
      }
      else if (filter_type == "brand") {
        selectedOptions.value.brands = newValue;
      }
    }

    function shouldShowClearAll() {
      if (props.currentPath.includes("?")){
        return true;
      }
      return false;
    }

    function closeModal(){
      isModalVisible.value.category = false;
      isModalVisible.value.brand = false;
    }
    function handleClearAllClick(){
      emit('event:clear-all');
    }
    onClickOutside(categoryModalRef,()=>isModalVisible.value.category = false);
    onClickOutside(brandModalRef,()=>isModalVisible.value.brand = false);

    return {
      selectedOptions,
      convertToCamelCase,
      handleSelectedItemsUpdate,
      isModalVisible,
      categoryModalRef,
      brandModalRef,
      closeModal,
      handleClearAllClick,
      shouldShowClearAll
    };
  },
  components: {
    ProductFiltersModal
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/globals.scss';

.header-container {
  font-size: 16px;
  font-weight: 700;
  padding-top: 17px !important;
  border-right: none !important;
  display: inline-flex;
    position: relative;
}

#filter-flex-container {
  display: flex;
  max-width: $filter-container-width;
  min-width: $filter-container-width;
  flex-direction: column;

}

.categories-container {
  position: relative;
}

.brand-container {
  position: relative;
}

.vertical-filters-filters {
  padding: $page-left-padding;
  font-weight: 700;
  border-bottom: $page-section-border;
  border-right: $page-section-border;
  display: block;
}

.vertical-filters-header {
  font-weight: 700px;
  font-size: 14px;
  margin: 0 0 18px;
  display: block;
}

.list {
  font-weight: 400;

  li {
    font-size: 14px;
    margin-bottom: 7px;

    .common-customCheckbox {
      position: relative;
      cursor: pointer;
      text-overflow: ellipsis;
    }
  }

}

input[type="checkbox" i] {
  background-color: initial;
  cursor: default;
  appearance: auto;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
  margin: 0 16px 0 0;
  visibility: hidden;
  font-weight: 400;
}
.modal{
  max-height: 568px;
  min-height: 568px;
}
.common-checkboxIndicator:after {
  content: "";
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 1;
  width: 7px;
  height: 4px;
  border-color: #fff;
  border-style: none none solid solid;
  border-width: 2px;
  -webkit-transition: all .3s ease-in-out;
  transition: all .3s ease-in-out;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.common-customCheckbox input:checked~.common-checkboxIndicator {
  border: none;
  background: #ff3f6c;
}

.gender-list-item {
  cursor: pointer;
  margin-bottom: 7px;

  span {
    margin-left: 32px;
    cursor: pointer;
    text-transform: uppercase;
  }
}

.list-more {
  cursor: pointer;
  margin-top: 10px;
  font-size: 15px;
  color: #ff3f6c;
  margin-left: 27px;
  font-weight: 400;
}

.common-radioIndicator {
  content: "";
  cursor: pointer;
  position: absolute;
  z-index: 1;
  width: 10px;
  height: 10px;
  border: 1px solid #c3c2c9;
  border-radius: 50%;
  visibility: visible;
  display: inline-block;
  vertical-align: middle;
  padding: 2px;
  text-align: center;
}

.common-radioIndicator-active {
  content: "";
  cursor: pointer;
  position: absolute;
  z-index: 1;
  width: 10px;
  height: 10px;
  border: 1px solid #c3c2c9;
  border-radius: 50%;
  visibility: visible;
  display: inline-block;
  vertical-align: middle;
  padding: 2px;
  text-align: center;
  transform: rotate(-90deg);
  border-color: #ff3f6c;
  visibility: visible;
  background: #ff3f6c;
  box-shadow: inset 0 0 0 3px #fff;
}

.common-checkboxIndicator {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  border: 1px solid #c3c2c9;
  background: #fff;
  border-radius: 2px;
}
.header-clearAllBtn {
  position: absolute;
    /* top: 32px; */
    right: 10px;
    font-weight: 700;
    color: #ff3f6c;
    font-size: 13px;
    cursor: pointer;
    padding-top: 2px;
}
</style>

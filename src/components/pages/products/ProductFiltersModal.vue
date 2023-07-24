<template>
  <div class="filter-modal-flex-container">
    <div class="modal">
      <div class="filter-search-flex-container">
        <input type="text" placeholder="Search" class="FilterDirectory-searchInput" v-model="searchText"
          @input="filterSeller" />
        <span><img src="@/assets/close.png" id="close-img" alt="close-image" @click="closeModal"/></span>
      </div>
      <div class="filter-list-container">
        <ul class="list filter-list-list modal">
          <li v-for="item in filteredItems" :key="item" class="filter-line-item">
            <label class="common-customCheckbox vertical-filters-label">
              <input type="checkbox" :value="item" v-model="selectedItems">
              <span class="item-text">{{ convertToCamelCase(item) }}</span>
              <div class="common-checkboxIndicator"></div>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { convertToCamelCase } from '@/services/utils';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeList: {
      type: Array,
    },
    filter_type: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const selectedItems = ref(props.activeList)
    const searchText = ref('');
    const filteredItems = ref(props.items);
    if (filteredItems.value && filteredItems.value.length > 0) {
      filteredItems.value.sort();
    }

    // console.log(manipulateSellerData())
    const filterSeller = () => {
      const searchTextLower = searchText.value.toLowerCase();
      if (searchTextLower === '') {
        filteredItems.value = props.items;
      } else {
        filteredItems.value = props.items.filter(item => {
          return item.toLowerCase().includes(searchTextLower);
        });
      }
    };

    watch(selectedItems, (newValue) => {
      emit('update:selected-items', newValue, props.filter_type);
    }, { deep: true });

    watch(()=>props.activeList, (newValue) => {
      selectedItems.value = newValue;  //value changed inside wathc and computed properties doesn't trigger a watch even, so watch(selectedItems, (newValue) won't be triggered in this case
    }, { deep: true });

    function closeModal(){
      emit('event:close-modal');
    }
    watch(()=>props.items, (newValue) => {
      filteredItems.value = newValue;
    }, { deep: true });

    return {
      searchText,
      filteredItems,
      filterSeller,
      selectedItems,
      convertToCamelCase,
      closeModal
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/globals.scss";

#filter-flex-container {
  display: flex;
  max-width: $filter-container-width;
  min-width: $filter-container-width;
  background-color: pink;
  flex-direction: column;
}

.FilterDirectory-searchInput {
    margin: 0 20px 0 0;
    height: 30px;
    width: 170px;
    font-size: 15px;
    border: 1px solid #ccc;
    outline: none;
    text-transform: capitalize;
}
img{
  width: 14px;
    height: 14px;
    margin: 10px;
    cursor:pointer;
}
.modal {
  position: absolute;
  z-index: 10;
  max-height: 511px;
  min-height: 511px;
  max-width: 978px;
  min-width: 978px;
  background-color: white;
  align-items: start;
  top:55px;
  padding: 15px 0;
  box-shadow: 0 1px 8px rgba(0, 0, 0, .1);
  background: #fff;
  border: 1px solid #eaeaec;
  box-sizing: border-box;
}

.filter-search-flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 18px 12px;
}

.filter-list-list {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-height: 511px;
  min-height: 511px;
  flex-wrap: wrap;
  max-width: 954px;
  min-width: 954px;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: white;
  align-items: start;
  // margin: 0 0 0 20px;
  margin: 0 0 0 20px;
  padding-right: 20px;
  border:None;
}


.header-container {
  font-size: 16px;
  font-weight: 700;
  padding-top: 41px !important;
  border-right: none !important;
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


</style>


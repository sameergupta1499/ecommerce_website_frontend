<template>
  <div class="filter-modal-flex-container">
    <div class="modal">
      <div class="filter-search-flex-container">
        <input type="text" placeholder="Search" class="FilterDirectory-searchInput" v-model="searchText"
          @input="filterSeller" />
        <span>X</span>
      </div>
      <div class="filter-list-container">
        <!-- <ul class="filter-list-list modal">
          <div v-for="item in filteredItems" :key="item">
            <li class="filter-line-item">
              <input type="checkbox" :value="item" />
              <span class="item-text">{{ item }}</span>
            </li>
          </div>
        </ul> -->

        <ul class="list filter-list-list modal">
          <li v-for="item in filteredItems" :key="item" class="filter-line-item">
            <label class="common-customCheckbox vertical-filters-label">
              <input type="checkbox" :value="item" v-model="selectedItems">
              <span class="item-text">{{ item }}</span>
              <div class="common-checkboxIndicator"></div>
            </label>
          </li>
        </ul>



      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeList: {
      type: Array,
    },
  },

  setup(props) {
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
    



    return {
      searchText,
      filteredItems,
      filterSeller,
      selectedItems
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

.modal {
  position: absolute;
  z-index: 10;
  max-height: 511px;
  min-height: 511px;
  max-width: 978px;
  min-width: 978px;
  background-color: white;
  align-items: start;
  // top:55px;
  padding: 15px 0;
  box-shadow: 0 1px 8px rgba(0,0,0,.1);
    background: #fff;
    border: 1px solid #eaeaec;
    box-sizing: border-box;
}

.filter-search-flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.filter-list-list {
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  max-height: 511px;
  min-height: 511px;
  flex-wrap: wrap;
  max-width: 978px;
  min-width: 978px;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: white;
  align-items: start;
}
</style>


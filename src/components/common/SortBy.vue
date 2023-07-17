<template>
    <div class="horizontal-filters-sortContainer">
      <div class="sort-sortBy" @mouseover="showOptions = true" @mouseout="showOptions = false">
        Sort by: <span>{{ selectedOption }}</span>
        <span class=""></span>
        <ul class="sort-list" v-show="showOptions">
          <li>
            <label class="sort-label">
              <input type="radio" name="sort" value="popularity" v-model="selectedOption">
              Popularity
            </label>
          </li>
          <li>
            <label class="sort-label">
              <input type="radio" name="sort" value="discount" v-model="selectedOption">
              Better Discount
            </label>
          </li>
          <li>
            <label class="sort-label">
              <input type="radio" name="sort" value="price_desc" v-model="selectedOption">
              Price: High to Low
            </label>
          </li>
          <li>
            <label class="sort-label">
              <input type="radio" name="sort" value="price_asc" v-model="selectedOption">
              Price: Low to High
            </label>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const selectedOption = ref('popularity');
      const showOptions = ref(false);
  
      return {
        selectedOption,
        showOptions,
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
  .sort-sortBy{
    width:255px;
    position: relative;
    padding: 9px 14px;
    border-radius: 2px;
    border: 1px solid #d4d5d9;
    span{
        font-weight: 700;
    }
  }
  .sort-label{
    display: block;
    padding: 10px 20px;
  }
  .sort-list {
    display: none; /* Hide the list of options by default */
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
    display: block; /* Show the list of options when hovering over the "Sort by" element or when showOptions is true */
  }
  </style>
  
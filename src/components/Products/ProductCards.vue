<template>
  <div>
    <!-- Your ItemCard component template -->
      <p v-if="!productData">Loading...</p>
    <p v-else>{{ productData }}</p>
  </div>
</template>

<script>
import {  watch } from 'vue';

export default {
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // const productData = props.productData
    
    watch(()=>props.productData.count, (newValue, oldValue) => {
      console.log('newValuehere:', newValue); // Log the updated value of productData
      console.log('oldValuehere:', oldValue); // Log the previous value of productData
    },
    { deep: true });  //required for deep watch
    
    return { };
  }
}
</script>

<style lang="scss" scoped>
</style>

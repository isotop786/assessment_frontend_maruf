<template>
  <div class="container">
    <Bucket/>
    <hr>

    <Products/>
  </div>
</template>

<script>
import Bucket from '@/components/Bucket.vue'
import Products from '../components/Products.vue'
export default {
    name:'Dashboard',
    components:{
    Bucket,
    Products
}
}
</script>

<style>

</style>
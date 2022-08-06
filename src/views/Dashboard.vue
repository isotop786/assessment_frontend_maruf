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
import store from '../store/'
export default {
    name:'Dashboard',
    components:{
    Bucket,
    Products
},
beforeCreate(){
   if(this.$store.state.token ==null)
   {
        this.$router.push('/');
   }
}
}
</script>

<style>

</style>
<template>
  <div >
   <Nav/>
    <router-view/>
  
  </div>
</template>

<script>
import Nav from './components/Layout/Nav'
import Login from './components/Login.vue'


export default {
  name:'App',
  components:{
    Nav,
    Login
}


}
</script>

<style>

</style>

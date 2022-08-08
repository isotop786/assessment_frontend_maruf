<template>
<div class="row">
<div class="col-md-4"></div>
  <div class="col-md-4 text-center">
        <h4>Bucket Items</h4>
        <div v-if="items.length > 0">
            <button @click.prevent="clearBucket()" class="btn btn-danger my-3">Clear Bucket</button>

            <table class="table table-dark">
                <tr>
                    <td>Product</td>
                    <td>Quantity</td>
                </tr>
                <tr v-for="item in items" :key="item._id">
                    <td>{{item.product.name}}</td>
                    <td>{{item.quantity}}</td>
                </tr>
            </table>
        </div>
        

        <div v-else>No Products in Bucket</div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name:'Bucket',
    data(){
        return{
            URL:'https://assessment-backend-maruf.herokuapp.com/buckets',
            items:[],
            products:[],
            config : {headers:{'Content-Type':'application/json', 'Authorization': 'Bearer '+this.$store.state.token}},
            result:[],
            bucket_arr:[]

        }
    },
    computed:{
        ...mapGetters([
            'getBucketItem'
        ])
    },  

    created(){
         this.fetchData();
    },

    updated(){

    },


    methods:{
    
    fetchData(){
            var config = {
            headers:{
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer '+this.$store.state.token
                    },
            }


        axios.get('/buckets/',config)
        .then(res=>{
            
            this.$store.commit('CLEAR_BUCKET')
            this.items = res.data.item

            this.items.map(item=> {

                  this.$store.commit('SET_BUCKETPRODUCTS', item.product._id)
  
            })
  
        })
        },

        clearBucket(){
             var config = {
            headers:{
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer '+this.$store.state.token
                    },
            }

            axios.delete('/bucketsall/',config)
            .then((res)=>{
                
                this.$store.commit('CLEAR_BUCKET')
                this.$router.go();
            })
            .catch((err)=>console.log(err))
        }
    }
}
</script>

<style scoped>
    .bucket-list{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
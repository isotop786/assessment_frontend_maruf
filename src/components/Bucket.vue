<template>
<div class="row">
<div class="col-md-4"></div>
  <div class="col-md-4 text-center">
        <h4>Bucket Items</h4>
        <div v-if="products.length > 0">
            <button @click.prevent="clearBucket()" class="btn btn-danger my-3">Clear Bucket</button>
            <ul  class="list-group " >
                <li v-for="p in products" :key="p[0]._id" class="list-group-item">{{p[0].name}}</li>
                
            </ul>
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
        ;
    },


    methods:{
    
    fetchData(){
            var config = {
            headers:{
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer '+this.$store.state.token
                    },
            }

            var quanity_arr = []

        axios.get(this.URL,config)
        .then(res=>{
            console.log(res.data)
            this.items = res.data.item
            // console.log(this.items)
            

            this.items.map(item=>{
                quanity_arr.push(item.quantity)

                })

                var obj ={}

            this.items.map(item => {
                axios.get(`/products/${item.product}`,config)
                .then(res=>{

                    this.products.push(res.data.product)
                    
                    res.data.product.map((o,index)=>{
                        obj['id'] = o._id
                        obj['name'] = o.name;
                        obj['quantity'] = quanity_arr[index]

                    })

                   if(!this.$store.state.bucketProducts.includes(item.product))
                    {
                            this.$store.commit('SET_BUCKETPRODUCTS',item.product)
                            this.$store.commit('SET_BUCKET',obj)
                        
                    }

                    

                    
                })
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
                // this.fetchData()
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
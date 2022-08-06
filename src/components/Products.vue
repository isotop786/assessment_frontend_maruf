<template>
  <div class="my-4">
       <div class="row mb-4">
            <div class="col-md-12">
                <div class="form-row">
                <div class="form-group col-md-3">
                    <!-- <label for="">Product Type</label> -->
                    <select class="form-control" v-model="type">
                        <option value="book">Book</option>
                        <option value="game">Game</option>
                        <option value="music">Music</option>
                    </select>
                </div>
               <div class="form-group col-md-6">
                    <!-- <label for="">Product Name</label> -->
                   <input list="browsers" v-model="name" type="text" name="" class="form-control " placeholder="Search Products" @keyup.enter="search" id="">
                   <datalist id="browsers">
                        <option v-for="p in products" :key="p._id" :value="p.name"/>
                 </datalist>
               </div>
               <div class="form-group col-md-3">
                <!-- <label for=""></label> -->

                <button v-if="!loading" @click="search" class="btn btn-primary btn-block">Search</button>

                <div v-else>
                    <button class="btn btn-primary btn-block" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Searching...
                    </button>
                </div>
               </div>
                </div>
            </div>
       </div>

       <div v-if="products.length > 0"  class="row">
            <div v-for="product in products" :key="product._id" class="col-md-3">
                <div id="cont" class="card p-2 my-3" >
                    <img :src="product.image" class="card-img-top card-img" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{product.name}}</h5>
                        <p><strong>Category: </strong>{{product.type.toUpperCase()}}</p>
                        <p class="card-text">{{product.description.substring(0,50)+'...'}}</p>
                        
                        <div class="d-flex">
                            <button @click.prevent="launchModal(product._id,product.name,product.image)" class="btn btn-primary">Buy Now</button>
                           
                        </div>
                        
                    </div>
                    </div>
            </div>
       </div>

       <div v-if="products.length <1 && !isEmptyRes">
            <div class="d-flex justify-content-center mt-4">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
       </div>

       <div v-if="isEmptyRes" class="row">
            <h4>No Product Found</h4>
       </div>

       <!-- Bucket Modal -->
            <button style="display:none" type="button" id="modalBtn" class="btn btn-primary" data-toggle="modal" data-target="#bucketModal">
            </button>
        <div class="modal fade" id="bucketModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add to Bucket</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
             
                <table class="table">
                    <tr>
                        <td><img style="height: 80px;" class="img-thumbnail" :src="currentProductImage" alt=""></td>
                        <td>{{currentProductName}}</td>
                        <td>
                            <div class="d-flex">
                        <button @click="increase_quantity" class="btn btn-sm btn-primary"><strong>+</strong></button>
                        <span class="p-2 lead">{{quantity}}</span>
                        <button @click="decrease_quantity" class="btn btn-sm btn-warning"><strong>-</strong></button>
                    </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button id="closeBtn" type="button" @click.prevent="quantity=1" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button v-if="!isAddingBucket" type="button" @click.prevent="addToBucket" class="btn btn-success">Add To Bucket</button>
                <div v-else>
                    <button class="btn btn-primary btn-block" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Adding to Bucket...
                    </button>
                </div>
            </div>
            </div>
        </div>
        </div>
       <!-- Bucket Modal Ends -->

       <!-- Alert Modal -->

    <button style="display:none" type="button" id="alertBtn" class="btn btn-primary" data-toggle="modal" data-target="#alertModal">
            </button>
        <div class="modal fade" id="alertModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><span class="text-danger">Error</span></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p class="text-danger font-weight-bolder">
                    This product is already in the bucket, can not add again. Please add different product.
                </p>
            </div>
            <div class="modal-footer">
                <button id="closeBtn" type="button"  class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
       <!-- Alert Modal Ends -->
  </div>
</template>

<script>
import axios from 'axios'
import { debounce } from "lodash";

export default {
    name:'Products',
    data(){
        return{
            products:[],
            quantity:1,
            currentID: null,
            currentProductName: '',
            currentProductImage:'',
            config : {headers:{'Content-Type':'application/json', 'Authorization': 'Bearer '+this.$store.state.token}},
            type:'',
            name:'',
            loading:false,
            isEmptyRes: false,
            isAddingBucket:false,
        }
    },

    created(){
        this.fetchProducts()
    },

    methods:{
        async fetchProducts(){

            var config = {
            headers:{
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer '+this.$store.state.token
                    },
            }

            await axios.get('/products/',config)
            .then((res =>{
                this.products = res.data.product
            }))
        },
        increase_quantity(){
            this.quantity++
        },
        decrease_quantity(){
            if(this.quantity >1){
                this.quantity--;
            }
        },

        launchModal(id,name,image){
            this.currentID = id;
            this.currentProductName = name;
            this.currentProductImage = image

            if(this.$store.state.bucketProducts.includes(id))
            {
                // alert('This Product already exists in the bucket, can not add again')
                document.getElementById('alertBtn').click();
            }
            else{
                document.getElementById('modalBtn').click()
            }

        },

        addToBucket()
        {
            this.isAddingBucket = true;
            axios.post('/buckets/',
            {
                quantity: this.quantity,
                product: this.currentID,
                user: this.$store.state.id
            }
            , this.config)
            .then(res =>{
                this.quantity =1;
                document.getElementById('closeBtn').click();
                this.isAddingBucket = false

                this.$router.go();
                
            })
            .catch(err=>{
                console.log("Error is "+err)
            })
        },

        // search method
        search(){

            var config = {
            headers:{
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer '+this.$store.state.token
                    },
            }
            this.loading = true;
            this.isEmptyRes = false;
            this.products = [];
            axios.post('/products/search?name='+this.name+'&type='+this.type, config)
            .then(res=>{
                this.products = res.data.product
                this.loading = false;

                if(res.data.product.length ==0)
                {
                    this.isEmptyRes = true
                }
            })
            .catch(err => console.log('Searching error is :'+err))
        }
    }
}
</script>

<style scoped>

@media(min-width: 480px)
{
    .card-img{
        /* width: 16rem!important; */
        height: 30vh!important;
    }
}

    

    @media (min-width:480px){
    #cont{
     transition: transform .5s, filter 1.5s ease-in-out;
    filter: grayscale(30%);
}

    #cont:hover{
        filter: grayscale(0);
        transform: scale(1.1);
    }
    }


</style>
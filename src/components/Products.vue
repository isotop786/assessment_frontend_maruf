<template>
  <div class="my-4">
       <div class="row mb-4">
            <div class="col-md-12">
                <input type="text" name="" class="form-control" placeholder="Search Products" id="">
            </div>
       </div>

       <div class="row">
            <div v-for="product in products" :key="product._id" class="col-md-3">
                <div id="cont" class="card p-2 card-img" >
                    <img :src="product.image" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{product.name}}</h5>
                        <p><strong>Category: </strong>{{product.type.toUpperCase()}}</p>
                        <p class="card-text">{{product.description.substring(0,100)+'...'}}</p>
                        
                        <div class="d-flex">
                            <button @click.prevent="launchModal(product._id,product.name,product.image)" class="btn btn-primary">Buy Now</button>
                           
                        </div>
                        
                    </div>
                    </div>
            </div>
       </div>

       <!-- Modal -->
       <!-- Button trigger modal -->
            <button style="display:none" type="button" id="modalBtn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            </button>

    <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button type="button" @click="quantity=1" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
       <!-- Modal Ends -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Products',
    data(){
        return{
            products:[],
            quantity:1,
            currentID: null,
            currentProductName: '',
            currentProductImage:'',
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

            document.getElementById('modalBtn').click()
        }
    }
}
</script>

<style scoped>

@media(min-width: 480px)
{
    .card-img{
        width: 16rem!important
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
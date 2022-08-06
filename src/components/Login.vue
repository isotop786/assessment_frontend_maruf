<template>
  <div class="formBody">
        <div class="col-md-4 my-4">
            <form action="#" @submit.prevent="login">
                <div class="form-group">
                    <label for="Login Name">Login Name</label>
                    <input  v-model="loginName" type="text" name="" class="form-control" :class="loginNameErr &&  'is-invalid'" id="">
                        <div v-if="loginNameErr" id="validationServer05Feedback" class="invalid-feedback">
                            Login Name can not be empty.
                        </div>
                </div>
                <div class="form-group">
                    <label for="Login Name">Password</label>
                    <input  v-model="password" type="password" name="" class="form-control" id="" :class="passwordErr &&  'is-invalid'" >
                    <div v-if="passwordErr" id="validationServer05Feedback" class="invalid-feedback">
                            Password can not be empty.
                    </div>
                </div>
                <div v-if="!loading">
                    <input type="submit" class="btn btn-block loginBtn" value="Login">
                </div>

                <div v-else>
                    <button class="btn btn-primary btn-block" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Login...
                    </button>
                </div>
            </form>
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            URL:'https://assessment-backend-maruf.herokuapp.com/auth/signin',
            loginName: 'test',
            password:'123456',
            loginNameErr: false,
            passwordErr: false,
            loading:false
        }
    },

    methods:{
        login(){
            if(this.loginName ==='')
            {
                this.loginNameErr = true;
                setTimeout(()=>{
                    this.loginNameErr = false
                },2000)
            }

            if(this.password ==='')
            {
                this.passwordErr = true;
                 setTimeout(()=>{
                    this.passwordErr = false
                },2000)
            }

            if(this.loginName !=='' && this.password !=='')
            {
                this.proceedTo_Login();
            }
        },

         proceedTo_Login(){
            this.loading = true
            //  axios.post('/auth/signin',{loginName:this.loginName, password:this.password})
            axios({method:"POST", url:"/auth/signin/", data:{loginName:this.loginName,password:this.password}, withCredentials: true})
            .then((res=>{
                console.log(res.data)

                this.$store.commit('SET_TOKEN', res.data.token)
                this.$store.commit ('SET_ID', res.data.user._id )
                this.$store.commit ('SET_ADMIN', res.data.user.isAdmin)
                this.$store.commit ('SET_USER', res.data.user)
                this.$store.commit ('SET_AUTH', true)

                this.$router.push('/dashboard')
            }))
            .then(()=> {
                this.loading =false;
            })
            .catch(err=>console.log(err))
        }
    }




}
</script>

<style>

.formBody{
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginBtn{
    background: #3C32FA!important;
    color:#fff!important;
}

</style>
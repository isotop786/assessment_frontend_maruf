<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="background: #3C32FA!important;">
                <router-link class="navbar-brand" to="/">RS2 Assessment Project</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li v-if="this.$store.state.isAuthenticated" class="nav-item active">
                                <router-link class="nav-link" to="/dashboard">Dashboard <span class="sr-only">(current)</span></router-link>
                        </li>
           
                    </ul>
                   
                   <ul class="navbar-nav ml-auto">
                        <li v-if="this.$store.state.isAuthenticated" class="nav-item active">
                            <button @click="logout" class="btn btn-sm btn-danger" >Logout</button>
                        </li>
                   </ul>
                </div>
                </nav>
    </div>
</template>

<script>
export default {
    name:'Nav',
    methods:{
        logout(){
            this.$store.commit('SET_AUTH', false)
            this.$store.commit('SET_TOKEN', null)

            sessionStorage.clear();
            
            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>
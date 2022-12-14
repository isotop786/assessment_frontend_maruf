import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'



Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
})],
  state: {
    token: null,
    id:null,
    user: {},
    isAdmin: false,
    isAuthenticated : false,
    bucketProducts:[],
    bucket:[]
    
  },
  getters: {

    getBucketItem: (state)=> {
      return state.bucket;
    },

    getAuth: (state) =>{
      if(state.isAuthenticated){
        return true
      }
      return false;
    }
  },
  mutations: {

    SET_TOKEN(state, token)
    {
      state.token = token
    },

    SET_ID(state, id)
    {
      state.id = id 
    },

    SET_ADMIN(state, payload)
    {
      state.isAdmin = payload
    },
    SET_USER(state, payload)
    {
      state.user = payload;
    },

    SET_AUTH(state, payload)
    {
      state.isAuthenticated = payload;
    },

    SET_BUCKETPRODUCTS(state, payload)
    {
          state.bucketProducts.push(payload);
    },

    CLEAR_BUCKET(state)
    {
      state.bucketProducts = [];
      state.bucket = [];
    },

    SET_BUCKET(state, payload)
    {
      state.bucket.push(payload)
    }
    
  },
  actions: {
  },
  modules: {
  },

})

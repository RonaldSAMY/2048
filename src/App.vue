<template>
  <div id="app" >
    
    <div v-if="!valid" class="overlay">
      <h1 style="color:white;padding-bottom:0">2048</h1>
      <div class="basicInput">
        UserName : <input type="text" v-model="user" /> 
        <br>
        <br>
        BoardType : <input type="text" v-model="board">
        <br>
        <br>
        <button type="submit" class="btn" @click="submition">submit</button>
      </div>
    </div>
    <h1 >2048</h1>
    <Management />
    <board />
    
  </div>
</template>

<script>
import Board from '@/components/board/board.vue'
import Management from '@/components/management/management.vue'
/* eslint-disable */
import store from '@/store/store';
export default {
  name: 'app',
  components: {
    Board,
    Management
  },
  data(){
    return{
      user:"Ronald",
      board:"",
      valid:true
    }
  },
  created(){
    this.user = store.state.user;
    this.board = store.state.board;
  },
  /*computed:{
    user:function(){
        return store.state.user
    },
    board:function(){
      return store.state.board
    }
  },*/
  methods:{
    submition(){
      if(this.user == ""){
        return
      }
      store.commit("setUser",this.user)
      this.valid = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.overlay{
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 95;
  background:rgba(44, 62, 80,1);
  top:0;
  left:0;
}
.basicInput{
  height: 100px;
  width: 50%;
  margin-left: auto;
  margin-right:auto;
  color: white;
  /*background: red;*/
  margin-top:100px;
}
.basicInput input{
    width: 165px;
    height: 30px;
    border: 0;
    border-radius: 5px;
    text-indent: 7px;
    font-style: oblique;
    font-size: 15px;
    outline: none;
}
button.btn{
  padding: 5px 10px;
    border-radius: 5px;
    font-size: 15px;
    background: black;
    color: silver;
    outline: 0;
    border: 1px solid
}
</style>

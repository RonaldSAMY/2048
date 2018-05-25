<template>
    <div>
        <div class="details">
            <span>Player : <b style="text-transform:Capitalize">{{user}}</b></span>
            
            <span class="timer">Score : {{points}}</span>
            
            <span class="timer">Time : {{timer.min}}:{{timer.sec}}</span>

            <span class="reset" @click="reset">Reset</span>

            <span class="reset" @click="leaderBoard">Leader Board</span>

            <span class="reset" @click="aiRun">Auto <span v-if="ai">Play</span> <span v-else>Stop</span></span>
        </div> 
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store/store';
import Http from '@/utils/http';
export default {
    name : "Management",
    data(){
        return{
            intervalLoop:""
        }
    },
    created(){    
        this.intervalLoop = setInterval(this.timerMeth,1000)
    },

    watch : {
        gameStatus:function(){
            window.clearInterval(this.intervalLoop)
            let minTosec = this.timer.sec+(this.timer.min*60)
            let user = this.user
            if(this.ai){
                user = "[AI]"+this.user
            }
            store.commit("setAi",false)
            if(!this.gameStatus){
                Http.addScore(user,this.points,minTosec)
                /*.then(
                    (res)=>{
                        console.log(res.data)
                    }
                ).catch(
                    (res)=>{
                        console.log(res.data)
                    }
                )*/
            }
            
            console.log('game over from management')
        }
    },
    computed : {
        points:function(){
            return store.state.points
        },
        user:function(){
            return store.state.user
        },
        timer:function(){
            return store.state.timer
        },
        ai:function(){
            return store.state.ai
        },
        gameStatus:function(){
            return store.state.gameStatus
        },
    },
    methods:{
        timerMeth:function(){
            if(this.user == null){
                return;
            }
            let sec = parseInt(this.timer.sec)
            let newSec = sec+1
            if(newSec == 60){
                let min = parseInt(this.timer.min)
                let newMin = min+1
                if(newMin<10){
                    newMin = "0"+newMin
                }
                this.timer.min = newMin
                newSec = 0
            }
            if(newSec<10){
                    newSec = "0"+newSec
            }
            this.timer.sec = newSec;
            store.commit("setTimer",this.timer)
            //console.log("called")
        },
        reset(){
            store.commit("setReseted",true)
        },
        leaderBoard(){

        },
        aiRun(){
            if(!this.ai){
                this.reset()
                store.commit("setAi",true)
            } else{
                store.commit("setAi",false)
            }
            
        }
    }
}
</script>

<style>
    .timer{
        padding-left: 20px
    }
    .reset{
        border: 1px solid #ccc;
        padding: 3px 10px;
        margin-left: 20px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>


<template>
    <div>
        <div class="details">
            <span>Player : <b>{{user}}</b></span>
            
            <span class="timer">Score : {{points}}</span>
            
            <span class="timer">Time : {{timer.min}}:{{timer.sec}}</span>
        </div> 
    </div>
</template>

<script>
/* eslint-disable */
import store from '@/store/store';
export default {
    name : "Management",
    data(){
        return{
            timer:{
                min : "00",
                sec : "00"
            }
        }
    },
    
    created(){    
        setInterval(this.timerMeth,1000)
    },

    computed : {
        points:function(){
            return store.state.points
        },
        user:function(){
            return store.state.user
        }
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
            console.log("called")
        }
    }
}
</script>

<style>
    .timer{
        padding-left: 20px
    }
</style>


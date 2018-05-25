<script>
/* eslint-disable */
import store from '@/store/store';
export default {
    name:"Board",
    data(){
        return{
            datas: [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ],
            pressed:"",
            gameOver:false,
            addNumberPermission:false,
            keyEvent:"",
            aiTrick:false,
            trickyDir:"",
            trickyDirPoints:[]
        }
    },
    methods:{
        events:function(e){
            //this.addNumberPermission = false;
            switch(e.key){
                case "ArrowUp":
                    this.pressed = "Up"
                    this.datas = this.rereverse()
                    this.main()
                    this.datas = this.rereverse()
                    break;
                case "ArrowDown":
                    this.pressed = "Down"
                    this.datas = this.rereverse()
                    this.main(1)
                    this.datas = this.rereverse()
                    break;
                case "ArrowLeft":
                    this.pressed = "Left"
                    this.main()
                    break;
                case "ArrowRight":
                    this.main(1)
                    this.pressed = "Right"
                    break;
                default:
                    break;
            }
            if(!this.aiTrick){
                console.log("I am going "+e.key)
            }
            let empty = this.datas;
            this.datas = []
            this.datas = empty
            return true
        },

        // Function to add a number
        addNumber(){
            let initArray = [];
            for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                    if(this.datas[i][j] == 0){
                        initArray.push(
                            {
                                row:i,
                                col:j
                            }
                        )
                    }
                }
            }
            if(initArray.length == 0){
                this.gameOver = true;
                store.commit("setgameStatus",false)
                window.removeEventListener("keyup",this.events)
                return;
            }
            let place = initArray[Math.floor(Math.random()*initArray.length)]
            let val = Math.floor(Math.random())>=0.5 ? 4 : 2
            this.datas[place.row][place.col] = 2
        },
        // Function to slide
        slide(data,reverse=0){
           let orderd = data.filter(val=>val)
           let missingcount = 4-orderd.length;
           for(let i=0;i<missingcount;i++){
               orderd.push(0)
           }
           if(reverse){
               orderd =  orderd.reverse()
           }
            return orderd
        },

        // Function to addition
        addition(data){
            //data = [2,2,0,0]
            for(let i=0;i<3;i++){
                if(data[i]==data[i+1]){
                    data[i] = data[i] + data[i+1]
                    this.addPoint(data[i]) 
                    this.trickyDirPoints[this.trickyDir] += data[i] 
                    this.addNumberPermission = true
                    data[i+1] = 0
                }
            }
            return data
        },
        addPoint(point){
            if(this.ai){
                return true
            }
            console.log('Value added : '+point)
            store.commit('setPoints',this.points+point)
        },
        // Function Reorder
        rereverse(array = this.datas,arrayLength = 4){
            var newArray = [];
            for(let i = 0; i < array.length; i++){
                newArray.push([]);
            };

            for(let i = 0; i < array.length; i++){
                for(var j = 0; j < arrayLength; j++){
                    newArray[j].push(array[i][j]);
                };
            };
            return newArray;
        },
        doubleReverse(data){
            let r1 = this.rereverse(data)
            this.rereverse(r1)
        },
        // Function Main
        main(reverse=0){
            for(let i=0;i<4;i++){
                this.datas[i] = this.slide(this.datas[i],reverse)
                this.datas[i] = this.addition(this.datas[i])
                this.datas[i] = this.slide(this.datas[i],reverse)
            }
            if(!this.aiTrick){
                this.addNumber()
            }
            return this.datas
        },
        addClass(val){
            return "columns val"+val
        },
        aiExecute(){
            let Keys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
            let place = this.aiTrickyMove()//
            let Callevents = {
                key: place
            }
            if(this.ai){
                if(this.events(Callevents)){
                    setTimeout(this.aiExecute,300)
                }
            }
        },
        aiTrickyMove(){
            console.log("Befor value : "+this.points)
            this.aiTrick = true;
            let Keys = ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]
            let Valarr = [];
            let beforTest = this.datas
            for(let i=0;i<Keys.length;i++){
                this.trickyDir = Keys[i]
                this.trickyDirPoints[this.trickyDir]=0
                let Callevents = {
                    key: Keys[i]
                }
                this.events(Callevents)
                this.datas = []
                this.datas = beforTest
            }
            this.aiTrick = false;
            let max = 0
            
            for(let j=0;j<4;j++){ 
                Valarr.push(this.trickyDirPoints[Keys[j]])
            }
            let val =  Math.max.apply(null,Valarr)
            max = val
           let index = Valarr.indexOf(val)
           console.log("After Expected value : "+(this.points+max))
           console.log("Value  Should Added : "+val)
           store.commit('setPoints',this.points+val)
           return Keys[index]
        }
    },
    watch:{
        reseted:function(){
            this.datas = []
             this.datas = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]
            this.addNumber()
            this.addNumber()
            store.commit("setReseted",false)
        },
        ai:function(){
            console.log(this.ai)
            this.aiExecute()
            //store.commit("setAi",true)
            //setInterval(this.ai,500)
        }
    },
    computed : {
        reseted:function(){
            return store.state.reseted
        },
        ai:function(){
            return store.state.ai
        },
        points:function(){
            return store.state.points
        },
        timer:function(){
            return store.state.timer
        },
        gameStatus:function(){
            return store.state.gameStatus
        }
    },
    created: function () {
       this.keyEvent =  window.addEventListener('keyup', this.events)
        this.addNumber()
        this.addNumber()
    },

}
</script>

<template>
    <div class="main" >
       <!-- <h2>Your Score : {{score}}</h2> -->
       <div v-if="!gameStatus" class="gameOver">
           <div class="content">
               <h2>Game Over</h2>
               <span>Points : <b>{{points}} pts</b></span>
               <span style="margin-left:20px">Time : <b>{{timer.min}} : {{timer.sec}}</b></span>
           </div>
       </div>
        <table v-on:Keyup.up="this.events" v-else>
            <tr v-for="(row,rkey) in datas" v-bind:key="rkey" class="rows" >
                <td v-for="(col,ckey) in row" v-bind:key="ckey" :class="addClass(col)">
                    <h5 v-if="col != 0">{{col}}</h5>
                </td>
            </tr>
        </table>
    </div>
</template>
<style>
    div.main{
        width: 50%;
        height: 500px;
        border: 1px solid #ccc;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
    }
    table{
        height: 100%;
        width: 100%;
        background: #CCC0B4
    }
    .rows{
         width: 100%;
        height: 25%;
        
    }
    .columns{
        width: 25%;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        transition: 400ms;
    }
    div.clear{
        clear: both;
    }
    td.val2{
        background-color: #EEE4DB
    }
    td.val4{
        background-color: #EDE0C9
    }
    td.val8{
        background-color: #F1B17D;
        color:white
    }
    td.val16{
        background-color: #F39568;
        color:white
    }
    td.val32{
        background-color: #F47C63;
        color:white
    }
    td.val64{
        background-color: #F45F43;
        color:white
    }
    td.val128{
        background-color: #ECCE78;
        color:white
    }
    td.val256{
        background-color: lightgreen;
        color:white
    }
    td.val512{
        background-color: lightblue;
        color:white
    }
    td.val1024{
        background-color: rgb(10, 25, 51);
        color:white
    }
    td.val2048{
        background-color: darkorange;
        color:white
    }
    h5{
        font-size: 25px;
        font-family: fantasy;
    }
    div.gameOver{
        background: #CCC0B4;
        height: 100%;
        width:100%;
    }
    div.gameOver div.content{
        padding-top: 50px;
    }
</style>
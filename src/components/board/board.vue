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
            score : 0
        }
    },
    methods:{
        events:function(e){
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
            let empty = this.datas;
            this.datas = []
            this.datas = empty
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
                console.log('game Over');
                return;
            }
            let place = initArray[Math.floor(Math.random()*initArray.length)]
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
                    this.score = store.state.points
                    this.score += data[i]
                    store.commit('setPoints',this.score)
                    data[i+1] = 0
                }
            }
            return data
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
            this.addNumber()
            return this.datas
        },
        addClass(val){
            return "columns val"+val
        }

    },
    
    created: function () {
        window.addEventListener('keyup', this.events)
        this.addNumber()
        this.addNumber()
    },

}
</script>

<template>
    <div class="main" v-on:Keyup.up="this.events">
       <!-- <h2>Your Score : {{score}}</h2> -->
        <table >
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
        background-color: #ECCB69;
        color:white
    }
    h5{
        font-size: 25px;
        font-family: fantasy;
    }
</style>
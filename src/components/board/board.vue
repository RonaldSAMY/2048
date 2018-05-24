<script>
export default {
    name:"Board",
    data(){
        return{
            initial:[
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ],
            datas: [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ],
            pressed:""
        }
    },
    methods:{
        events:function(e){
            switch(e.key){
                case "ArrowUp":
                    this.pressed = "Up"
                    this.rereverse()
                    this.main()
                    this.rereverse()
                    
                    break;
                case "ArrowDown":
                    this.pressed = "Down"
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
                    data[i+1] = 0
                }
            }
            return data
        },

        // Function Reorder
        rereverse(data = this.datas){
            let newArray = this.initial
            for(let row = 0;row<newArray.length;row++){
                for(let col=0;col<newArray.length;col++){
                    newArray[col][row] = this.datas[row][col]
                }
            }
            console.log('====================================');
            console.table(newArray);
            console.log('====================================');
            this.datas = newArray
            
            return newArray
            //return newArray;
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
        <table >
            <tr v-for="(row,rkey) in datas" v-bind:key="rkey" class="rows" >
                <td v-for="(col,ckey) in row" v-bind:key="ckey" class="columns">
                    <h5 v-if="col != 0">{{col}}</h5>
                </td>
            </tr>
        </table>

        <div>
            {{pressed}}
        </div>
    </div>
</template>
<style>
    div.main{
        width: 50%;
        height: 500px;
        border: 1px solid #ccc
    }
    table{
        height: 100%;
        width: 100%;
    }
    .rows{
         width: 100%;
        height: 25%;
        
    }
    .columns{
        width: 25%;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc
    }
    div.clear{
        clear: both;
    }
</style>

0 0 0 0
0 0 0 0
0 0 0 0
0 0 0 0


[[0,0,2,16],
[0,2,0,2],
[2,4,0,6],
[4,4,8,8]]
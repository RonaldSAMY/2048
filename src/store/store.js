import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        user : "Ronald",
        points : 0,
        board: 4,
        reseted:false,
        timer:{
            min : "00",
            sec : "00",
            mill: "00"
        },
        ai:false,
        gameStatus:true
    },
    getters : {
        getUser(state) {
            return state.user
        },
        getReseted(state) {
            return state.reseted
        },
        getPoints(state){
            return state.points
        },
        getBoard(state){
            return state.board
        },
        getTimer(state){
            return state.timer
        },
        getAi(state){
            return state.ai
        },
        getgameStatus(state){
            return state.gameStatus
        },
    },
    mutations : {
        setUser(state,user) {
            state.user = user
            return state
        },
        setPoints(state,points) {
            state.points = points
            return state
        },
        setBoard(state,board) {
            state.board = board
            return state
        },
        setTimer(state,timer) {
            state.board = timer
            return state
        },
        setAi(state,ai) {
            state.ai = ai
            return state
        },
        setgameStatus(state,gameStatus) {
            state.gameStatus = gameStatus
            return state
        },
        setReseted(state,reseted) {
            state.timer = {
                min : "00",
                sec : "00"
            }
            state.points = 0
            state.reseted = reseted
            state.gameStatus = true
            return state
        }
    }
})

export default store;
import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        user : null,
        points : 0,
        board: 4
    },
    getters : {
        getUser(state) {
            return state.user
        },
        getPoints(state){
            return state.points
        },
        getBoard(state){
            return state.board
        }
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
        }
    }
})

export default store;
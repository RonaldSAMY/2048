/* eslint-disable */
import axios from "axios"
const Http = {
    addScore:(nickname,score,time)=>{
        let url = "https://leaderboard.lp1.eu/api/"+nickname+"/"+score+"/"+time;
        console.log(url)
        //return axios.get(url)
    }
}
export default Http;
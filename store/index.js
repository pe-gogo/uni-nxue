import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store  = new Vuex.Store({
	state:{
			isLogin:false,
			userInfo:{}
	},
	mutations:{
		//登录
		Login(state,res){
			state.isLogin = true
			state.userInfo = res
			console.log(res)
			uni.setStorage({
				key:'userInfo',
				data: res,
			})
		}
	},
	actions:{
		
	}
}) 
export default store
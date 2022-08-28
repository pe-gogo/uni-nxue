'use strict';
const crypto = require('crypto');
const jwt = require('jwt-simple');
const db = uniCloud.database();
const loginConfig = {
	appid: 'wx203502f4de1aa6bb',
	secret: 'ebb9b69005d7fd88957905ac573d44bd'
}
exports.main = async (event, context) => {
  //event为客户端上传的参数
	let data = {
		appid: loginConfig.appid,
		secret: loginConfig.secret,
		js_code: event.code,
		grant_type: 'authorization_code'
	};
	//向微信服务器提交code并接收openId和session_key
	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
	  method: 'GET',
	  data,
	  dataType: 'json'
	});
	
	const success = res.status === 200 && res.data && res.data.openid;
	
	if (!success) {
	  return {
	    status: -1,
	    msg: '微信登录失败'
	  }
	}
	
	const openId = res.data.openid
	const tonkenExp = 7200000;
	//当前时间
	let time = new Date().toUTCString();
	let tokenSecret = crypto.randomBytes(16).toString('hex'),
	token = jwt.encode(openId, tokenSecret);
	 
	let userInfo = {
		openId : res.data.openid,
		nickName : event.userInfo.nickName,
		avatarUrl : event.userInfo.avatarUrl,
		gender : event.userInfo.gender,
		city : event.userInfo.city,
		balance: '',
		couponNum: '',
		currentValue: '',
		giftBalance: '',
		level:'',
		pointNum:'',
		needValue:'',
		CreateTime: time,
		lastLoginTime : time
	}
	
	let userUpdate = {
		openId : res.data.openid,
		nickName : event.userInfo.nickName,
		avatarUrl : event.userInfo.avatarUrl,
		gender : event.userInfo.gender,
		city : event.userInfo.city,
		lastLoginTime : time
	}
	let userResult
	
	const userInDB = await db.collection('users').where({
	  openId
	}).limit(1).get();
	
	if (userInDB.data && userInDB.data.length === 0) {
	  userResult = await db.collection('users').add({
	    ...userInfo,
	    tokenSecret,
		exp:Date.now() + tonkenExp
	  });
	} else {
	  userResult = await db.collection('users').where({openId}).update({
		  ...userUpdate,
		  tokenSecret,
		  exp:Date.now() + tonkenExp
	  });
	}
	
	const fields = {
		openId:1,
		nickName : 1,
		avatarUrl : 1,
		balance: 1,
		couponNum: 1,
		currentValue: 1,
		giftBalance: 1,
		level:1,
		pointNum:1,
		needValue:1,
		gender:1
	};
	
	let ResultOK = await db.collection('users').where({openId}).field(fields).get();
	let ResultData = ResultOK.data[0];
  //返回数据给客户端
	if (userResult.id || userResult.updated === 1) {
	    return {
	      "status": 0,
		  "data": ResultData,
		  "token": token,
	      "msg": '登录成功'
	    }
	  }
	
	  return {
	    "status": -1,
	    "msg": '微信登录失败'
	  }
	
	
  
  
};

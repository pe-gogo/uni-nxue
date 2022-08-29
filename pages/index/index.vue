<template>
	<view class="container">
		<view class="banner">
			<image src="https://img-shop.qmimg.cn/s23107/2020/04/26/3eb7808bf105262604.jpg" mode="" class="bg"></image>
			<view class="intro">
				<view class="greet">您好，{{ isLogin ? member.nickname : '游客' }}</view>
				<view class="note">一杯奶茶，一口软欧包，在奈雪遇见两种美好</view>
			</view>
		</view>
		<view class="content">
			<view class="entrance">
				<view class="item" @tap="takein">
					<image src="/static/images/index/zq.png" class="icon"></image>
					<view class="title">自取</view>
				</view>
				<view class="item" @tap="takeout">
					<image src="/static/images/index/wm.png" class="icon"></image>
					<view class="title">外卖</view>
				</view>
			</view>
			<view class="info">
				<view class="integral-section">
					<view class="top">
						<text class="title">我的积分</text>
						<text class="value">411</text>
					</view>
					<view class="bottom">
							进入积分商城兑换奈雪券及周边好礼
					</view>
				</view>
				<view class="qrcode-section">
					<image src="../../static/images/index/qrcode.png"></image>
					<text>会员码</text>
				</view>
			</view>
			
			<view class="navigators">
				<view class="left">
					<view class="grid flex-column just-content-center">
						<view class="d-flex align-items-center">
							<image src="../../static/images/index/csc.png" class="mark-img"></image>
							<view class="font-size-sm text-color-base">奈雪的茶商城</view>
						</view>
						<view class="text-color-assist" style="margin-left: 40rpx; font-size: 20rpx"></view>
					</view>
					<view class="grid justify-content-end align-items-end ">
						<image src="../../static/images/index/yzclh.png" class="yzclh-img"></image>
					</view>
				</view>
				<view class="right">
					<view class="tea-activity" @tap="invite">
						<image src="/static/images/index/mcsb.png" class="mark-img"></image>
						<view>买茶送包</view>
						<view class="right-img">
							<image src="/static/images/index/mcsb_bg.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="member-gifts" @tap="packages">
						<image src="/static/images/index/hyjb.png" class="mark-img"></image>
						<view>会员劵包</view>
						<view class="right-img">
							<image src="/static/images/index/hyjb_bg.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import{mapState} from 'vuex'
	export default {
		data() {
			return {
			}
		},			
		computed:{
			...mapState(['isLogin','userInfo'])
		},
		methods: {
			takeout(){
					if(!this.isLogin){
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
			}
		}
	}
</script>

<style lang="scss">
	.banner{
		position: relative;
		width: 100%;
		height: 600rpx;
		.bg{
			height: 600rpx;
			width: 100%;
		}
		.intro{
			// 固定的
			position: absolute;
			display: flex;
			flex-direction: column;
			color: #ffffff;
			// location
			top: calc(50rpx + var(--status-bar-height));
			left: 40rpx;
			.greet{
				font-size: $font-size-lg;
				margin-bottom: 10rpx;
			}
			.note{
				font-size: $font-size-sm;
			}
		}
	}
	.content{
		padding: 0 30rpx;
	}
	
	.entrance{
		background-color: #FFFFFF;
		position: relative;
		margin-top: -80rpx;
		margin-bottom: 30rpx;
		border-radius: 10rpx;
		box-shadow: $box-shadow;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx 0;
		.item{
			position: relative;
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			&:nth-child(1):after {
				content: '';
				position: absolute;
				width: 1rpx;
				background-color: #ddd;
				right: 0;
				height: 100%;
				transform: scaleX(0.5) scaleY(0.8);
			}
			
			.icon{
				width: 84rpx;
				height: 84rpx;
				margin: 20rpx;
			}
			.title{}
			font-size: 30rpx;
			font-weight: 600;
			color: $text-color-base;
		}	
}
.info{
	position: relative;
	background-color: #FFFFFF;
	margin-bottom: 30rpx;
	padding: 30rpx;
	display: flex;
	align-items: center;
	border-radius: $border-radius-base;
	box-shadow: $box-shadow;
	.integral-section{
		flex: 1;
		flex-direction: column;
		justify-content: center;
		display: flex;
		.top{
			display: flex;
			align-items: center;
			.title{
				color: $text-color-base;
				font: $font-size-base;
				margin-right: 10rpx;
			}
			.value{
				font-size: 40rpx;
				font-weight: bold;
			}
		}
		.bottom{
			color: $text-color-assist;
			font-size: $font-size-sm;
			align-items: center;
		}
	}
	.qrcode-section{
		color: $color-primary;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-size-sm;
		
		image {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 10rpx;
		}
	}
}
	.navigators{
		width: 100%;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		background-color: #FFFFFF;
		box-shadow: $box-shadow;
		padding: 20rpx;
		display: flex;
		align-items: stretch;
		
		.left{
			width: 340rpx;
			margin-right: 20rpx;
			display: flex;
			padding: 0 20rpx;
			flex-direction: column;
			font-size: $font-size-sm;
			color: $text-color-base;
			background-color: #F2F2E6;
			.grid{
				height: 50%;
				display: flex;
			}
		}
		.mark-img{
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
		.yzclh-img{
			width: 214.86rpx;
			height: 122.96rpx;
			margin-top: 10rpx;
		}
		
		.right {
				width: 290rpx;
				display: flex;
				flex-direction: column;
				
				.tea-activity, .member-gifts {
					width: 100%;
					display: flex;
					padding: 20rpx;
					font-size: $font-size-sm;
					color: $text-color-base;
					align-items: center;
					position: relative;
				}
				
				.tea-activity {
					background-color: #FDF3F2;
					margin-bottom: 20rpx;
				}
				
				.member-gifts {
					background-color: #FCF6D4;
				}
				
				.right-img {
					flex: 1;
					position: relative;
					margin-left: 20rpx;
					margin-right: -20rpx;
					margin-bottom: -20rpx;
					display: flex;
					align-items: flex-end;
					
					image {
						width: 100%;
					}
				}
			
			
			.mark-img {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
			
			.yzclh-img {
				height: 122.96rpx;
				width: 214.86rpx;
			}
		}
		
	}
	
</style>

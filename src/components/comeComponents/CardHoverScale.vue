<template>
	<div class="box"><i></i></div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 240px;
	height: 240px;
	border-radius: 8px;
	box-sizing: border-box;
	margin: 100px auto;
	box-shadow: 0 0 15px 0 #ddedff;
	transition: all 0.3s;
	i {
		width: 100px;
		height: 100px;
		background-image: url(../assets/2.png);
		background-size: 100% 100%;
	}
	&:hover {
		transform: scale(1.2);
		i {
			width: 120px;
			height: 120px;
			background-image: url(../assets/3.png);
		}
	}
}
</style>

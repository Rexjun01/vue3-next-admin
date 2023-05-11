<template>
	<span class="text-mask">我是实现的效果</span>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.text-mask {
	-webkit-text-fill-color: transparent;
	-webkit-background-clip: text;
	background-clip: text;
	background-position: 45%;
	background-size: 1123px 400px;
	background-repeat: no-repeat;
	background-image: url(../assets/bg.jpg);
}
</style>

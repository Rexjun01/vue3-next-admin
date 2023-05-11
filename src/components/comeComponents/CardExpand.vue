<template>
	<div class="container">
		<div class="card">
			<img src="../assets/work.png" alt="Sora" class="card-img-top" />
			<div class="card-body">
				<h5 class="card-title">Sora</h5>
				<p class="card-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<a href="#" class="btn">More</a>
			</div>
		</div>
		<div class="card">
			<img src="../assets/work.png" alt="Umi" class="card-img-top" />
			<div class="card-body">
				<h5 class="card-title">Umi</h5>
				<p class="card-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<a href="#" class="btn">More</a>
			</div>
		</div>
		<div class="card">
			<img src="../assets/work.png" alt="Mori" class="card-img-top" />
			<div class="card-body">
				<h5 class="card-title">Mori</h5>
				<p class="card-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</p>
				<a href="#" class="btn">More</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.container {
	width: 1000px;
	display: flex;
	justify-content: space-between;

	.card {
		margin: 1em;

		.card-img-top {
			position: relative;
			z-index: 2;
			width: 302px;
			height: 222px;
			transform: translateY(52%);
			transition: 0.5s;
		}
		.card-body {
			z-index: 1;
			box-sizing: border-box;
			padding: 1.25em;
			height: 220px;
			background: white;
			box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.056), 0 6.7px 5.3px rgba(0, 0, 0, 0.081), 0 12.5px 10px rgba(0, 0, 0, 0.1),
				0 22.3px 17.9px rgba(0, 0, 0, 0.119), 0 41.8px 33.4px rgba(0, 0, 0, 0.144), 0 100px 80px rgba(0, 0, 0, 0.2);
			transform: translateY(-50%);
			transition: 0.5s;
		}
		.card-title {
			margin: 0 0 0.75em 0;
			font-size: 1.25em;
			font-weight: bold;
			line-height: 1.2;
		}
		.card-text {
			margin: 0 0 1em 0;
		}
		.btn {
			padding: 0.375em 0.75em;
			color: black;
			text-decoration: none;
			line-height: 1.5;
			border: 1px solid black;
			border-radius: 0.25em;
			transition: 0.5s;

			&:hover {
				color: white;
				background: black;
			}
		}
		&:hover {
			.card-img-top {
				transform: translateY(2%);
			}
			.card-body {
				transform: translateY(0);
			}
		}
	}
}
</style>

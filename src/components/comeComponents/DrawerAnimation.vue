<template>
	<div class="productWrap">
		<h2>产品功能</h2>
		<ul>
			<li>
				<h3>全景企业画像</h3>
				<p>CORPORATE PORTRAIT</p>
				<dl>
					<dt>全景企业画像</dt>
					<dd>企业数据</dd>
					<dd>企业舆情</dd>
					<dd>企业诚信</dd>
					<dd>企业关系</dd>
					<dd>企业图谱</dd>
				</dl>
			</li>
			<li>
				<h3>详尽债券资料</h3>
				<p>BOND INFORMATION</p>
				<dl>
					<dt>详尽债券资料</dt>
					<dd>债权担保</dd>
					<dd>债券数据</dd>
					<dd>债券风控</dd>
					<dd>地方债与城投</dd>
				</dl>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
ul,
li {
	list-style: none;
}
.productWrap {
	padding: 60px 0 80px;
	background: #f4f4f4;
	position: relative;

	h2 {
		font-size: 36px;
		font-weight: 500;
		text-align: center;
		color: #000;
		line-height: 50px;
		position: relative;
		margin: 0 0 40px;
		letter-spacing: 2px;
	}

	ul {
		overflow: hidden;
		width: 526px;
		height: 448px;
		display: flex;
		margin: 0 auto;
		li {
			width: 232px;
			height: 430px;
			position: relative;
			margin: 0 10px 0 0;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			padding-top: 258px;
			text-align: center;

			// ${Background}

			&:last-of-type {
				margin-right: 0;
			}

			h3 {
				font-size: 21px;
				font-family: PingFangSC, PingFangSC-Semibold;
				font-weight: 600;
				color: #111;
				line-height: 29px;
				letter-spacing: 1px;
				margin: 0 0 8px;
			}

			p {
				font-size: 12px;
				font-family: PingFangSC, PingFangSC-Light;
				font-weight: 300;
				text-align: center;
				color: rgba(17, 17, 17, 0.4);
				line-height: 17px;
			}

			dl {
				position: absolute;
				height: 100%;
				top: 428px;
				left: 0;
				right: 0;
				transition: 0.3s all;
				text-align: center;
				background: rgba(19, 114, 221, 0.85);
				color: #fff;
				padding: 73px 0 0;

				dt {
					font-size: 21px;
					line-height: 29px;
					letter-spacing: 1px;
					position: relative;
					margin: 0 0 36px;

					&:after {
						content: '';
						position: absolute;
						bottom: -20px;
						left: 50%;
						transform: translateX(-50%);
						width: 24px;
						height: 3px;
						background: #fff;
						border-radius: 3px;
					}
				}

				dd {
					margin: 0 0 12px;
					font-size: 16px;
					line-height: 24px;
				}
			}

			&:hover {
				h3,
				p {
					display: none;
				}

				dl {
					top: 0;
				}
			}
		}
	}
}
</style>

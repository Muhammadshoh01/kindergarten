<template>
	<aside>
		<el-menu class="el-menu-vertical-demo" :router="true">
			<el-menu-item
				v-for="(item, index) in menuLink"
				:key="index"
				:index="item.path"
			>
				<el-icon><component :is="item.icon" /></el-icon>
				<span>{{ item.title }}</span>
			</el-menu-item>
		</el-menu>
	</aside>
</template>

<script setup>
import { menuLink } from '../../router/menu'
</script>

<style lang="scss">
@import '@/styles/vars/colors.scss';
aside {
	width: 200px;
	background-color: white;
	height: 100%;

	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 15px;
	a {
		background-color: $silver;
		padding: 15px;
		border-radius: 5px;
		&.router-link-active {
			background-color: $green;
			color: #fff;
		}
	}
}
</style>

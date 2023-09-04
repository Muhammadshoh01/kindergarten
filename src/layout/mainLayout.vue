<template>
	<div class="main">
		<header-vue />
		<div class="wrapper">
			<aside-vue />
			<div class="content">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script setup>
import headerVue from '../components/layout/headerVue.vue'
import asideVue from '../components/layout/asideVue.vue'
</script>

<style lang="scss">
.main {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.wrapper {
		height: calc(100% - 52px);
		background-color: #ccc;
		display: flex;
	}
	.content {
		padding: 15px;
		overflow: auto;
		width: calc(100% - 200px);
	}
}
</style>

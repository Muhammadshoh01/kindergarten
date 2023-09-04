<template>
	<header class="header">
		<div class="logo">LOGO</div>
		<el-popconfirm title="Tizimdan chiqmoqchimisiz?" @confirm="exit">
			<template #reference>
				<el-button type="danger">
					<el-icon>
						<SwitchButton />
					</el-icon>
				</el-button>
			</template>
		</el-popconfirm>
	</header>
</template>

<script setup>
import { useAuthStore } from '../../stores/user/auth'
const authStore = useAuthStore()
const { logout } = authStore

const exit = () => {
	logout()
}
</script>

<style>
@import '@/styles/components/header.scss';
</style>

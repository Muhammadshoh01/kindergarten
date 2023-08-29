<template>
	<div class="reg">
		<div class="title">Ro'yxatdan o'tish</div>
		<el-form
			ref="reg"
			:model="user"
			:rules="rules"
			label-position="top"
			@submit.prevent="registr(reg)"
		>
			<el-form-item label="Loginni kiriting" prop="login">
				<el-input v-model="user.login" />
			</el-form-item>
			<el-form-item label="Parolni kiriting" prop="password">
				<el-input v-model="user.password" show-password />
			</el-form-item>
			<router-link to="/login">Akkauntingiz bormi ?</router-link>
			<el-button type="success" @click="registr(reg)">Kiritish</el-button>
		</el-form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/user/auth'
const user = ref({})
const reg = ref()
const rules = ref({
	login: [{ required: true, message: 'Loginni kiriting', trigger: 'blur' }],
	password: [
		{ required: true, message: 'Parolni kiriting', trigger: 'blur' },
		{
			min: 3,
			max: 15,
			message: "Parol kamida 3 ta belgidan iborat bo'lishi kerak",
			trigger: 'blur',
		},
	],
})
const authStore = useAuthStore()

const registr = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			authStore.registration({
				login: user.value.login,
				password: user.value.password,
			})
		} else {
			console.log('error submit!', fields)
		}
	})
}
</script>

<style></style>

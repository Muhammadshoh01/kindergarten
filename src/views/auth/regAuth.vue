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
				<el-input v-model="user.login" @blur="checkLogin" />
			</el-form-item>
			<el-form-item label="Parolni kiriting" prop="password">
				<el-input v-model="user.password" show-password />
			</el-form-item>
			<router-link to="/login">Akkauntingiz bormi ?</router-link>
			<el-button type="success" @click="registr(reg)" :disabled="status"
				>Kiritish</el-button
			>
		</el-form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/user/auth'
import { ElMessage } from 'element-plus'
const user = ref({})
const reg = ref()
const status = ref(false)
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

const checkLogin = async () => {
	let res = await authStore.checkLogin({
		login: user.value.login,
	})
	if (res.status == 200) {
		if (res.data == 'yes') {
			status.value = true
			ElMessage({
				type: 'warning',
				message: 'Bunday loginli foydalanuvchi mavjud',
			})
		}
		if (res.data == 'no') {
			status.value = false
		}
	}
}
</script>

<style></style>

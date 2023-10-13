import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { useTokenStore } from './token'
import { ElMessage } from 'element-plus'
import router from '../../router'
import cookies from 'vue-cookies'

export const useAuthStore = defineStore('auth', () => {
	const apiStore = useApiStore()
	const tokenStore = useTokenStore()
	const user = ref({})

	const setUser = (payload) => {
		user.value = payload
		cookies.set("bog'cha user", payload)
		router.push({ name: 'dashboard' })
	}

	const registration = async (payload) => {
		let res = await apiStore.postAxios({
			url: 'auth/reg',
			data: payload,
		})
		if (res.status == 201) {
			ElMessage({
				type: 'success',
				message:
					"Muvaffaqiyatli ro'yxatdan o'tdingiz.Iltimos tizimga login va parolingiz bilan kiring !",
			})
			router.push({ name: 'login' })
		}
	}

	const login = async (payload) => {
		let res = await apiStore.postAxios({
			url: 'auth/login',
			data: payload,
		})
		if (res.status == 200) {
			setUser(res.data.user)
			tokenStore.setToken(res.data.token)
		}
	}

	const logout = () => {
		tokenStore.setToken('')
		setUser({})
		cookies.remove("bog'cha-token")
		cookies.remove("bog'cha user")

		router.push({ name: 'login' })
		ElMessage({
			type: 'warning',
			message: 'Tizimdan chiqdingiz',
		})
	}

	const checkUser = async () => {
		if (cookies.isKey("bog'cha-token")) {
			tokenStore.setToken(cookies.get("bog'cha-token"))
		}
		let res = await apiStore.getAxios({
			url: 'auth/checkUser',
		})
		if (res?.status == 200) {
			user.value = res.data
			cookies.set("bog'cha user", res.data)
		}
	}

	const checkLogin = async (payload) => {
		return await apiStore.postAxios({
			url: 'auth/checkLogin',
			data: payload,
		})
	}

	return { user, registration, login, setUser, checkUser, checkLogin, logout }
})

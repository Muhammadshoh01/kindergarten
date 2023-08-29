import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { ElMessage } from 'element-plus'
import router from '../../router'

export const useAuthStore = defineStore('auth', () => {
	const apiStore = useApiStore()

	const user = ref({})

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
		if (res.status == 201) {
			console.log(res.data)
		}
	}

	return { user, registration, login }
})

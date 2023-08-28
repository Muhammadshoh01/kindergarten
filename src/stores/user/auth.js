import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'

export const useAuthStore = defineStore('auth', () => {
	const apiStore = useApiStore()

	const user = ref({})

	const registration = async (payload) => {
		let res = await apiStore.postAxios({
			url: 'auth/reg',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
		}
	}

	const login = async (payload) => {
		let res = await apiStore.postAxios({
			url: 'auth/login',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
		}
	}

	return { user, registration, login }
})

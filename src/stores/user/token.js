import { defineStore } from 'pinia'
import { ref } from 'vue'
import cookie from 'vue-cookies'

export const useTokenStore = defineStore('token', () => {
	const token = ref('')
	const header = ref({})

	const setToken = (payload) => {
		cookie.set("bog'cha token", payload)
		token.value = payload
		header.value = {
			headers: {
				authorization: `Bearer ${payload}`,
			},
		}
	}

	return { token, header, setToken }
})

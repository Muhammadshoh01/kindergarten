import axios from 'axios'
import { defineStore } from 'pinia'
import { useHelperStore } from '.'
import { useTokenStore } from '../user/token'
import { ElMessage } from 'element-plus'
import router from '../../router'

export const useApiStore = defineStore('api', () => {
	const helperStore = useHelperStore()
	const { url } = helperStore

	const tokenStore = useTokenStore()
	// const { header } = tokenStore

	const getAxios = async (payload) => {
		console.log({ ...tokenStore.header })
		return await axios
			.get(`${url}/${payload.url}`, { ...tokenStore.header })
			.catch((e) => {
				if (e.response?.status == 401) {
					router.push({ name: 'login' })
					ElMessage({
						type: 'error',
						message: "Sizga ruxsat yo'q",
					})
					return false
				}
			})
	}

	const postAxios = async (payload) => {
		return await axios
			.post(`${url}/${payload.url}`, payload.data, { ...tokenStore.header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data?.message,
				})
			})
	}

	const putAxios = async (payload) => {
		return await axios
			.put(`${url}/${payload.url}`, payload.data, { ...tokenStore.header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data?.message,
				})
			})
	}

	const deleteAxios = async (payload) => {
		return await axios
			.get(`${url}/${payload.url}`, { ...tokenStore.header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data?.message,
				})
			})
	}

	return { getAxios, putAxios, postAxios, deleteAxios }
})

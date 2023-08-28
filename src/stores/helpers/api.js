import { axios } from 'axios'
import { defineStore } from 'pinia'
import { useHelperStore } from '.'
import { useTokenStore } from '../user/token'
import { ElMessage } from 'element-plus'

export const useApiStore = defineStore('api', () => {
	const helperStore = useHelperStore()
	const { url } = helperStore

	const tokenStore = useTokenStore()
	const { header } = tokenStore

	const getAxios = async (payload) => {
		return await axios
			.get(`${url}/${payload.url}`, { ...header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data,
				})
			})
	}

	const postAxios = async (payload) => {
		return await axios
			.post(`${url}/${payload.url}`, payload.data, { ...header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data,
				})
			})
	}

	const putAxios = async (payload) => {
		return await axios
			.put(`${url}/${payload.url}`, payload.data, { ...header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data,
				})
			})
	}

	const deleteAxios = async (payload) => {
		return await axios
			.get(`${url}/${payload.url}`, { ...header })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data,
				})
			})
	}

	return { getAxios, putAxios, postAxios, deleteAxios }
})

import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { useHelperStore } from '.'
import { useTokenStore } from '../user/token'
import { ElMessage } from 'element-plus'
import router from '../../router'

export const useApiStore = defineStore('api', () => {
	const helperStore = useHelperStore()
	const { url } = helperStore

	const tokenStore = useTokenStore()
	const { header } = storeToRefs(tokenStore)

	const getAxios = async (payload) => {
		return await axios
			.get(`${url}/${payload.url}`, { ...header.value })
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
			.post(`${url}/${payload.url}`, payload.data, { ...header.value })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data?.message,
				})
			})
	}

	const putAxios = async (payload) => {
		return await axios
			.put(`${url}/${payload.url}`, payload.data, { ...header.value })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data?.message,
				})
			})
	}

	const deleteAxios = async (payload) => {
		return await axios
			.delete(`${url}/${payload.url}`, { ...header.value })
			.catch((e) => {
				ElMessage({
					type: 'error',
					message: e.response.data?.message,
				})
			})
	}

	const downloadFile = (link) => {
		axios({
			url: `${url}/${link}`,
			method: 'GET',
			responseType: 'blob',
		}).then((response) => {
			let fileUrl = window.URL.createObjectURL(new Blob([response.data]))
			let fileLink = document.createElement('a')
			fileLink.href = fileUrl
			fileLink.setAttribute('download', link)
			document.body.append(fileLink)
			fileLink.click()
		})
	}

	return { getAxios, putAxios, postAxios, deleteAxios, downloadFile }
})

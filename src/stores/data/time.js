import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useTimeStore = defineStore('time', () => {
	const times = ref([])
	const timesCount = ref(0)

	const apiStore = useApiStore()
	const { getAxios, postAxios, putAxios, deleteAxios } = apiStore

	// Barcha mahsulotlarni olib kelish
	const GET_ALL_TIMES = async () => {
		let res = await getAxios({
			url: 'time',
		})
		if (res.status == 200) {
			times.value = [...res.data.times]
			console.log(res.data)
			timesCount.value = res.data.count
		}
	}

	// yangi mahsulot qo'shish
	const ADD_NEW_TIME = async (payload) => {
		let res = await postAxios({
			url: 'time',
			data: payload,
		})
		if (res.status == 201) {
			console.log(res.data)
			times.value = [res.data, ...times.value]
			timesCount.value += 1
			ElMessage({
				type: 'success',
				message: "Yangi ovqat vaqti qo'shildi",
			})
		}
	}

	// ayni bir mahsulotni olib kelish
	const GET_TIME = async (payload) => {
		return await getAxios({
			url: `time/${payload}`,
		})
	}

	// mahsulotni tahrirlash
	const UPDATE_TIME = async (payload) => {
		let res = await putAxios({
			url: 'time',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
			times.value = times.value.map((time) => {
				if (time._id == res.data._id) return res.data
				return time
			})
			ElMessage({
				type: 'success',
				message: 'Ovqat vaqti yangilandi',
			})
		}
	}

	// mahsulotni o'chirish
	const DELETE_TIME = async (_id) => {
		let res = await deleteAxios({
			url: `time/${_id}`,
		})
		if (res.status == 200) {
			times.value = times.value.filter((time) => {
				if (time._id == _id) return false
				return time
			})
			timesCount.value -= 1
			ElMessage({
				type: 'success',
				message: "Ovqat vaqti o'chirildi",
			})
		}
	}

	// mahsulot holatini o'zgrtirish
	const STATUS_TIME = async (_id) => {
		let res = await getAxios({
			url: `time/change/${_id}`,
		})

		if (res.status == 200) {
			console.log(res.data)
			times.value = times.value.map((time) => {
				if (time._id == _id) {
					return { ...time, status: time.status == 0 ? 1 : 0 }
				}
				return time
			})
		}
	}

	const GET_EXCEL = async () => {
		return await getAxios({
			url: 'time/excel',
		})
	}

	return {
		times,
		timesCount,
		GET_ALL_TIMES,
		ADD_NEW_TIME,
		GET_TIME,
		UPDATE_TIME,
		DELETE_TIME,
		STATUS_TIME,
		GET_EXCEL,
	}
})

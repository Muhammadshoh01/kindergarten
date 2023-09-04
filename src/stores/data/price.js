import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { convertDate } from '../../func/data'

export const usePriceprodStore = defineStore('priceprod', () => {
	const priceprods = ref([])
	const priceprodsCount = ref(0)

	const apiStore = useApiStore()
	const { getAxios, postAxios, putAxios, deleteAxios } = apiStore

	// Barcha mahsulotlarni olib kelish
	const GET_ALL_PRICEPRODS = async (search) => {
		let res = await getAxios({
			url: 'priceprod',
			search,
		})
		if (res.status == 200) {
			console.log(res.data)
			priceprods.value = [
				...res.data.priceProducts.map((product) => {
					product.data = convertDate(product.data)
					return product
				}),
			]

			priceprodsCount.value = res.data.count
		}
	}

	// yangi mahsulot qo'shish
	const ADD_NEW_PRICEPROD = async (payload) => {
		let res = await postAxios({
			url: 'priceprod',
			data: payload,
		})
		if (res.status == 201) {
			console.log(res.data)
			priceprods.value = [res.data, ...priceprods.value]
			priceprodsCount.value += 1
			ElMessage({
				type: 'success',
				message: "Yangi mahsulot narxi qo'shildi",
			})
		}
	}

	// ayni bir mahsulotni olib kelish
	const GET_PRICEPROD = async (payload) => {
		return await getAxios({
			url: `priceprod/${payload}`,
		})
	}

	// mahsulotni tahrirlash
	const UPDATE_PRICEPROD = async (payload) => {
		let res = await putAxios({
			url: 'priceprod',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
			priceprods.value = priceprods.value.map((priceprod) => {
				if (priceprod._id == res.data._id) return res.data
				return priceprod
			})
			ElMessage({
				type: 'success',
				message: 'Mahsulot narxi yangilandi',
			})
		}
	}

	// mahsulotni o'chirish
	const DELETE_PRICEPROD = async (_id) => {
		let res = await deleteAxios({
			url: `priceprod/${_id}`,
		})
		if (res.status == 200) {
			priceprods.value = priceprods.value.filter((priceprod) => {
				if (priceprod._id == _id) return false
				return priceprod
			})
			priceprodsCount.value -= 1
			ElMessage({
				type: 'success',
				message: "Mahsulot narxi o'chirildi",
			})
		}
	}

	// mahsulot holatini o'zgrtirish
	const STATUS_PRICEPROD = async (_id) => {
		let res = await getAxios({
			url: `priceprod/change/${_id}`,
		})

		if (res.status == 200) {
			console.log(res.data)
			priceprods.value = priceprods.value.map((priceprod) => {
				if (priceprod._id == _id) {
					return { ...priceprod, status: priceprod.status == 0 ? 1 : 0 }
				}
				return priceprod
			})
		}
	}

	const GET_EXCEL = async () => {
		return await getAxios({
			url: 'priceprod/excel',
		})
	}

	return {
		priceprods,
		priceprodsCount,
		GET_ALL_PRICEPRODS,
		ADD_NEW_PRICEPROD,
		GET_PRICEPROD,
		UPDATE_PRICEPROD,
		DELETE_PRICEPROD,
		STATUS_PRICEPROD,
		GET_EXCEL,
	}
})

import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useProductStore = defineStore('product', () => {
	const products = ref([])
	const productsCount = ref(0)
	const units = ref(['kg', 'litr', 'dona', 'gr', 'ml'])

	const apiStore = useApiStore()
	const { getAxios, postAxios, putAxios, deleteAxios } = apiStore

	// Barcha mahsulotlarni olib kelish
	const GET_ALL_PRODUCTS = async () => {
		let res = await getAxios({
			url: 'product',
		})
		if (res.status == 200) {
			console.log(res.data)
			products.value = [...res.data.products]
			productsCount.value = res.data.count
		}
	}
	// Barcha aktiv mahsulotlarni olib kelish
	const GET_ALL_ACTIVE_PRODUCTS = async () => {
		let res = await getAxios({
			url: 'product/active',
		})
		if (res.status == 200) {
			console.log(res.data)
			products.value = [...res.data]
		}
	}

	// yangi mahsulot qo'shish
	const ADD_NEW_PRODUCT = async (payload) => {
		let res = await postAxios({
			url: 'product',
			data: payload,
		})
		if (res.status == 201) {
			console.log(res.data)
			products.value = [res.data, ...products.value]
			productsCount.value += 1
			ElMessage({
				type: 'success',
				message: "Yangi mahsulot qo'shildi",
			})
		}
	}

	// ayni bir mahsulotni olib kelish
	const GET_PRODUCT = async (payload) => {
		return await getAxios({
			url: `product/${payload}`,
		})
	}

	// mahsulotni tahrirlash
	const UPDATE_PRODUCT = async (payload) => {
		let res = await putAxios({
			url: 'product',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
			products.value = products.value.map((product) => {
				if (product._id == res.data._id) return res.data
				return product
			})
			ElMessage({
				type: 'success',
				message: 'Mahsulot yangilandi',
			})
		}
	}

	// mahsulotni o'chirish
	const DELETE_PRODUCT = async (_id) => {
		let res = await deleteAxios({
			url: `product/${_id}`,
		})
		if (res.status == 200) {
			products.value = products.value.filter((product) => {
				if (product._id == _id) return false
				return product
			})
			productsCount.value -= 1
			ElMessage({
				type: 'success',
				message: "Mahsulot o'chirildi",
			})
		}
	}

	// mahsulot holatini o'zgrtirish
	const STATUS_PRODUCT = async (_id) => {
		let res = await getAxios({
			url: `product/change/${_id}`,
		})

		if (res.status == 200) {
			console.log(res.data)
			products.value = products.value.map((product) => {
				if (product._id == _id) {
					return { ...product, status: product.status == 0 ? 1 : 0 }
				}
				return product
			})
		}
	}

	return {
		products,
		productsCount,
		units,
		GET_ALL_PRODUCTS,
		GET_ALL_ACTIVE_PRODUCTS,
		ADD_NEW_PRODUCT,
		GET_PRODUCT,
		UPDATE_PRODUCT,
		DELETE_PRODUCT,
		STATUS_PRODUCT,
	}
})

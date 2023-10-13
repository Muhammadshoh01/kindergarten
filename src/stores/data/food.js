import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { usePriceprodStore } from './price'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useFoodStore = defineStore('food', () => {
	const foods = ref([])
	const foodsCount = ref(0)

	const priceprodStore = usePriceprodStore()

	const apiStore = useApiStore()
	const { getAxios, postAxios, putAxios, deleteAxios } = apiStore

	// Barcha mahsulotlarni olib kelish
	const GET_ALL_FOODS = async () => {
		let res = await getAxios({
			url: 'food',
		})
		if (res.status == 200) {
			foods.value = [
				...res.data.foods.map((food) => {
					food.products.map((product) => {
						product.unit =
							priceprodStore.units[product.id.unit] || product.id.unit
						return product
					})
					return food
				}),
			]
			console.log(res.data)
			foodsCount.value = res.data.count
		}
	}

	// yangi mahsulot qo'shish
	const ADD_NEW_FOOD = async (payload) => {
		let res = await postAxios({
			url: 'food',
			data: payload,
		})
		if (res.status == 201) {
			console.log(res.data)
			foods.value = [res.data, ...foods.value]
			foodsCount.value += 1
			ElMessage({
				type: 'success',
				message: "Yangi ovqat qo'shildi",
			})
		}
	}

	// ayni bir mahsulotni olib kelish
	const GET_FOOD = async (payload) => {
		return await getAxios({
			url: `food/${payload}`,
		})
	}

	// mahsulotni tahrirlash
	const UPDATE_FOOD = async (payload) => {
		let res = await putAxios({
			url: 'food',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
			foods.value = foods.value.map((food) => {
				if (food._id == res.data._id) return res.data
				return food
			})
			ElMessage({
				type: 'success',
				message: 'Ovqat yangilandi',
			})
		}
	}

	// mahsulotni o'chirish
	const DELETE_FOOD = async (_id) => {
		let res = await deleteAxios({
			url: `food/${_id}`,
		})
		if (res.status == 200) {
			foods.value = foods.value.filter((food) => {
				if (food._id == _id) return false
				return food
			})
			foodsCount.value -= 1
			ElMessage({
				type: 'success',
				message: "Ovqat o'chirildi",
			})
		}
	}

	// mahsulot holatini o'zgrtirish
	const STATUS_FOOD = async (_id) => {
		let res = await getAxios({
			url: `food/change/${_id}`,
		})

		if (res.status == 200) {
			console.log(res.data)
			foods.value = foods.value.map((food) => {
				if (food._id == _id) {
					return { ...food, status: food.status == 0 ? 1 : 0 }
				}
				return food
			})
		}
	}

	const GET_EXCEL = async () => {
		return await getAxios({
			url: 'food/excel',
		})
	}

	return {
		foods,
		foodsCount,
		GET_ALL_FOODS,
		ADD_NEW_FOOD,
		GET_FOOD,
		UPDATE_FOOD,
		DELETE_FOOD,
		STATUS_FOOD,
		GET_EXCEL,
	}
})

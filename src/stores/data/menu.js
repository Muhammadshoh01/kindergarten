import { defineStore } from 'pinia'
import { useApiStore } from '../helpers/api'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useMenuStore = defineStore('menu', () => {
	const menus = ref([])
	const menusCount = ref(0)

	const apiStore = useApiStore()
	const { getAxios, postAxios, putAxios, deleteAxios } = apiStore

	// Barcha mahsulotlarni olib kelish
	const GET_ALL_MENUS = async () => {
		let res = await getAxios({
			url: 'menu',
		})
		if (res.status == 200) {
			menus.value = [...res.data.menus]
			console.log(res.data)
			menusCount.value = res.data.count
		}
	}

	// yangi mahsulot qo'shish
	const ADD_NEW_MENU = async (payload) => {
		let res = await postAxios({
			url: 'menu',
			data: payload,
		})
		if (res.status == 201) {
			console.log(res.data)
			menus.value = [res.data, ...menus.value]
			menusCount.value += 1
			ElMessage({
				type: 'success',
				message: "Yangi ovqat qo'shildi",
			})
		}
	}

	// ayni bir mahsulotni olib kelish
	const GET_MENU = async (payload) => {
		return await getAxios({
			url: `menu/${payload}`,
		})
	}

	// mahsulotni tahrirlash
	const UPDATE_MENU = async (payload) => {
		let res = await putAxios({
			url: 'menu',
			data: payload,
		})
		if (res.status == 200) {
			console.log(res.data)
			menus.value = menus.value.map((menu) => {
				if (menu._id == res.data._id) return res.data
				return menu
			})
			ElMessage({
				type: 'success',
				message: 'Ovqat yangilandi',
			})
		}
	}

	// mahsulotni o'chirish
	const DELETE_MENU = async (_id) => {
		let res = await deleteAxios({
			url: `menu/${_id}`,
		})
		if (res.status == 200) {
			menus.value = menus.value.filter((menu) => {
				if (menu._id == _id) return false
				return menu
			})
			menusCount.value -= 1
			ElMessage({
				type: 'success',
				message: "Ovqat o'chirildi",
			})
		}
	}

	// mahsulot holatini o'zgrtirish
	const STATUS_MENU = async (_id) => {
		let res = await getAxios({
			url: `menu/change/${_id}`,
		})

		if (res.status == 200) {
			console.log(res.data)
			menus.value = menus.value.map((menu) => {
				if (menu._id == _id) {
					return { ...menu, status: menu.status == 0 ? 1 : 0 }
				}
				return menu
			})
		}
	}

	const GET_EXCEL = async () => {
		return await getAxios({
			url: 'menu/excel',
		})
	}

	return {
		menus,
		menusCount,
		GET_ALL_MENUS,
		ADD_NEW_MENU,
		GET_MENU,
		UPDATE_MENU,
		DELETE_MENU,
		STATUS_MENU,
		GET_EXCEL,
	}
})

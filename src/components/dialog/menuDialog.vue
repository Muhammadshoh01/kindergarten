<template>
	<el-dialog
		v-model="toggle"
		:title="
			editToggle ? `${title}ni tahrirlash` : `Yangi ${title.toLowerCase()}`
		"
		width="40%"
		:before-close="handleClose"
	>
		<el-form
			ref="menuForm"
			:model="menu"
			:rules="rules"
			label-position="top"
			@submit.prevent="add(menuForm)"
		>
			<table class="el-table">
				<thead>
					<tr>
						<th>Taom nomi</th>
						<th>Taom vazni</th>
						<th>Sarflanadigan mahsulotlar</th>
					</tr>
				</thead>
				<tbody v-for="(item, index) in menu" :key="index">
					<tr>
						<td colspan="3">
							<h3 class="text-center">{{ item.time_title }}</h3>
						</td>
					</tr>
					<tr v-for="(food, food_index) in item.foods" :key="food_index">
						<td>
							<el-select v-model="food._id" @change="getFood(food._id)">
								<el-option
									v-for="product in foods"
									:key="product._id"
									:label="product.title"
									:value="product._id"
								/>
							</el-select>
						</td>
					</tr>
				</tbody>
			</table>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Bekor qilish</el-button>
				<el-button type="primary" @click="add(menuForm)"> Saqlash </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

import { useDialogStore } from '../../stores/useful/dialog'
import { useMenuStore } from '../../stores/data/menu'
import { useTimeStore } from '../../stores/data/time'
import { useFoodStore } from '../../stores/data/food'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(['title', 'id'])

const foodStore = useFoodStore()
const { GET_ALL_FOODS } = foodStore
const { foods } = storeToRefs(foodStore)

const dialogStore = useDialogStore()
const { toggle, editToggle } = storeToRefs(dialogStore)
const { setToggle, setEditToggle } = dialogStore

const menuStore = useMenuStore()
const { ADD_NEW_MENU, UPDATE_MENU, GET_MENU } = menuStore

const timeStore = useTimeStore()
const { GET_ALL_TIMES } = timeStore
const { times } = storeToRefs(timeStore)

const menu = ref([])
const menuForm = ref()

const rules = ref({
	title: [
		{ required: true, message: 'Mahsulot nomini kiriting', trigger: 'blur' },
	],
})

const add = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			if (editToggle.value) {
				UPDATE_MENU(menu.value)
			} else {
				ADD_NEW_MENU(menu.value)
			}
			formEl.resetFields()
			handleClose()
		} else {
			ElMessage.error("Barcha maydonlarni to'ldiring")
		}
	})
}

const getFood = (_id) => {
	console.log(_id)
	let food = foods.value.find((food) => {
		return food._id == _id
	})
	console.log(food)
}

const handleClose = () => {
	setToggle(false)
	setEditToggle(false)
	menu.value = []
}
onMounted(() => {
	GET_ALL_TIMES()
	GET_ALL_FOODS()
})

watch(editToggle, async () => {
	if (editToggle.value) {
		await GET_MENU(props.id).then((res) => {
			menu.value = { ...res.data }
		})
	}
})

watch(times, () => {
	if (times.value) {
		menu.value = times.value.map((time) => {
			return {
				time: time._id,
				time_title: time.title,
				foods: [
					{
						_id: '',
						nettos: '',
						products: [],
					},
				],
			}
		})
	}
})
</script>

<style></style>

<template>
	<el-dialog
		v-model="toggle"
		:title="
			editToggle ? `${title}ni tahrirlash` : `Yangi ${title.toLowerCase()}`
		"
		width="35%"
		:before-close="handleClose"
	>
		<el-form
			ref="foodForm"
			:model="food"
			:rules="rules"
			label-position="top"
			@submit.prevent="add(foodForm)"
		>
			{{ food }}
			<el-form-item label="Ovqat nomini kiriting" prop="title">
				<el-input v-model="food.title" />
			</el-form-item>
			<el-row :gutter="30" v-for="(item, index) in food.products" :key="index">
				<el-col :span="12">
					<el-form-item :label="index == 0 ? 'Mahsulotni tanlang' : ''">
						<el-select
							v-model="item.id"
							class="w-full"
							placeholder="Ro'yxatdan tanlang"
							@change="setChange(item.id, index)"
						>
							<el-option
								v-for="(item, index) in priceprods"
								:key="index"
								:label="item.product.title"
								:value="item.product._id"
							/>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label="index == 0 ? 'Mahsulot nettosi' : ''">
						<el-input
							class="w-full"
							v-maska
							data-maska="####"
							v-model="item.netto"
							@input="calc"
						>
							<template #append>{{ item.append }}</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<h3 v-if="food.price">
				Umumiy summa {{ food.price?.toLocaleString() }} so'm
			</h3>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Bekor qilish</el-button>
				<el-button type="primary" @click="add(foodForm)"> Saqlash </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDialogStore } from '../../stores/useful/dialog'
import { useFoodStore } from '../../stores/data/food'
import { usePriceprodStore } from '../../stores/data/price'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(['title', 'id'])

const priceprodStore = usePriceprodStore()
const { GET_ALL_PRICEPRODS } = priceprodStore
const { priceprods } = storeToRefs(priceprodStore)

const dialogStore = useDialogStore()
const { toggle, editToggle } = storeToRefs(dialogStore)
const { setToggle, setEditToggle } = dialogStore

const foodStore = useFoodStore()
const { ADD_NEW_FOOD, UPDATE_FOOD, GET_FOOD } = foodStore

const food = ref({
	products: [
		{
			id: '',
			netto: 0,
		},
	],
})
const foodForm = ref()
const rules = ref({
	title: [
		{ required: true, message: 'Ovqat nomini kiriting', trigger: 'blur' },
	],
})

const add = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			food.value.products = food.value.products.filter((item) => {
				if (item.id == '' || item.netto <= 0) return false
				return item
			})
			if (editToggle.value) {
				UPDATE_FOOD(food.value)
			} else {
				ADD_NEW_FOOD(food.value)
			}
			handleClose()
			formEl.resetFields()
		} else {
			ElMessage.error("Barcha maydonlarni to'ldiring")
		}
	})
}

const handleClose = () => {
	setToggle(false)
	setEditToggle(false)
	food.value = {
		products: [
			{
				id: '',
				netto: 0,
			},
		],
	}
}

const setChange = (_id, index) => {
	let item = priceprods.value.find((prod) => {
		return prod.product._id == _id
	})
	food.value.products[index].append = item.product.miniunit
	food.value.products[index].price =
		item.product.unit == item.product.miniunit ? item.price : item.price / 1000
}

// const getChange = () => {
// 	food.value.products.forEach((item) => {
// 		return item
// 	})
// }

const calc = () => {
	food.value.products = food.value.products.filter((item) => {
		if (item.id == '' || item.netto <= 0) return false
		return item
	})
	food.value.price = 0
	food.value.products.forEach((item) => {
		food.value.price += item.netto * item.price
	})

	if (food.value.products.at(-1).id && food.value.products.at(-1).netto > 0) {
		food.value.products.push({
			id: '',
			netto: 0,
		})
	}
}

onMounted(() => {
	GET_ALL_PRICEPRODS()
})

watch(editToggle, async () => {
	if (editToggle.value) {
		await GET_FOOD(props.id).then((res) => {
			console.log(res.data)
			food.value = { ...res.data }
			// calc()
			// getChange()
		})
	}
})
</script>

<style>
.el-input-number .el-input__inner {
	text-align: left;
}
.el-date-editor.el-input {
	width: 100%;
}
</style>

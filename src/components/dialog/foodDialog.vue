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
					<el-form-item label="Mahsulotni tanlang">
						<el-select
							v-model="item.id"
							class="w-full"
							placeholder="Ro'yxatdan tanlang"
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
					<el-form-item label="Mahsulot nettosi">
						<el-input
							class="w-full"
							v-maska
							data-maska="####"
							v-model="item.netto"
						>
							<template #append>gr</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
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
// import { useProductStore } from '@/stores/data/product'
import { usePriceprodStore } from '../../stores/data/price'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(['title', 'id'])

const priceprodStore = usePriceprodStore()
const { GET_ALL_PRICEPRODS } = priceprodStore
const { priceprods } = storeToRefs(priceprodStore)

// const productStore = useProductStore()
// const { GET_ALL_ACTIVE_PRODUCTS } = productStore
// const { products } = storeToRefs(productStore)

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
	product: [
		{ required: true, message: 'Mahsulot nomini tanlang', trigger: 'change' },
	],
	price: [
		{
			required: true,
			message: 'Mahsulot narxini kiriting',
			trigger: 'change',
		},
	],
})

const add = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
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
	food.value = {}
}

onMounted(() => {
	GET_ALL_PRICEPRODS()
})

watch(editToggle, async () => {
	if (editToggle.value) {
		await GET_FOOD(props.id).then((res) => {
			console.log(res.data)
			food.value = { ...res.data }
			food.value.product = food.value.product.title
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

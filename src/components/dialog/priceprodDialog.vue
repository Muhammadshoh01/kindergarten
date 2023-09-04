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
			ref="priceprodForm"
			:model="priceprod"
			:rules="rules"
			label-position="top"
			@submit.prevent="add(priceprodForm)"
		>
			<el-form-item label="Mahsulot nomi" prop="product">
				<el-select
					v-model="priceprod.product"
					class="w-full"
					placeholder="Ro'yxatdan tanlang"
				>
					<el-option
						v-for="(item, index) in products"
						:key="index"
						:label="item.title"
						:value="item._id"
					/>
				</el-select>
			</el-form-item>
			<el-form-item label="Mahsulot narxi" prop="price">
				<el-input-number
					:controls="false"
					class="w-full"
					v-model="priceprod.price"
				/>
			</el-form-item>
			<el-form-item label="Narx sanasini kiriting">
				<el-date-picker
					v-model="priceprod.data"
					type="date"
					placeholder="Sanani tanlang"
				/>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Bekor qilish</el-button>
				<el-button type="primary" @click="add(priceprodForm)">
					Saqlash
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useDialogStore } from '../../stores/useful/dialog'
import { usePriceprodStore } from '../../stores/data/price'
import { useProductStore } from '@/stores/data/product'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(['title', 'id'])

const productStore = useProductStore()
const { GET_ALL_ACTIVE_PRODUCTS } = productStore
const { products } = storeToRefs(productStore)

const dialogStore = useDialogStore()
const { toggle, editToggle } = storeToRefs(dialogStore)
const { setToggle, setEditToggle } = dialogStore

const priceprodStore = usePriceprodStore()
const { ADD_NEW_PRICEPROD, UPDATE_PRICEPROD, GET_PRICEPROD } = priceprodStore

const priceprod = ref({
	data: new Date(),
})
const priceprodForm = ref()
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
				UPDATE_PRICEPROD(priceprod.value)
			} else {
				ADD_NEW_PRICEPROD(priceprod.value)
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
	priceprod.value = {
		data: new Date(),
	}
}

onMounted(() => {
	GET_ALL_ACTIVE_PRODUCTS()
})

watch(editToggle, async () => {
	if (editToggle.value) {
		await GET_PRICEPROD(props.id).then((res) => {
			console.log(res.data)
			priceprod.value = { ...res.data }
			priceprod.value.product = priceprod.value.product.title
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

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
			ref="productForm"
			:model="product"
			:rules="rules"
			label-position="top"
			@submit.prevent="add(productForm)"
		>
			<el-form-item label="Mahsulot nomi" prop="title">
				<el-input v-model="product.title" />
			</el-form-item>
			<el-form-item label="Mahsulot birligi" prop="unit">
				<el-select v-model="product.unit" placeholder="Ro'yxatdan tanlang">
					<el-option
						v-for="(item, index) in units"
						:key="index"
						:label="item"
						:value="item"
					/>
				</el-select>
			</el-form-item>

			<el-form-item label="Mahsulot rasmi" prop="img">
				<el-upload
					v-model:file-list="product.img"
					:headers="headers"
					:action="`${url}/image/product`"
					list-type="picture-card"
					:limit="1"
					:before-upload="handleBefore"
					:on-preview="handlePreview"
				>
					<el-icon><Plus /></el-icon>
				</el-upload>
			</el-form-item>

			<el-dialog v-model="dialogVisible">
				<img w-full :src="dialogImageUrl" alt="Preview Image" />
			</el-dialog>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Bekor qilish</el-button>
				<el-button type="primary" @click="add(productForm)">
					Saqlash
				</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import cookies from 'vue-cookies'
import { useDialogStore } from '../../stores/useful/dialog'
import { useProductStore } from '../../stores/data/product'
import { useHelperStore } from '../../stores/helpers/index'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(['title', 'id'])

const helperStore = useHelperStore()
const { url } = storeToRefs(helperStore)

const dialogStore = useDialogStore()
const { toggle, editToggle } = storeToRefs(dialogStore)
const { setToggle, setEditToggle } = dialogStore

const productStore = useProductStore()
const { units } = storeToRefs(productStore)
const { ADD_NEW_PRODUCT, UPDATE_PRODUCT, GET_PRODUCT } = productStore

const product = ref({})
const productForm = ref()
const headers = { authorization: `Bearer ${cookies.get("bog'cha-token")}` }
const rules = ref({
	title: [
		{ required: true, message: 'Mahsulot nomini kiriting', trigger: 'blur' },
	],
	unit: [
		{
			required: true,
			message: 'Mahsulot birligini tanlang',
			trigger: 'change',
		},
	],
	img: [
		{ required: true, message: 'Mahsulot rasmini yuklang', trigger: 'blur' },
	],
})

const add = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			if (editToggle.value) {
				UPDATE_PRODUCT(product.value)
			} else {
				ADD_NEW_PRODUCT(product.value)
			}
			formEl.resetFields()
			handleClose()
		} else {
			ElMessage.error("Barcha maydonlarni to'ldiring")
		}
	})
}

const handleClose = () => {
	setToggle(false)
	setEditToggle(false)
	product.value = {}
}

const handleBefore = (file) => {
	console.log(file)
	if (file.size / 1024 > 500) {
		ElMessage({
			type: 'warning',
			message: 'Yuklanayotgan rasm hajmi 500kb dan oshmasin',
		})
		return false
	}
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handlePreview = (uploadFile) => {
	dialogImageUrl.value = uploadFile.url
	dialogVisible.value = true
}

watch(editToggle, async () => {
	if (editToggle.value) {
		await GET_PRODUCT(props.id).then((res) => {
			product.value = { ...res.data }
			console.log(product.value)
			if (product.value.img) {
				product.value.img[0].url = `${url.value}/${product.value.img[0].response}`
			}
		})
	}
})
</script>

<style></style>

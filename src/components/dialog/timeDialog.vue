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
			ref="timeForm"
			:model="time"
			:rules="rules"
			label-position="top"
			@submit.prevent="add(timeForm)"
		>
			<el-form-item label="Ovqat vaqti nomi" prop="title">
				<el-input v-model="time.title" />
			</el-form-item>
			<el-form-item label="Ovqat vaqti tartib raqami" prop="order">
				<el-input
					class="w-full"
					v-maska
					data-maska="####"
					v-model="time.order"
				/>
			</el-form-item>
		</el-form>

		<template #footer>
			<span class="dialog-footer">
				<el-button @click="handleClose">Bekor qilish</el-button>
				<el-button type="primary" @click="add(timeForm)"> Saqlash </el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

import { useDialogStore } from '../../stores/useful/dialog'
import { useTimeStore } from '../../stores/data/time'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const props = defineProps(['title', 'id'])

const dialogStore = useDialogStore()
const { toggle, editToggle } = storeToRefs(dialogStore)
const { setToggle, setEditToggle } = dialogStore

const timeStore = useTimeStore()

const { ADD_NEW_TIME, UPDATE_TIME, GET_TIME } = timeStore

const time = ref({})
const timeForm = ref()

const rules = ref({
	title: [
		{ required: true, message: 'Mahsulot nomini kiriting', trigger: 'blur' },
	],
	order: [
		{
			required: true,
			message: 'Mahsulot tartib raqamini kiriting',
			trigger: 'blur',
		},
	],
})

const add = async (formEl) => {
	if (!formEl) return
	await formEl.validate((valid) => {
		if (valid) {
			if (editToggle.value) {
				UPDATE_TIME(time.value)
			} else {
				ADD_NEW_TIME(time.value)
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
	time.value = {}
}

watch(editToggle, async () => {
	if (editToggle.value) {
		await GET_TIME(props.id).then((res) => {
			time.value = { ...res.data }
		})
	}
})
</script>

<style></style>

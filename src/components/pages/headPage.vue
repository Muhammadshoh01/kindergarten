<template>
	<section>
		<div class="headpage">
			<h1>{{ title }}lar</h1>
			<div class="d-flex">
				<el-button type="success" v-if="excel" @click="getExcel">
					<el-icon>
						<document />
					</el-icon>
					Excel
				</el-button>
				<el-button type="primary" @click="openModal"
					>Yangi {{ title.toLowerCase() }}</el-button
				>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useDialogStore } from '../../stores/useful/dialog'
defineProps(['title', 'excel'])
const emit = defineEmits(['excel'])

const dialogStore = useDialogStore()
const { setToggle } = dialogStore
const openModal = () => {
	setToggle(true)
}
const getExcel = () => {
	emit('excel')
}
</script>

<style lang="scss">
.headpage {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20px;
}
</style>

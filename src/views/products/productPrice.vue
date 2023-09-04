<template>
	<div>
		<head-page :title="title" :excel="true" @excel="downloadExcel" />
		<priceprod-table @edit="edit" />
		<priceprod-dialog :title="title" :id="editId" />
	</div>
</template>

<script setup>
import headPage from '@/components/pages/headPage.vue'
import { usePriceprodStore } from '@/stores/data/price'
import { useApiStore } from '../../stores/helpers/api'
import priceprodTable from '@/components/table/priceprodTable.vue'
import priceprodDialog from '@/components/dialog/priceprodDialog.vue'
import { ref, onMounted } from 'vue'

const priceprodStore = usePriceprodStore()
const { GET_ALL_PRICEPRODS, GET_EXCEL } = priceprodStore

const apiStore = useApiStore()
const { downloadFile } = apiStore

const title = ref('Narx')
const editId = ref('')

const edit = (id) => {
	editId.value = id
}
const downloadExcel = async () => {
	let res = await GET_EXCEL()
	if (res.status == 200) {
		downloadFile(res.data)
	}
}

onMounted(() => {
	GET_ALL_PRICEPRODS()
})
</script>

<style></style>

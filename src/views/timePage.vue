<template>
	<div>
		<head-page :title="title" />
		<time-table @edit="edit" />
		<time-dialog :title="title" :id="editId" />
	</div>
</template>

<script setup>
import headPage from '@/components/pages/headPage.vue'
import { useTimeStore } from '@/stores/data/time'
import timeTable from '@/components/table/timeTable.vue'
import timeDialog from '@/components/dialog/timeDialog.vue'
import { ref, onMounted } from 'vue'

const title = ref('Ovqat vaqt')
const timeStore = useTimeStore()
const { GET_ALL_TIMES } = timeStore

const editId = ref('')

const edit = (id) => {
	editId.value = id
}

onMounted(() => {
	GET_ALL_TIMES()
})
</script>

<style></style>

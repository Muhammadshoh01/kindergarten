<template>
	<div>
		<head-page :title="title" />
		<food-table @edit="edit" />
		<food-dialog :title="title" :id="editId" />
	</div>
</template>

<script setup>
import headPage from '@/components/pages/headPage.vue'
import { useFoodStore } from '@/stores/data/food'
import foodTable from '@/components/table/foodTable.vue'
import foodDialog from '@/components/dialog/foodDialog.vue'
import { ref, onMounted } from 'vue'

const title = ref('Ovqat')
const foodStore = useFoodStore()
const { GET_ALL_FOODS } = foodStore

const editId = ref('')

const edit = (id) => {
	editId.value = id
}

onMounted(() => {
	GET_ALL_FOODS()
})
</script>

<style></style>

<template>
	<div>
		<head-page :title="title" />
		<product-table @edit="edit" />
		<product-dialog :title="title" :id="editId" />
	</div>
</template>

<script setup>
import headPage from '@/components/pages/headPage.vue'
import { useProductStore } from '@/stores/data/product'
import productTable from '@/components/table/productTable.vue'
import productDialog from '@/components/dialog/productDialog.vue'
import { ref, onMounted } from 'vue'

const title = ref('Mahsulot')
const productStore = useProductStore()
const { GET_ALL_PRODUCTS } = productStore

const editId = ref('')

const edit = (id) => {
	editId.value = id
}

onMounted(() => {
	GET_ALL_PRODUCTS()
})
</script>

<style></style>

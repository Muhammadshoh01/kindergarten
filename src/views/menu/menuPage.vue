<template>
	<div>
		<head-page :title="title" />
		<menu-table @edit="edit" />
		<menu-dialog :title="title" :id="editId" />
	</div>
</template>

<script setup>
import headPage from '@/components/pages/headPage.vue'
import { useMenuStore } from '@/stores/data/menu'
import menuTable from '@/components/table/menuTable.vue'
import menuDialog from '@/components/dialog/menuDialog.vue'
import { ref, onMounted } from 'vue'

const title = ref('Menyu')
const menuStore = useMenuStore()
const { GET_ALL_MENUS } = menuStore

const editId = ref('')

const edit = (id) => {
	editId.value = id
}

onMounted(() => {
	GET_ALL_MENUS()
})
</script>

<style></style>

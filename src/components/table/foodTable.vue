<template>
	<div>
		<el-table :data="foods">
			<el-table-column type="index" label="N" />
			<el-table-column prop="product.title" label="Mahsulot nomi" />
			<el-table-column prop="price" label="Mahsulot narxi">
				<template #default="scope">
					{{ scope.row.price.toLocaleString() || '0' }} so'm
				</template>
			</el-table-column>
			<el-table-column prop="status" label="Mahsulot holati">
				<template #default="scope">
					<el-popconfirm
						title="Qaroringiz qat'iymi ?"
						@confirm="STATUS_FOOD(scope.row._id)"
					>
						<template #reference>
							<el-button :type="scope.row.status == 1 ? 'success' : 'danger'">
								<el-icon>
									<check v-if="scope.row.status == 1" />
									<close v-else />
								</el-icon>
							</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template #default="scope">
					<el-dropdown>
						<el-button>
							<el-icon>
								<more />
							</el-icon>
						</el-button>

						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="deleteFood(scope.row._id)">
									<el-icon>
										<delete />
									</el-icon>
									O'chirish
								</el-dropdown-item>
								<el-dropdown-item @click="editFood(scope.row._id)">
									<el-icon>
										<edit />
									</el-icon>
									Tahrirlash
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useFoodStore } from '@/stores/data/food'
import { useDialogStore } from '@/stores/useful/dialog'

const emit = defineEmits(['edit'])

const foodStore = useFoodStore()
const { STATUS_FOOD, DELETE_FOOD } = foodStore
const { foods } = storeToRefs(foodStore)

const dialogStore = useDialogStore()
const { setToggle, setEditToggle } = dialogStore

const deleteFood = (id) => {
	if (confirm("Qaroringiz qat'iymi?")) {
		DELETE_FOOD(id)
	}
}

const editFood = (id) => {
	emit('edit', id)
	setToggle(true)
	setEditToggle(true)
}
</script>

<style></style>

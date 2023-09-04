<template>
	<div>
		<el-table :data="priceprods">
			<el-table-column type="index" label="N" />
			<el-table-column prop="product.title" label="Mahsulot nomi" />
			<el-table-column prop="price" label="Mahsulot narxi">
				<template #default="scope">
					{{ scope.row.price.toLocaleString() || '0' }} so'm
				</template>
			</el-table-column>
			<el-table-column prop="data" label="Vaqt" />
			<el-table-column prop="status" width="80" label="Holati">
				<template #default="scope">
					<el-popconfirm
						title="Qaroringiz qat'iymi ?"
						@confirm="STATUS_PRICEPROD(scope.row._id)"
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
			<el-table-column align="right" width="100">
				<template #default="scope">
					<el-dropdown>
						<el-button>
							<el-icon>
								<more />
							</el-icon>
						</el-button>

						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="deletePriceprod(scope.row._id)">
									<el-icon>
										<delete />
									</el-icon>
									O'chirish
								</el-dropdown-item>
								<el-dropdown-item @click="editPriceprod(scope.row._id)">
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
import { usePriceprodStore } from '@/stores/data/price'
import { useDialogStore } from '@/stores/useful/dialog'

const emit = defineEmits(['edit'])

const priceprodStore = usePriceprodStore()
const { STATUS_PRICEPROD, DELETE_PRICEPROD } = priceprodStore
const { priceprods } = storeToRefs(priceprodStore)

const dialogStore = useDialogStore()
const { setToggle, setEditToggle } = dialogStore

const deletePriceprod = (id) => {
	if (confirm("Qaroringiz qat'iymi?")) {
		DELETE_PRICEPROD(id)
	}
}

const editPriceprod = (id) => {
	emit('edit', id)
	setToggle(true)
	setEditToggle(true)
}
</script>

<style></style>

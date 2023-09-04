<template>
	<div>
		<el-table :data="products">
			<el-table-column type="index" label="N" />
			<el-table-column prop="title" label="Mahsulot nomi">
				<template #default="scope">
					<div class="d-flex align-items-center">
						<el-image
							class="mr-1"
							style="width: 60px; height: 60px"
							:src="`${url}/${scope.row.img[0].response}`"
							fit="cover"
						/>
						<span>{{ scope.row.title }}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="unit" label="Mahsulot birligi" />
			<el-table-column prop="status" label="Mahsulot holati">
				<template #default="scope">
					<el-popconfirm
						title="Qaroringiz qat'iymi ?"
						@confirm="STATUS_PRODUCT(scope.row._id)"
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
								<el-dropdown-item @click="deleteProduct(scope.row._id)">
									<el-icon>
										<delete />
									</el-icon>
									O'chirish
								</el-dropdown-item>
								<el-dropdown-item @click="editProduct(scope.row._id)">
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
import { useProductStore } from '@/stores/data/product'
import { useHelperStore } from '@/stores/helpers'
import { useDialogStore } from '@/stores/useful/dialog'

const emit = defineEmits(['edit'])

const helperStore = useHelperStore()
const { url } = helperStore

const productStore = useProductStore()
const { STATUS_PRODUCT, DELETE_PRODUCT } = productStore
const { products } = storeToRefs(productStore)

const dialogStore = useDialogStore()
const { setToggle, setEditToggle } = dialogStore

const deleteProduct = (id) => {
	if (confirm("Qaroringiz qat'iymi?")) {
		DELETE_PRODUCT(id)
	}
}

const editProduct = (id) => {
	emit('edit', id)
	setToggle(true)
	setEditToggle(true)
}
</script>

<style></style>

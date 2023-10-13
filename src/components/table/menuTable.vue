<template>
	<div>
		<el-table :data="menus">
			<el-table-column type="index" label="N" />
			<el-table-column prop="title" label="Ovqat vaqti nomi" />
			<el-table-column prop="status" label="Holati" width="90" align="right">
				<template #default="scope">
					<el-popconfirm
						title="Qaroringiz qat'iymi ?"
						@confirm="STATUS_MENU(scope.row._id)"
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
								<el-dropdown-item @click="deleteMenu(scope.row._id)">
									<el-icon>
										<delete />
									</el-icon>
									O'chirish
								</el-dropdown-item>
								<el-dropdown-item @click="editMenu(scope.row._id)">
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
import { useMenuStore } from '@/stores/data/menu'
import { useDialogStore } from '@/stores/useful/dialog'

const emit = defineEmits(['edit'])

const menuStore = useMenuStore()
const { STATUS_MENU, DELETE_MENU } = menuStore
const { menus } = storeToRefs(menuStore)

const dialogStore = useDialogStore()
const { setToggle, setEditToggle } = dialogStore

const deleteMenu = (id) => {
	if (confirm("Qaroringiz qat'iymi?")) {
		DELETE_MENU(id)
	}
}

const editMenu = (id) => {
	emit('edit', id)
	setToggle(true)
	setEditToggle(true)
}
</script>

<style></style>

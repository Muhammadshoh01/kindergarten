import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
	const toggle = ref(false)
	const editToggle = ref(false)

	const setToggle = (payload) => {
		toggle.value = payload
	}

	const setEditToggle = (payload) => {
		editToggle.value = payload
	}
	return { toggle, editToggle, setToggle, setEditToggle }
})

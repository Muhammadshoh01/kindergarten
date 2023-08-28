import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHelperStore = defineStore('helper', () => {
	const url = ref('http://95.130.227.52:3010')

	return { url }
})

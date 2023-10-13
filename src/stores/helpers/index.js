import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHelperStore = defineStore('helper', () => {
	const url = ref('https://bogcha-back.bookblogs.uz')

	return { url }
})

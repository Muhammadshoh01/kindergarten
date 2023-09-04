const addZero = (num) => {
	if (num <= 9) {
		return `0${num}`
	}
	return num
}

export const convertDate = (date) => {
	let d = new Date(date)
	// 19:25 12.12.2023
	return `${addZero(d.getHours())}:${addZero(d.getMinutes())} ${addZero(
		d.getDate()
	)}.${addZero(d.getMonth() + 1)}.${d.getFullYear()}`
}

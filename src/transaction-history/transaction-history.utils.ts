export const validateValue = (value: number) => {
	return value >= 20.0 && value <= 10000.00
}

export const getCurrentYearMonthDateString = (date: Date) => {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')

	return `${year}/${month}/${day}`
}
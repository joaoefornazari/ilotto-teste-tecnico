export const validateEmail = (email: string) => {
	const regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	return regex.test(email);
}
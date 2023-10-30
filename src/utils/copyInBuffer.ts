export async function copyInBuffer(value: string): Promise<void> {
	await window.navigator.clipboard.writeText(value)
}

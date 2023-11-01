export async function copyToClipboard(value: string): Promise<void> {
	await window.navigator.clipboard.writeText(value)
}

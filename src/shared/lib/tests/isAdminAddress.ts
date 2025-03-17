import { Address } from 'viem'
const ADMIN_ADDRESSES: string[] = Array.from(
	new Set([
		'0xffb54219e8e4b0e08e5fa503edc1cf3080f73869',
		'0x5B694fF6592F77958621595F94bFFa05aC0724A1',
		'0x5040C7AC5D4b2E13b01e0d045f8b4eF37CA4Dea6',
		'0x239d5b78680e9ad600ab41e56508670ba9e78f51',
		'0x1ff551b110ecde2d7baba67a2ba2552455d7f6c4',
		'0x006734473b8ae6f50a2e42e28c9ca56f1bdc17aa',
		'0xdddd5f804b9d293dce8819d232e8d76381605a62',
		'0xe129d765458ca35b6406fa6cb3a7eca847696268',
		'0x55ad9b67a054d8ee6ffb1bae26555431d76d3ef6',
		'0x546060b9f58182ad21fba50bf78e71eaf3925b32',
		'0x0e71d5cff90abacd07be4f79ff245984e73edb08',
		'0x207da52a19bdde899f200989c04b4f62ad5176ef',
	]),
).map(addr => addr.toLowerCase().trim())

export const isAdminAddress = (address?: string | Address): boolean => {
	if (!address) return false
	const normalizedAddress = address?.toLowerCase().trim() ?? ''
	return ADMIN_ADDRESSES.includes(normalizedAddress)
}

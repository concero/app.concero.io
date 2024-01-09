import { type SetStateAction } from 'react'
import { fetchProtocolDataById } from '../../../api/concero/fetchProtocolDataById'

export async function getProtocolData(protocolName: string, setProtocolData: SetStateAction<any>) {
	try {
		const response = await fetchProtocolDataById(protocolName)
		setProtocolData(response[0])
	} catch (error) {
		console.error(error)
	}
}

import { LiFi } from '@lifi/sdk'

const lifiConfig = {
  integrator: 'concero',
  defaultrouteoptions: { fee: 0.002 },
  insurance: false,
}

export const lifi = new LiFi(lifiConfig)

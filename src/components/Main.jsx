import { Tonalities } from './Tonalities'
import { URL } from './URL'

export const Main = ({ selectedTab }) => (selectedTab === 0 && <Tonalities />) || (selectedTab === 1 && <URL />)

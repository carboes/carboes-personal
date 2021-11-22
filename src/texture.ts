import { CubeTextureLoader } from 'three'
import irNegX from './assets/img/irradiance/negX.jpg'
import irNegY from './assets/img/irradiance/negY.jpg'
import irNegZ from './assets/img/irradiance/negZ.jpg'
import irPosX from './assets/img/irradiance/posX.jpg'
import irPosY from './assets/img/irradiance/posY.jpg'
import irPosZ from './assets/img/irradiance/posZ.jpg'

export const loadTexture = () => {
  const loader = new CubeTextureLoader();
  return loader.load(
    [irPosX, irNegX, irPosY, irNegY, irPosZ, irNegZ]
  )
}
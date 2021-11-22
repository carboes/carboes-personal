import {
  CubeTextureLoader,
  Mesh,
  MeshPhysicalMaterial,
} from 'three'

import { IridescentMaterial } from './lib/IridescentMaterial'
import { ThinFilmFresnelMap } from './lib/ThinFilmFresnelMap'

import radImgX from './assets/img/radiance/negX.jpg'
import radImgY from './assets/img/radiance/negY.jpg'
import irNegX from './assets/img/irradiance/negX.jpg'
import irNegY from './assets/img/irradiance/negY.jpg'
import irNegZ from './assets/img/irradiance/negZ.jpg'
import irPosX from './assets/img/irradiance/posX.jpg'
import irPosY from './assets/img/irradiance/posY.jpg'
import irPosZ from './assets/img/irradiance/posZ.jpg'

const loadCubeMap = (images: any[]) =>
  new CubeTextureLoader().load([
    images[0],
    images[1],
    images[2] || images[0],
    images[3] || images[0],
    images[4] || images[1],
    images[5] || images[1],
  ])

export const assignHolographicMaterial = (mesh: Mesh) => {
  let material = new IridescentMaterial(
    loadCubeMap([irPosX, irNegX, irPosY, irNegY, irPosZ, irNegZ]),
    loadCubeMap([radImgX, radImgY]),
    new ThinFilmFresnelMap()
  )
  material.uniforms.roughness.value = 0.5
  mesh.material = material
}

export const assignBoxBaseShaderMaterialMatte = (mesh: Mesh, colorScalar = 1) => {
  mesh.material = new MeshPhysicalMaterial({
    color: (mesh.material as MeshPhysicalMaterial).color.multiplyScalar(
      colorScalar
    ),
    roughness: 0.4,
    metalness: 0.9,
    reflectivity: 0.9,
  })
}
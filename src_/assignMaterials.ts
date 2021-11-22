import {
  Color,
  CubeTextureLoader,
  Mesh,
  MeshPhysicalMaterial,
  PMREMGenerator,
  WebGLRenderer,
  Scene,
  CubeTexture,
} from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

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

import { ShaderType } from './types'

const loadCubeMap = (images: any[]) =>
  new CubeTextureLoader().load([
    images[0],
    images[1],
    images[2] || images[0],
    images[3] || images[0],
    images[4] || images[1],
    images[5] || images[1],
  ])

const assignHolographicMaterial = (mesh: Mesh) => {
  let material = new IridescentMaterial(
    loadCubeMap([irPosX, irNegX, irPosY, irNegY, irPosZ, irNegZ]),
    loadCubeMap([radImgX, radImgY]),
    new ThinFilmFresnelMap()
  )
  material.uniforms.roughness.value = 0.5
  mesh.material = material
}

const assignBoxBaseShaderMaterialMatte = (mesh: Mesh, colorScalar = 1) => {
  mesh.material = new MeshPhysicalMaterial({
    color: (mesh.material as MeshPhysicalMaterial).color.multiplyScalar(
      colorScalar
    ),
    roughness: 0.4,
    metalness: 0.9,
    reflectivity: 0.9,
  })
}

const assignBoxBaseShaderMaterial = (
  mesh: Mesh,
  colorScalar = 1,
  renderer: WebGLRenderer,
  color?: Color
) => {
  new RGBELoader().load(
    '/textures/satara_night_no_lamps_1k.hdr',
    hdrmap => {
      mesh.material = new MeshPhysicalMaterial({
        color:
          color ||
          (mesh.material as MeshPhysicalMaterial).color.multiplyScalar(
            colorScalar
          ),
        roughness: 0.08,
        metalness: 0.9,
        reflectivity: 0.1,
        envMap: new PMREMGenerator(renderer).fromCubemap(hdrmap as CubeTexture)
          .texture,
      })
      loaded = true
    },
    console.log,
    console.log
  )
}

export const assignMaterial = (
  mesh: Mesh,
  shaderType: ShaderType,
  renderer: WebGLRenderer
) => {
  switch (mesh.name) {
    case 'Box_Shell':
      if (shaderType === ShaderType.Holographic) {
        assignHolographicMaterial(mesh)
      }
      break
    case 'Box_Base':
    case 'Number_Plate_L':
    case 'Number_Plate_R':
      console.log(mesh.name, shaderType == ShaderType.Silver)
      if (shaderType == ShaderType.Silver) {
        assignBoxBaseShaderMaterial(mesh, 1, renderer)
      } else if (shaderType == ShaderType.Gold) {
        assignBoxBaseShaderMaterial(
          mesh,
          1,
          renderer,
          new Color('rgb(255, 175, 0)')
        )
      } else {
        assignBoxBaseShaderMaterialMatte(mesh)
      }
  }
}

let loaded = false
let mounted = false

export const setLoaded = (_loaded: boolean) => {
  loaded = _loaded
}

export const checkLoaded = (scene: Scene, gltf: GLTF) => {
  if (!loaded) {
    window.setTimeout(() => {
      checkLoaded(scene, gltf)
    }, 1000)
  } else {
    if (!mounted) {
      mounted = true
      scene.add(gltf.scene)
    }
  }
}

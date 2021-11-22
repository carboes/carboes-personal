import {
  WebGLRenderer,
  Scene,
  AnimationMixer,
  Mesh,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { ShaderType } from './types'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { assignMaterial, checkLoaded, setLoaded } from './assignMaterials'

export default (
  scene: Scene,
  path: string,
  shaderType: ShaderType,
  renderer: WebGLRenderer,
  mixers?: AnimationMixer[],
  animIndex?: number
) => {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/')
  loader.setDRACOLoader(dracoLoader)
  loader.load(path, gltf => {
    if (mixers) {
      //Apply animation
      const model = gltf.scene.children[0]

      const animation = gltf.animations[animIndex || 0] // TODO: check
      if (animation) {
        //model.position.copy(position);
        model.scale.set(0.05, 0.05, 0.05);
        const mixer = new AnimationMixer(model)
        mixers.push(mixer)

        const action = mixer.clipAction(animation)
        // TODO Auto play for now but have buttons triggering different animations in array.
        action.play()
      }
      scene.add(model)
    }

    gltf.scene.traverse(obj => {
      if (obj instanceof Mesh) {
        assignMaterial(obj, shaderType, renderer)
      }
      if (![ShaderType.Silver, ShaderType.Gold].includes(shaderType)) {
        setLoaded(true)
      }
      checkLoaded(scene, gltf)
    })
  })
}

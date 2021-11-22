import { PerspectiveCamera, WebGLRenderer } from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"

export default (renderer: WebGLRenderer, camera: PerspectiveCamera, composer: EffectComposer) => {
  window.addEventListener(
    'resize',
    () => {
      var width = window.innerWidth
      var height = window.innerHeight

      renderer.setSize(width, height)
      renderer.domElement.style.width = width + 'px'
      renderer.domElement.style.height = height + 'px'

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      composer.setSize(width, height)
    },
    false
  )
}

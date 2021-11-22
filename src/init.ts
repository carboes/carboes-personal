import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import THREE, { ACESFilmicToneMapping, AnimationMixer, Clock, PMREMGenerator, sRGBEncoding, Vector3, WebGLRenderer } from 'three'
import { loadCamera } from './camera'
import { loadLighting } from './lighting'
import { loadModels } from './models'
import Stats from 'three/examples/jsm/libs/stats.module'
import './styles.css'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

import { Scene } from 'three'
import { loadTexture } from './texture'
import { loadGround } from './ground'

type Options = {
  target?: Vector3,
  autoRotate?: boolean,
  stats?: boolean,
  cameraPosition?: Vector3
}

// TODO: Check out https://sbcode.net/threejs/gltf-animation/

export const init = (modelPath: string, options: Options) => {

  /* Scene & Background */
  const scene = new Scene()
  scene.background = loadTexture()
  //scene.add(new THREE.AxesHelper(5))
  const camera = loadCamera(options.cameraPosition)
  loadLighting(scene)
  loadGround(scene)

  /* Renderer */
  const renderer = new WebGLRenderer()
  renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  /* Room Environment */
  const environment = new RoomEnvironment()
  const pmremGenerator = new PMREMGenerator(renderer)
  scene.environment = pmremGenerator.fromScene(environment as unknown as Scene).texture
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.outputEncoding = sRGBEncoding

  /* Animation Set Up */
  const clock = new Clock()
  const mixers: AnimationMixer[] = []

  /* Controls */
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.target = options.target || new Vector3(0, 0, 0)
  controls.autoRotate = options.autoRotate!
  controls.enableZoom = true
  controls.enablePan = true

  /* Models */

  loadModels(scene, mixers, renderer, modelPath)

  const render = () => renderer.render(scene, camera)

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
  }, false)

  const stats = Stats()
  options.stats && document.body.appendChild(stats.dom)

  const start = () => {
    requestAnimationFrame(start)
    options.stats && stats.update()
    controls.update()
    render()

    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta()
      mixers.forEach(mixer => mixer.update(delta))
      render()
    })
  }
  return start()
}
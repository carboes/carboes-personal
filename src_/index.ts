import './styles.css'

import { AnimationMixer, Clock, Scene } from 'three'

import loadCamera from './camera'
import loadComposer from './composer'
import loadControls from './controls'
import loadLighting from './lighting'
import loadRenderer from './renderer'
import loadResizer from './resizer'
import loadModels from './models'
import { ShaderType } from './types'

window.onload = () => {
  const container = document.getElementById('webglcontainer')
  if (!container) {
    throw Error
  }
  const width = window.innerWidth
  const height = window.innerHeight

  const { shadertype, glb } = container.body.dataset
  if (!shadertype || !glb) {
    throw Error
  }
  const shaderType = shadertype as unknown as ShaderType

  const renderer = loadRenderer()
  const scene = new Scene()
  scene.background = null
  const camera = loadCamera(scene)

  container.appendChild(renderer.domElement)

  loadLighting(shaderType, scene)
  const controls = loadControls(camera, container)
  const composer = loadComposer(
    width,
    height,
    shaderType,
    scene,
    camera,
    renderer
  )

  const clock = new Clock()
  const mixers: AnimationMixer[] = []

  let animationIndex = 0

  const glbOverride = '/Rainbow_Test.glb'

  loadModels(scene, glbOverride, shaderType, renderer, mixers, animationIndex)

  const buttons = document.getElementsByTagName('button')
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons?.item(i)
    if (button) {
      button.onclick = () => {
        animationIndex = parseInt(button.dataset.animindex as string)
        alert(animationIndex)
        loadModels(scene, glbOverride, shaderType, renderer, mixers, animationIndex)
        
      }
    }
  }

  loadResizer(renderer, camera, composer)

  const render = () => {
    window.requestAnimationFrame(render)
    controls.update()
    composer.render()
  }
  render()

  renderer.setAnimationLoop(() => {
    update(clock, mixers)
    render()
  })
}

function update(clock: Clock, mixers: AnimationMixer[]) {
  const delta = clock.getDelta()
  mixers.forEach(mixer => mixer.update(delta))
}



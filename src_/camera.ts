import { PerspectiveCamera, Scene } from 'three'

export default (scene: Scene): PerspectiveCamera => {
  const camera = new PerspectiveCamera()
  camera.position.set(6.5, 3.5, 3)
  camera.zoom = 1.65
  camera.lookAt(0, 0.6, 0)
  camera.updateProjectionMatrix()
  scene.add(camera)
  return camera
}

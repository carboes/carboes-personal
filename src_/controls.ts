import { Camera } from 'three'
import { Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default (camera: Camera, container: HTMLElement): OrbitControls => {
  const controls = new OrbitControls(camera, container)
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  controls.enableZoom = false
  controls.enablePan = false
  controls.target = new Vector3(0, 0.6, 0)
  controls.update()
  return controls
}

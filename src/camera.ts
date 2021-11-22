import { PerspectiveCamera, Vector3 } from "three"

export const loadCamera = (vector?: Vector3) => {
  const {x, y, z} = vector || {x: 0, y: 3, z: 7}
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  )
  camera.position.set(x, y, z)
  return camera
}
import { ACESFilmicToneMapping, Vector2, WebGLRenderer } from 'three'

export default (): WebGLRenderer => {
  const renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setPixelRatio(window.devicePixelRatio || 1)
  const size = new Vector2()
  renderer.getDrawingBufferSize(size)
  renderer.setClearColor(0xffffff, 0)
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  return renderer
}

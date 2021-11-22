import { Scene } from 'three'
import { WebGLRenderer } from 'three'
import { Camera } from 'three'
import { LinearFilter, RGBAFormat, Vector2, WebGLRenderTarget } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass'
import { UnrealBloomPass } from './lib/UnrealBloomPass'
import { ShaderType } from './types'

const bloomParams = {
  exposure: 0.25,
  strength: 0.75,
  threshold: 0,
  radius: 1.2,
}

var parameters = {
  minFilter: LinearFilter,
  magFilter: LinearFilter,
  format: RGBAFormat,
  stencilBuffer: false,
}

export default (width: number, height: number, shaderType: ShaderType, scene: Scene, camera: Camera, renderer: WebGLRenderer): EffectComposer => {
  var renderTarget = new WebGLRenderTarget(width, height, parameters)

  // // Create effect composer
  const composer = new EffectComposer(renderer, renderTarget)
  composer.setSize(width, height)

  // // Add Passes
  composer.addPass(new RenderPass(scene, camera))

  var ssaaRenderPass = new SSAARenderPass(scene, camera, 0, 0)//0, 0?
  ssaaRenderPass.sampleLevel = 2
  ssaaRenderPass.unbiased = true
  composer.addPass(ssaaRenderPass)

  // Bloom
  composer.addPass(new UnrealBloomPass(
    new Vector2(width, height),
    bloomParams.strength,
    bloomParams.radius,
    bloomParams.threshold
  ))

  if (shaderType === ShaderType.CircuitBoard) {
    composer.addPass(new GlitchPass())
  }
  return composer
}

import { Color, MeshBasicMaterial, ShaderMaterial, Texture, Vector2, Vector3, WebGLRenderer, WebGLRenderTarget } from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
/**
 * Thanks to https://github.com/mrdoob/three.js/issues/14104#issuecomment-429664412 for this fragmentShaderfix
 *
 * UnrealBloomPass is inspired by the bloom pass of Unreal Engine. It creates a
 * mip map chain of bloom textures and blurs them with different radii. Because
 * of the weighted combination of mips, and because larger blurs are done on
 * higher mips, this effect provides good quality and performance.
 *
 * Reference:
 * - https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
 */
declare class TransparentBackgroundFixedUnrealBloomPass extends Pass {
    strength: number;
    radius: number;
    threshold: number;
    resolution: Vector2;
    clearColor: Color;
    renderTargetsHorizontal: any[];
    renderTargetsVertical: any[];
    nMips: number;
    renderTargetBright: WebGLRenderTarget;
    highPassUniforms: any;
    materialHighPassFilter: ShaderMaterial;
    separableBlurMaterials: any[];
    compositeMaterial: ShaderMaterial;
    bloomTintColors: Vector3[];
    copyUniforms: any;
    materialCopy: ShaderMaterial;
    _oldClearColor: Color;
    oldClearAlpha: number;
    basic: MeshBasicMaterial;
    fsQuad: Pass.FullScreenQuad;
    static BlurDirectionX: any;
    static BlurDirectionY: any;
    constructor(resolution: Vector2, strength: number, radius: number, threshold: number);
    dispose(): void;
    setSize(width: number, height: number): void;
    render(renderer: WebGLRenderer, writeBuffer: any, readBuffer: {
        texture: Texture;
    }, deltaTime: any, maskActive: any): void;
    getSeperableBlurMaterial(kernelRadius: number): ShaderMaterial;
    getCompositeMaterial(nMips: number): ShaderMaterial;
}
export { TransparentBackgroundFixedUnrealBloomPass as UnrealBloomPass };

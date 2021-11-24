import { Scene } from 'three';
import { WebGLRenderer } from 'three';
import { Camera } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
export declare const loadComposer: (width: number, height: number, scene: Scene, camera: Camera, renderer: WebGLRenderer) => EffectComposer;

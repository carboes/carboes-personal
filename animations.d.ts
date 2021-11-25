import { AnimationMixer, WebGLRenderer } from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
export declare const loadAnimations: (gltf: GLTF, mixers: AnimationMixer[], renderer: WebGLRenderer, autoplay?: boolean) => void;

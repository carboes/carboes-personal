import { WebGLRenderer } from "three";
import { Scene } from "three";
import { AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
export declare const setLoaded: (_loaded: boolean) => void;
export declare const checkLoaded: (scene: Scene, gltf: GLTF) => void;
export declare const loadModels: (scene: Scene, mixers: AnimationMixer[], renderer: WebGLRenderer, modelPath: string, compress?: boolean, soften?: boolean) => void;

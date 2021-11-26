import { Color, Mesh, WebGLRenderer } from 'three';
export declare const assignHolographicMaterial: (mesh: Mesh) => void;
export declare const assignMetalMaterial: (mesh: Mesh, colorScalar?: number) => void;
export declare const assignHDRMaterial: (mesh: Mesh, colorScalar: number | undefined, renderer: WebGLRenderer, color?: Color | undefined, staticPath?: string, opacity?: number) => void;

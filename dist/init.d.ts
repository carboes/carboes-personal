import { Vector3 } from 'three';
import './styles.css';
declare type Options = {
    target?: Vector3;
    autoRotate?: boolean;
    stats?: boolean;
    cameraPosition?: Vector3;
};
export declare const init: (modelPath: string, options: Options) => void;
export {};

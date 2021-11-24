import { Vector3 } from 'three';
declare type Options = {
    target?: Vector3;
    autoRotate?: boolean;
    stats?: boolean;
    cameraPosition?: Vector3;
    compression?: boolean;
    soften?: boolean;
};
declare const _default: (modelPath: string, options: Options) => void;
export default _default;

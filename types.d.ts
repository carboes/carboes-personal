import { Vector3 } from "three";
export declare enum GLBType {
    AllStar = "allstar",
    Brain = "brain"
}
export declare type Options = {
    target?: Vector3;
    autoRotate?: boolean;
    stats?: boolean;
    cameraPosition?: Vector3;
    compression?: boolean;
    soften?: boolean;
};

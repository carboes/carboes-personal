import { RenderMessage } from 'common/src/character/types/character-render-message';
import { Vector3 } from 'three';
export declare type GLBSetting = {
    target: Vector3;
    autoRotate: boolean;
    cameraPosition: Vector3;
};
export declare type GLBSettings = {
    [key in GLBType]: GLBSetting;
};
export declare enum GLBType {
    Character = "character",
    Brain = "brain"
}
export declare type OpenSeaData = {
    type: GLBType;
    glb: string;
    baseUri: string;
    meta?: RenderMessage;
};

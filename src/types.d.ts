import { Vector3 } from 'three';
import { Color as CharacterColor, Genesis } from 'common/src/character/types';
import { GLBType } from 'common/src/glb-iframe/types';
export declare type GLBSetting = {
    target: Vector3;
    autoRotate: boolean;
    cameraPosition: Vector3;
};
export declare type GLBSettings = {
    [key in GLBType]: GLBSetting;
};
export declare type CharacterMeta = {
    color: CharacterColor;
    genesis: Genesis;
    configurable: boolean;
};

import { Vector3 } from "three";
import { GLBType } from ".";
import { init } from "./init";

const { glb, glbType } = document.body.dataset

if (!glbType || glbType as unknown as GLBType === GLBType.Brain) {
  init(glb || "models/BrainTest.glb", {
    target: new Vector3(0, 0, 0),
    autoRotate: true,
    cameraPosition: new Vector3(0,0,5)
  })
}


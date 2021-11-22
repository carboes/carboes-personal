import { Vector3 } from "three";
import { GLBType } from ".";
import { init } from "./init";

const { glb, glbType } = document.body.dataset

if (!glbType || glbType as unknown as GLBType === GLBType.AllStar) {
  init(glb || "models/AllStarTest.glb", {
    target: new Vector3(0, 1.5, 0),
    autoRotate: true,
    cameraPosition: new Vector3(0, 2.5, 5),
  })
}
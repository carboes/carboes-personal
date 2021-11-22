import { AmbientLight, DirectionalLight, HemisphereLight, Scene } from "three"

export const loadLighting = (scene: Scene) => {
  // const directional1 = new DirectionalLight(0xFFFFFF, 0.2)
  // directional1.position.set(0, 0, 1)
  // scene.add(directional1)

  const hemisphere = new HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.7)
  scene.add(hemisphere);//0xB1E1FF//0xB97A20

  const ambience = new AmbientLight(0xffffff, 0.7)
  scene.add(ambience)
}
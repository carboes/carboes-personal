import { AmbientLight, DirectionalLight, Scene } from "three"
import { ShaderType } from "./types"

export default (shaderType: ShaderType, scene: Scene) => {
    var intMult = 0.6
    if (shaderType == ShaderType.CircuitBoard) {
      intMult = 0.1
    } else if (shaderType == ShaderType.Holographic) {
      intMult = 0.3
    }
  
    // Key Light Front-Left (starting position)
    const frontLeftKeyLight = new DirectionalLight(0xffffff, 1.4 * intMult)
    frontLeftKeyLight.position.set(0.8, 0, 0.6)
    scene.add(frontLeftKeyLight)
  
    // Fill Light from Front-Right (and below)
    const frontRightFillLight = new DirectionalLight(
      0xffffff,
      0.4 * intMult
    )
    frontRightFillLight.position.set(0.3, -0.55, -0.55)
    scene.add(frontRightFillLight)
  
    // Kicker/Rim from Back-Right
    const backRightLight = new DirectionalLight(0xffffff, 0.8 * intMult)
    backRightLight.position.set(-1, 0.5, -1)
    scene.add(backRightLight)
  
    // Subtle Kicker/Rim from Back-Left
    const backLeftLight = new DirectionalLight(0xffffff, 1 * intMult)
    backLeftLight.position.set(-1, 0.4, 1)
    scene.add(backLeftLight)
  
    // Fill to cover the black base
    const bottomLight = new DirectionalLight(0xffffff, 0.7 * intMult)
    bottomLight.position.set(0.2, -1, 0.2)
    scene.add(bottomLight)
  
    // Fill to cover the TOP base
    const topLight = new DirectionalLight(0xffffff, 1.2 * intMult)
    topLight.position.set(0, 2, 0)
    scene.add(topLight)
  
    // Ambience
    const ambience = new AmbientLight(0xffffff, 0.1)
    scene.add(ambience)
  }
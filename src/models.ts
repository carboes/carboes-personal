import THREE, { BufferGeometry, Geometry, Material, Mesh,  MeshBasicMaterial,  MeshLambertMaterial,  WebGLRenderer } from "three"
import { Scene } from "three"
import { AnimationMixer } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const modelAnimations = (gltf: GLTF, mixers: AnimationMixer[], renderer: WebGLRenderer) => {
  const mixer = new AnimationMixer(gltf.scenes[0])// or scene?
  mixers.push(mixer)

  const container = document.createElement("div")
  container.className = "buttons"
  for (let i = 0; i < gltf.animations.length; i++) {
    const animation = gltf.animations[i]
    const action = mixer.clipAction(animation)

    const button = document.createElement("button")
    const startAnimation = () => {
      action.play()
      button.textContent = 'Stop' 
      button.onclick = stopAnimation
    }
    const stopAnimation = () => {
      action.stop()
      button.textContent = `Play ${ animation.name} (#${i + 1}, ${Math.round(animation.duration)}s)`
      button.onclick = startAnimation
    }
    stopAnimation()
    container.appendChild(button)
  }
  window.document.body.appendChild(container)
}

export const loadModels = (scene: Scene, mixers: AnimationMixer[], renderer: WebGLRenderer, modelPath: string) => {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/')
  const loader = new GLTFLoader()
  loader.setDRACOLoader(dracoLoader)
  loader.load(
    modelPath,
    (gltf) => {
      modelAnimations(gltf, mixers, renderer)

      gltf.scene.traverse(function (child) {
        const mesh = child as Mesh
        if (mesh.isMesh) {
          // console.log(mesh.name)
          // const tempGeo = new Geometry().fromBufferGeometry(mesh.geometry as BufferGeometry);

          // tempGeo.mergeVertices();
          
          // // // after only mergeVertices my textrues were turning black so this fixed normals issues
          // tempGeo.computeVertexNormals();
          // tempGeo.computeFaceNormals();
          
          // mesh.geometry = new BufferGeometry().fromGeometry(tempGeo)
          
          var prevMaterial = mesh.material
          mesh.material = new MeshLambertMaterial();
          //mesh.geometry.merge
          //mesh.geometry.computeVertexNormals();
          MeshBasicMaterial.prototype.copy.call( mesh.material, prevMaterial as THREE.Material );

          
          //(mesh.material as Material).roughness = 1
          // mesh.material = new MeshPhysicalMaterial({
          //   // color: (mesh.material as MeshPhysicalMaterial).color.multiplyScalar(
          //   //   colorScalar
          //   // ),
          //   roughness: 0.4,
          //   metalness: 0.9,
          //   reflectivity: 0.9,
          // })
          //mesh.material =  new THREE.MeshLambertMaterial({color: 0xff0000, transparent: false, opacity: 0.5});
          //assignBoxBaseShaderMaterialMatte(child as Mesh)
          //assignHolographicMaterial(mesh)
          //   const m = child as THREE.Mesh
          //   m.receiveShadow = true
          //   m.castShadow = true
          // }
          // if ((child as THREE.Light).isLight) {
          //   const l = child as THREE.Light
          //   // l.castShadow = true
          //   // l.shadow.bias = -0.003
          //   // l.shadow.mapSize.width = 2048
          //   // l.shadow.mapSize.height = 2048
        }
      })
      scene.add(gltf.scene)
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (err) => {
      console.error(err)
    }
  )
}
///
// FROM: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Atmosphere.html
///

// ////////////
// // CUSTOM //
// ////////////

// // create custom material from the shader code above

// //   that is within specially labeled script tags

// var customMaterialAtmosphere = new THREE.ShaderMaterial(
//     {
//         uniforms:
//         {
//             "c": { type: "f", value: 0.5 },
//             "p": { type: "f", value: 4.0 }
//         },
//         vertexShader: document.getElementById('vertexShaderAtmosphere').textContent,
//         fragmentShader: document.getElementById('fragmentShaderAtmosphere').textContent
//     });

// var sphereGeo = new THREE.SphereGeometry(100, 32, 16);

// var moonTexture = THREE.ImageUtils.loadTexture('images/moon.jpg');
// var moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
// var moon = new THREE.Mesh(sphereGeo, moonMaterial);
// scene.add(moon);

// // create secondary scene to add atmosphere effect

// atmosphereScene = new THREE.Scene();

// camera2 = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// camera2.position = camera.position;
// camera2.rotation = camera.rotation;
// atmosphereScene.add(camera2);

// var mesh = new THREE.Mesh(sphereGeo.clone(), customMaterialAtmosphere);
// mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.2;
// // atmosphere should provide light from behind the sphere, so only render the back side
// mesh.material.side = THREE.BackSide;
// atmosphereScene.add(mesh);


// // clone earlier sphere geometry to block light correctly
// // and make it a bit smaller so that light blends into surface a bit
// var blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
// var sphere = new THREE.Mesh(sphereGeo.clone(), blackMaterial);
// sphere.scale.x = sphere.scale.y = sphere.scale.z = 1;
// atmosphereScene.add(sphere);

// ////////////////////////////////////////////////////////////////////////
// // final composer will blend composer2.render() results with the scene 
// ////////////////////////////////////////////////////////////////////////

// // prepare secondary composer
// var renderTargetParameters =
// {
//     minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
//     format: THREE.RGBFormat, stencilBuffer: false
// };
// var renderTarget = new THREE.WebGLRenderTarget(SCREEN_WIDTH, SCREEN_HEIGHT, renderTargetParameters);
// composer2 = new THREE.EffectComposer(renderer, renderTarget);

// // prepare the secondary render's passes
// var render2Pass = new THREE.RenderPass(atmosphereScene, camera2);
// composer2.addPass(render2Pass);

// // prepare final composer
// finalComposer = new THREE.EffectComposer(renderer, renderTarget);

// // prepare the final render's passes
// var renderModel = new THREE.RenderPass(scene, camera);
// finalComposer.addPass(renderModel);

// var effectBlend = new THREE.ShaderPass(THREE.AdditiveBlendShader, "tDiffuse1");
// effectBlend.uniforms['tDiffuse2'].value = composer2.renderTarget2;
// effectBlend.renderToScreen = true;
// finalComposer.addPass(effectBlend);
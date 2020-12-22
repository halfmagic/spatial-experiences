import * as THREE from "three";
import OrbitControls from "three-orbitcontrols";
import { fresnel } from "./shaders.js";

const s_group = new THREE.Group();

const main = () => {
  const canvas = document.querySelector("#canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(18);
  //--
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();
  //--
  camera.position.z = -100;
  scene.add(s_group);
  //--
  const createElements = (x, y, z, r, opacity = 1) => {
    const c_geo = new THREE.SphereGeometry(r, 32, 32);
    const c_mat = new THREE.ShaderMaterial({
      uniforms: {
        u_opacity: { value: opacity } // TODO animate it by time by sphears
      },
      vertexShader: fresnel.vertexShader,
      fragmentShader: fresnel.fragmentShader
    });
    //TODO let's find a way to simulate physics
    const c_mes = new THREE.Mesh(c_geo, c_mat);
    c_mes.position.set(x, y, z);
    //--
    s_group.add(c_mes);
  };

  const animation = () => {
    requestAnimationFrame(animation);
    // s_group.rotation.y += 0.02;
    // s_group.rotation.x += 0.01;

    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    renderer.render(scene, camera);
  };

  const onWindowResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };

  animation();

  const x = 5;
  const y = 10;
  const z = 3;
  const dist = 2.4;

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        createElements(
          (i - (x - 1) / 2) * dist,
          (j - (y - 1) / 2) * dist,
          (k - (z - 1) / 2) * dist,
          1,
          Math.random() / 2 + 1.1
        );
      }
    }
  }

  onWindowResize();

  window.addEventListener("resize", onWindowResize, false);
};

main();

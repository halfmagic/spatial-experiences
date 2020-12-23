import * as THREE from './vendor/three/build/three.module'
// import { OrbitControls } from './vendor/three/examples/jsm/controls/OrbitControls'
import { fresnel } from './shaders.js'
import * as helper from './utils/helper'

importScripts('./vendor/ammo.js')

const s_group = new THREE.Group()
let mouse = {x: 0, y: 0}
let physicsWorld

function onMouseMove(e){
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1
}

const main = () => {
  const canvas = document.querySelector('#canvas')
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(18)
  //--
  // const controls = new OrbitControls(camera, canvas)
  // controls.target.set(0, 0, 0)
  // controls.update()
  //--
  camera.position.z = 100
  scene.add(s_group)
  

  const createSphere = (x, y, z, r, opacity = 1) => {
    const c_geo = new THREE.SphereGeometry(r, 32, 32)
    const c_mat = new THREE.ShaderMaterial({
      uniforms: {
        u_opacity: { value: opacity } // TODO animate it by time by sphears
      },
      vertexShader: fresnel.vertexShader,
      fragmentShader: fresnel.fragmentShader
    })
    //TODO let's find a way to simulate physics
    const c_mes = new THREE.Mesh(c_geo, c_mat)
    c_mes.position.set(x, y, z)
    //--
    s_group.add(c_mes)
  }

  const animation = () => {
    requestAnimationFrame(animation)
    // s_group.rotation.y += 0.02
    // s_group.rotation.x += 0.01

    camera.lookAt(scene.position)
    // cubeCamera.update(renderer, scene)
    // b_mat.envMap = cubeRenderTarget.texture
    camera.position.x = helper.lerp(camera.position.x, -mouse.x *10, 0.005)
    // camera.position.y = helper.lerp(camera.position.y, mouse.y /3, 0.01)

    

    camera.updateMatrixWorld()
    renderer.render(scene, camera)
  }

  const onWindowResize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  // createBox(1,20,10)
  
  const x = 5
  const y = 10
  const z = 3
  const dist = 2.5
  
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        createSphere(
          (i - (x - 1) / 2) * dist,
          (j - (y - 1) / 2) * dist,
          (k - (z - 1) / 2) * dist,
          1,
          Math.random() / 2 + 1.1
          )
        }
      }
    }
  animation()
    
  onWindowResize()

  window.addEventListener('resize', onWindowResize, false)
  window.addEventListener( 'mousemove', onMouseMove, false )

  
}

Ammo().then(main)

import * as THREE from '../vendor/three/build/three.module'
import { fresnel } from '../shaders.js'

export default class Sphere{
  constructor(x,y,z,r,opacity){
    this.position = {x: x, y: y, z: z}
    this.radius = r
    this.segments = 16
    this.opaicty = opacity
  }
  create(){
    this.geo = new THREE.SphereGeometry(this.radius, this.segments, this.segments)
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        u_opacity: { value: this.opacity }
      },
      vertexShader: fresnel.vertexShader,
      fragmentShader: fresnel.fragmentShader
    })
    this.mesh = new THREE.Mesh(this.geo, this.mat)
    this.mesh.position.copy(this.position)
  }

  blink(opacity){
    this.mat.uniforms.u_opacity.value = opacity
  }

  update(){

  }
}
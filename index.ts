import * as THREE from 'three'
import { GameLoop } from './core/GameLoop'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshNormalMaterial(),
)
scene.add(cube)
camera.position.z = 5

const loop = new GameLoop(
  (dt) => {
    cube.rotation.x += 0.001 * dt
    cube.rotation.y += 0.002 * dt
  },
  () => {
    renderer.render(scene, camera)
  },
)

loop.start()

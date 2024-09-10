import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import GUI from 'lil-gui'


/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */


/**
 * Objects
 */
// Material
const material = new THREE.ShaderMaterial({
    wireframe: true
})

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(),
    material
)
scene.add(mesh)

const mesh2 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(),
    material
)
mesh2.position.x = 4
scene.add(mesh2)

const mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    material
)
mesh3.position.x = -4
scene.add(mesh3)

// load model
let burger = null
gltfLoader.load('./models/hamburger.glb', (gltf) => {
    // console.log(gltf);
    burger = gltf.scene
    burger.traverse((child) => {
        if(child.isMesh)
            child.material = material
    })
    burger.scale.set(.3,.3,.3)
    burger.position.z = -4
    scene.add(burger)
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 5, 7)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // update meshed
    mesh.rotation.y = elapsedTime
    mesh2.rotation.y = elapsedTime
    mesh3.rotation.y = elapsedTime

    if(burger)
    {
        burger.rotation.y = elapsedTime
        burger.rotation.x = elapsedTime
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
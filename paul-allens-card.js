import * as three from 'three'
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js'

const scene = new three.Scene()
scene.background = new three.Color('ivory')

const cardSizes = {
    large: {
        width: 600,
        height: 336,
    },
    small: {
        width: 300,
        height: 168,
    },
};

const innerWidth = cardSizes.small.width
const innerHeight = cardSizes.small.height

const camera = new three.PerspectiveCamera(30, innerWidth / innerHeight)
camera.position.set(1, 0, 4)
camera.lookAt(scene.position)

const renderer = new three.WebGLRenderer({ antialias: true })
renderer.setSize(innerWidth, innerHeight)
renderer.setAnimationLoop(animationLoop)

// TODO: Setup in the card component
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', (event) => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
})

// waves with simplex noise
const geometry = new three.PlaneGeometry(6, 4, 150, 100)
// const geometry = new three.PlaneGeometry(6, 4, 250, 100)
const pos = geometry.getAttribute('position')
const simplex = new SimplexNoise()

const waves = new three.Points(
    geometry,
    new three.PointsMaterial({
        size: 0.02,
        color: new three.Color('rosybrown'),
    })
)
waves.rotation.x = -Math.PI / 2
scene.add(waves)

function animationLoop(t) {
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const z = 0.4 * simplex.noise3d(x / 2, y / 2, t / 5000)

        pos.setZ(i, z)
    }

    pos.needsUpdate = true

    renderer.render(scene, camera)
}

import * as three from 'three'
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js'

const container = document.getElementById('hero-card')

const scene = new three.Scene()

const camera = new three.PerspectiveCamera(30, 1, 0.1, 100)
camera.position.set(1, 0, 4)
camera.lookAt(scene.position)

const renderer = new three.WebGLRenderer({ antialias: true, alpha: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.domElement.setAttribute('aria-hidden', 'true')
container.prepend(renderer.domElement)

// waves with simplex noise
const geometry = new three.PlaneGeometry(6, 4, 150, 100)
const pos = geometry.getAttribute('position')
const simplex = new SimplexNoise()

const styles = getComputedStyle(document.documentElement)
const primary = styles.getPropertyValue('--color-primary').trim() || '#1bb426'

const waves = new three.Points(
    geometry,
    new three.PointsMaterial({
        size: 0.02,
        color: new three.Color(primary),
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
    })
)
waves.rotation.x = -Math.PI / 2
scene.add(waves)

const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches

function renderAt(time) {
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const y = pos.getY(i)
        const z = 0.4 * simplex.noise3d(x / 2, y / 2, time / 5000)

        pos.setZ(i, z)
    }

    pos.needsUpdate = true

    renderer.render(scene, camera)
}

function resize() {
    const width = container.clientWidth
    const height = container.clientHeight

    if (width === 0 || height === 0) return

    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    if (prefersReducedMotion) renderAt(0)
}

resize()

if (prefersReducedMotion) {
    renderAt(0)
} else {
    renderer.setAnimationLoop(renderAt)
}

new ResizeObserver(resize).observe(container)

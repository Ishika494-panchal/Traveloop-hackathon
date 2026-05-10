import { Bounds, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { GlobeMessagePopups } from '@/components/GlobeMessagePopups'
import earthModelUrl from '@/assets/model/earthdunya.glb?url'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

useGLTF.preload(earthModelUrl)

function EarthGltf() {
  const gltf = useGLTF(earthModelUrl)

  return (
    <Bounds fit clip margin={1.12}>
      <primitive object={gltf.scene} />
    </Bounds>
  )
}

function GlobeCanvas({ autoRotate }: { autoRotate: boolean }) {
  return (
    <Canvas
      className="h-full w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full [&_canvas]:outline-none"
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0.1, 2.25], fov: 44, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <ambientLight intensity={0.48} color="#c8dff5" />
      <directionalLight position={[5, 3.5, 6]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, -1, -3]} intensity={0.42} color="#88bdf2" />
      <pointLight position={[0, 0, 2.2]} intensity={0.28} color="#bdddfc" />
      <Suspense fallback={null}>
        <EarthGltf />
      </Suspense>
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableRotate
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.75}
        autoRotate={autoRotate}
        autoRotateSpeed={1.05}
        minPolarAngle={Math.PI * 0.22}
        maxPolarAngle={Math.PI * 0.82}
      />
    </Canvas>
  )
}

export function GlobeAnimation() {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative mx-auto aspect-square w-[min(88vw,320px)] max-w-full overflow-visible sm:w-[min(82vw,380px)] md:w-[min(40vw,420px)] md:max-w-[420px] lg:w-[min(42vw,460px)] lg:max-w-[460px]">
      <div className="relative h-full w-full cursor-grab touch-none active:cursor-grabbing">
        <GlobeCanvas autoRotate={!reduced} />
      </div>
      <GlobeMessagePopups />
    </div>
  )
}

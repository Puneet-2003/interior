import { Suspense, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows } from '@react-three/drei'

const legPositions = [
  [-0.2, 0.16, -0.2],
  [0.2, 0.16, -0.2],
  [-0.2, 0.16, 0.2],
  [0.2, 0.16, 0.2],
]

function Chair() {
  return (
    <group>
      {legPositions.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.028, 0.032, 0.32, 12]} />
          <meshStandardMaterial color="#1c1917" metalness={0.45} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.52, 0.09, 0.48]} />
        <meshStandardMaterial color="#a8987c" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.58, -0.05]} castShadow>
        <boxGeometry args={[0.48, 0.22, 0.42]} />
        <meshStandardMaterial color="#26a69a" roughness={0.72} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.72, -0.2]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.52, 0.42, 0.09]} />
        <meshStandardMaterial color="#143d36" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  )
}

function SideTable() {
  return (
    <group>
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.045, 40]} />
        <meshStandardMaterial color="#4a3728" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.19, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.07, 0.36, 12]} />
        <meshStandardMaterial color="#27272a" metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.03, 16]} />
        <meshStandardMaterial color="#18181b" metalness={0.35} roughness={0.55} />
      </mesh>
    </group>
  )
}

function AccentLamp() {
  return (
    <group position={[0.92, 0, 0.32]}>
      <mesh position={[0, 0.52, 0]} castShadow>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial
          color="#fef3c7"
          emissive="#fbbf24"
          emissiveIntensity={0.35}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 0.24, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.035, 0.48, 8]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  )
}

function SceneContent() {
  const turntable = useRef(null)
  useFrame((_, delta) => {
    if (turntable.current) {
      turntable.current.rotation.y += delta * 0.045
    }
  })

  return (
    <group ref={turntable}>
      <ambientLight intensity={0.38} />
      <directionalLight position={[4.5, 7, 5]} intensity={1.15} castShadow />
      <pointLight position={[-2.5, 2.8, 1.5]} intensity={0.45} color="#26a69a" />

      <Float speed={2.1} rotationIntensity={0.4} floatIntensity={0.5}>
        <group position={[-0.78, -0.06, 0]}>
          <Chair />
        </group>
      </Float>

      <Float speed={1.7} rotationIntensity={0.28} floatIntensity={0.38}>
        <group position={[0.58, -0.1, 0.12]} scale={1.08}>
          <SideTable />
        </group>
      </Float>

      <Float speed={1.4} rotationIntensity={0.55} floatIntensity={0.32}>
        <AccentLamp />
      </Float>

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.5}
        scale={14}
        blur={2.4}
        far={6}
        color="#000000"
      />
    </group>
  )
}

/**
 * 3D chair, side table, and lamp with float + slow turntable motion (no orbit — keeps mobile scroll smooth).
 */
export function Furniture3DScene({ className = '' }) {
  return (
    <div className={`touch-pan-y ${className}`}>
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.82, 5.4], fov: 40, near: 0.1, far: 48 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}

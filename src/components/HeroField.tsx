"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2600; // well under the 5k-triangle budget

function Points() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;
    ref.current.rotation.y += delta * 0.02 + mouse.current.x * 0.0006;
    ref.current.rotation.x = mouse.current.y * 0.06;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#00ff88"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Slow-drifting particle field behind the hero. Loaded lazily (see Hero),
 *  capped DPR, hero-viewport only. The CSS scanlines underneath ARE the
 *  fallback — if this never mounts, the hero still reads finished. */
export default function HeroField() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 60 }}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
    >
      <Points />
    </Canvas>
  );
}

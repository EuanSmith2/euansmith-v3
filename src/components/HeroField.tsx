"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 2600; // well under the 5k budget
const FOV = 60;
const CAM_Z = 5;
const REPEL_PX = 80; // cursor repulsion radius, in screen pixels

function Points() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // home = rest positions; the live buffer eases toward home + repulsion
  const home = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return p;
  }, []);
  const positions = useMemo(() => home.slice(), [home]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.08;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.08;
    pts.rotation.y += delta * 0.02;

    // pointer NDC → world units on the z=0 plane, then into the cloud's
    // local space (undo the y-rotation) so the distance check stays valid
    const vh = 2 * Math.tan((FOV * Math.PI) / 360) * CAM_Z;
    const vw = vh * (state.size.width / state.size.height);
    const wx = (mouse.current.x * vw) / 2;
    const wy = (mouse.current.y * vh) / 2;
    const a = -pts.rotation.y;
    const lx = Math.cos(a) * wx;

    const r = (REPEL_PX / state.size.height) * vh;
    const r2 = r * r;
    const pos = pts.geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const j = i * 3;
      let tx = home[j];
      let ty = home[j + 1];
      const dx = home[j] - lx;
      const dy = home[j + 1] - wy;
      const d2 = dx * dx + dy * dy;
      if (d2 < r2 && d2 > 1e-6) {
        const d = Math.sqrt(d2);
        const push = ((r - d) / r) * 0.55; // linear falloff, gentle
        tx += (dx / d) * push;
        ty += (dy / d) * push;
      }
      arr[j] += (tx - arr[j]) * 0.12;
      arr[j + 1] += (ty - arr[j + 1]) * 0.12;
    }
    pos.needsUpdate = true;
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

/** Slow-drifting particle field behind the hero, with cursor repulsion.
 *  Loaded lazily (see Hero), capped DPR, hero-viewport only. The CSS
 *  scanlines underneath ARE the fallback — if this never mounts, the hero
 *  still reads finished. */
export default function HeroField() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      gl={{ antialias: false, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <Points />
    </Canvas>
  );
}

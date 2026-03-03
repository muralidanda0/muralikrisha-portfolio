 import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { Text } from "@react-three/drei";

function NeuralSphere() {
  const count = 1500;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 5;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function Background3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      className="absolute inset-0 -z-10"
      
    >
        <Text
  position={[0, -6, 0]}
  fontSize={0.8}
  color="#6366f1"
  anchorX="center"
  anchorY="middle"
>
  MURALI KRISHNA
</Text>
      <ambientLight intensity={0.5} />
      <NeuralSphere />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

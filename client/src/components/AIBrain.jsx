import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function AIBrain() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />

        <Sphere args={[2, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}
"use client";
import React, { useRef } from "react";
import { DoubleSide } from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";


const Vertex = `
uniform float uTime;
uniform float uStrength;

void main() {
    vec3 pos = position;

    // Wave distortion
    pos.x += sin(pos.y * 5.0 + uTime * 5.0) * 0.05 * uStrength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const Fragment = `
void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}
`;

const SceneComp = () => {
  return (
    <group>
      {Array.from({ length: 30 }, (_, i) => (
        <WaveItem key={i} index={i} />
      ))}
    </group>
  );
};

function WaveItem({ index }) {
  const matRef = useRef();

  // Update time per mesh
  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const handleOver = () => {
    gsap.to(matRef.current.uniforms.uStrength, {
      value: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleOut = () => {
    gsap.to(matRef.current.uniforms.uStrength, {
      value: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[0, 0, (index * Math.PI) / 8]} // clean rotation
      onPointerOver={handleOver}
      onPointerOut={handleOut}
    >
      <cylinderGeometry args={[1.1, 1.1, 10, 64, 64, false, 0, 0.005]} />

      <shaderMaterial
        ref={matRef}
        side={DoubleSide}
        transparent={false}
        uniforms={{
          uTime: { value: 0 },
          uStrength: { value: 0 },
        }}
        vertexShader={Vertex}
        fragmentShader={Fragment}
      />
    </mesh>
  );
}

export default SceneComp;

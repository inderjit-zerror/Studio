"use client";
import { Canvas } from "@react-three/fiber";
import SceneComp from "./SceneComp";
import { Environment } from "@react-three/drei";

const HeroSection = () => {
  return (
    <div className="w-full h-screen flex">
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 5], fov: 45 }}>
        <SceneComp />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroSection;

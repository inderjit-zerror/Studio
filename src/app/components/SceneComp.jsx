import React from "react";
import { DoubleSide } from "three";

const SceneComp = () => {
  return (
    <group>
      {Array.from({ length: 30 }, (_, i) => {
         
        return (
          <mesh
            key={i}
            position={[0,0,0]}
            rotation={[0,0,i * Math.PI / 8 * Math.PI /8]}
          >
            <cylinderGeometry args={[1.1, 1.1, 10, 64, 64, false, 0, 0.005]} />
            <shaderMaterial side={DoubleSide} />
          </mesh>
        );
      })}
    </group>
  );
};

export default SceneComp;

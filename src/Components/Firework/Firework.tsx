import { useMemo, useRef } from "react";
import { fragmentShader } from "./fragmentShader";
import { vertexShader } from "./vertexShader";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, Mesh, ShaderMaterial, Vector2 } from "three";

const Firework = () => {
  const mesh = useRef<Mesh>(null);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uResolution: {
        value: new Vector2(
          size.width * viewport.dpr,
          size.height * viewport.dpr
        ),
      },
    }),
    []
  );

  // console.log(uniforms.uResolution);

  // debug

  useFrame(({ clock }) => {
    (mesh.current?.material as ShaderMaterial).uniforms.uTime.value =
      clock.getElapsedTime();
  });

  return (
    <mesh
      ref={mesh}
      // position={[0, 0, 0]}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={DoubleSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

export default Firework;

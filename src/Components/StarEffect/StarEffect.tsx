import { useMemo, useRef } from "react";
import { fragmentShader } from "./fragmentShader";
import { vertexShader } from "./vertexShader";
import { useFrame, useThree } from "@react-three/fiber";
import { DoubleSide, Mesh, ShaderMaterial, Vector2 } from "three";
import { useControls } from "leva";

const StarEffect = () => {
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
      uPointer: {
        value: new Vector2(),
      },
    }),
    []
  );

  // debug

  const {
    wireframe,
    doubleSide,
    color,
    width,
    height,
    widthSegments,
    heightSegements,
  } = useControls("plane", {
    color: "white",
    width: 1,
    height: 1,
    widthSegments: { value: 32, min: 0, max: 64, step: 8 },
    heightSegements: { value: 32, min: 0, max: 64, step: 8 },
    wireframe: false,
    doubleSide: true,
  });
  console.log(color);

  useFrame(({ clock, pointer }) => {
    (mesh.current?.material as ShaderMaterial).uniforms.uTime.value =
      clock.getElapsedTime();
    (mesh.current?.material as ShaderMaterial).uniforms.uPointer.value =
      pointer;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[width, height, widthSegments, heightSegements]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        wireframe={wireframe}
        side={doubleSide ? DoubleSide : undefined}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};

export default StarEffect;

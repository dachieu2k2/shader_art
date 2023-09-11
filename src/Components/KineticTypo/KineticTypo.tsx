import { useMemo, useRef } from "react";
import { fragmentShader } from "./fragmentShader";
import { vertexShader } from "./vertexShader";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial, Vector2, TextureLoader } from "three";

const KineticTypo = () => {
  const mesh = useRef<Mesh>(null);
  const colorMap = useLoader(TextureLoader, "./assets/images/love.png");

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
      uTexture: {
        value: colorMap,
      },
    }),
    []
  );

  // console.log(uniforms.uResolution);

  // debug

  useFrame(({ clock }) => {
    // (mesh.current?.material as ShaderMaterial).uniforms.uTexture.value = "";

    (mesh.current?.material as ShaderMaterial).uniforms.uTime.value =
      clock.getElapsedTime();
    (mesh.current?.material as ShaderMaterial).needsUpdate = true;
  });

  return (
    <mesh ref={mesh} position={[0, 0, -30]}>
      <torusKnotGeometry args={[12, 3, 768, 3, 4, 3]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        // depthWrite={false}
        vertexColors={true}
      />
    </mesh>
  );
};

export default KineticTypo;

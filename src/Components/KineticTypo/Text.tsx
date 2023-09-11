import { Center, Text3D } from "@react-three/drei";

const Text = () => {
  return (
    <Center top left>
      <Text3D
        curveSegments={32}
        bevelEnabled
        bevelSize={0.004}
        bevelThickness={0.01}
        height={0.2}
        lineHeight={0.5}
        letterSpacing={-0.06}
        size={1.5}
        scale={0.05}
        position={[1.6, 0, 0]}
        font="./assets/fonts/Inter_Bold.json"
      >
        {`helloworld`}
        <meshStandardMaterial color={"white"} />
      </Text3D>
    </Center>
  );
};

export default Text;

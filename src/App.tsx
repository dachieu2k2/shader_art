import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Loader, OrbitControls } from "@react-three/drei";
import { Leva, useControls } from "leva";
import Scene from "./Components/Scene";

function App() {
  const { orbitcontrols, axesHelper } = useControls("mainControls", {
    orbitcontrols: true,
    axesHelper: false,
  });
  return (
    <>
      <Canvas camera={{ position: [0, 0, 3] }} shadows>
        {/* <color attach="background" args={["#f0f0f0"]} /> */}
        {/* <Plane /> */}
        {/* <MagicBox /> */}
        <Scene />
        {orbitcontrols && <OrbitControls />}
        {axesHelper && <axesHelper />}
      </Canvas>
      <Leva collapsed hidden />
      <Loader />
    </>
  );
}

export default App;

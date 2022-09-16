import { Environment, useTexture } from "@react-three/drei";
import store from "../../data/store";
import { BackSide } from "three/src/constants";

const galacticTilt = 60.19; // degrees
const galacticTiltRadians = (galacticTilt * Math.PI) / 180;

const SpaceBackground = () => {
  const quality = store.useState((s) => s.userSettings.quality);
  const texture = useTexture("/assets/stars.jpeg");

  return (
    <Environment background near={1} far={100} resolution={quality === "High" ? 4096 : quality === "Med" ? 2048 : 1024}>
      <mesh scale={10} rotation={[galacticTiltRadians, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
    </Environment>
  );
};

export default SpaceBackground;

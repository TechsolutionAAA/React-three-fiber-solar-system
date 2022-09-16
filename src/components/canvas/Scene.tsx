import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useRef } from "react";
import store, { updateAppSetting } from "../../data/store";
import SpaceBackground from "./SpaceBackground";
import DebugInfo from "./DebugInfo";
import PostProcessingEffects from "./PostProcessingEffects";
import AstronomicalBody from "./AstronomicalBody";

const Scene = () => {
    const actualScale = store.useState((s) => s.userSettings.actualScale);
    const solarSystemData = store.useState((s) => s.appSettings.solarSystemData);
    const sun = actualScale ? solarSystemData.real : solarSystemData.toon;
    const cameraRef = useRef<PerspectiveCameraProps>(null!);
    const controlsRef = useRef<OrbitControlsImpl>(null!);

    const maxDistance = actualScale ? 30000000000 : 7500000;
    const cameraFar = maxDistance * 2;

    useFrame(() => {
        const { appSettings, userSettings } = store.getRawState();

        if (appSettings.timeStepModifier !== userSettings.timeSpeedModifier) {
            updateAppSetting("timeStepModifier", userSettings.timeSpeedModifier);
            updateAppSetting("timeStep", Math.exp(userSettings.timeSpeedModifier * 20) * 0.00001);
        }

        const cameraDistance = controlsRef.current.getDistance();

        if (cameraDistance !== appSettings.cameraDistance) {
            updateAppSetting("cameraDistance", cameraDistance);
        }
    });

    return (
    <>
        <PerspectiveCamera ref={cameraRef} makeDefault position={[3, 1, 3]} near={50} far={cameraFar} />
        <OrbitControls ref={controlsRef} maxDistance={maxDistance} />
        <SpaceBackground />
        <AstronomicalBody {...sun} cameraRef={cameraRef} controlsRef={controlsRef} />
        <ambientLight color={sun.color} intensity={0.02} />
        <DebugInfo />
        <PostProcessingEffects />
    </>
  );
};

export default Scene;

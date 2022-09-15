import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { PerspectiveCameraProps, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { updateAppSetting } from "../../data/store";
import store from "../../data/store";
import { useRef } from "react";
import SpaceBackground from "./Spacebackground";
import AstronomicalBody from "./AstronomicalBody";
import DebugInfo from "./DebugInfo";
import PostProcessingEffects from "./PostProcessingEffects";

const Scene = () => {
    const actualScale = store.useState((s) => s.userSettings.actualScale);
    const solarSystemData = store.useState((s) => s.appSettings.solarSystemData);
    const sun = actualScale ? solarSystemData.real : solarSystemData.toon;
    const cameraRef = useRef(null);
    const controlsRef = useRef < OrbitControlsImpl > (null);
    console.log(controlsRef)

    const maxDistance = actualScale ? 30000000000 : 7500000;
    const cameraFar = maxDistance * 2;

    useFrame(() => {
        const { appSettings, userSettings } = store.getRawState();

        if (appSettings.timeStepModifier !== userSettings.timeSpeedModifier) {
            updateAppSetting("timeStepModifier", userSettings.timeSpeedModifier);
            updateAppSetting("timeStep", Math.exp(userSettings.timeSpeedModifier * 20) * 0.00001);
        }

        const cameraDistance = 1;

        if (cameraDistance !== appSettings.cameraDistance) {
            updateAppSetting("cameraDistance", cameraDistance);
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[3, 1, 3]} near={50} far={cameraFar} />
            <OrbitControls maxDistance={maxDistance} />
            <SpaceBackground />
            <ambientLight color={sun.color} intensity={0.02} />
            <AstronomicalBody {...sun} cameraRef={cameraRef} controlsRef={controlsRef} />
            <DebugInfo />
            <PostProcessingEffects />
        </>
    );
}

export default Scene;
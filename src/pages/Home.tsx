import { useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { MantineProvider } from "@mantine/core";
import { useProgress } from "@react-three/drei";

import store from "../data/store";
import Scene from "../components/canvas/Scene";
import InfoPanels from "../components/overlay/InfoPanels";

const Home = () => {
  const quality = store.useState((s) => s.userSettings.quality);
  const dpr = quality === "High"
    ? window.devicePixelRatio
    : quality === "Med"
      ? window.devicePixelRatio / 1.5
      : window.devicePixelRatio / 2.5;
  
  const progress = useProgress((state) => state.progress);
  const loading = progress < 100;
  useEffect(() => {
      console.info(`loading... ${progress}`)
  }, [progress])
  
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={{colorScheme: 'dark'}}>
      <Canvas
        shadows={false}
        dpr={dpr}
        style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#030302" }}
      >
        <Scene />
      </Canvas>
      { !loading && <InfoPanels />}
    </MantineProvider>
  );
}

export default Home;

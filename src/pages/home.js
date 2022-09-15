import { Canvas } from "@react-three/fiber";
import Scene from "../components/canvas/Scene";

const Home = () => {
    return (
        <>
            <Canvas style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "#030302" }}>
                <Scene />
            </Canvas>
        </>
    );
};

export default Home;
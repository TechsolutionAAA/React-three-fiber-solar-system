import { useEffect, useRef } from "react";
import { BufferGeometry, Float32BufferAttribute, Uint8BufferAttribute } from "three";
import store from "../../data/store";

const TWO_PI = Math.PI * 2;
const vertexCount = 200;

const OrbitPath = ({ color, radius }) => {
    const showOrbitPaths = store.useState((s) => s.userSettings.showOrbitPaths);
    const orbitGeometryRef = useRef(BufferGeometry);

    useEffect(() => {
        const position = [];
        const colors = [];

        const r = (color >>> 16) & 0xff;
        const g = (color >>> 8) & 0xff;
        const b = (color >>> 0) & 0xff;

        for (let i = 0; i < vertexCount + 1; i++) {
            const fraction = i / vertexCount;
            const step = fraction * TWO_PI;

            const x = radius * Math.cos(step);
            const z = radius * Math.sin(step);
            position.push(x, 0, z);
            colors.push(r, g, b, (1 - fraction) * 255);
        }

        orbitGeometryRef.current.setAttribute("position", new Float32BufferAttribute(position, 3));
        orbitGeometryRef.current.setAttribute("color", new Uint8BufferAttribute(colors, 4, true));
    }, [radius]);

    return (
        <line>
            <bufferGeometry ref={orbitGeometryRef} />
            <lineBasicMaterial visible={showOrbitPaths} vertexColors transparent />
        </line>
    );
};

export default OrbitPath;
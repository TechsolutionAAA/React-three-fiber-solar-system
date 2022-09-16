import { useEffect, useRef } from "react";
import store from "../../data/store";
import { Float32BufferAttribute, Uint8BufferAttribute } from "three/src/core/BufferAttribute";
import { BufferGeometry } from "three/src/core/BufferGeometry";

const TWO_PI = Math.PI * 2;
const vertexCount = 200;

type OrbitPathProps = {
  color: number;
  radius: number;
};

const OrbitPath = ({ color, radius }: OrbitPathProps) => {
  const showOrbitPaths = store.useState((s) => s.userSettings.showOrbitPaths);
  const orbitGeometryRef = useRef<BufferGeometry>(null!);

  useEffect(() => {
    const positions: number[] = [];
    const colors: number[] = [];

    // extract rgb from hex color
    const r = (color >>> 16) & 0xff;
    const g = (color >>> 8) & 0xff;
    const b = (color >>> 0) & 0xff;

    for (let i = 0; i < vertexCount + 1; i++) {
      const fraction = i / vertexCount;
      const step = fraction * TWO_PI;

      const x = radius * Math.cos(step);
      const z = radius * Math.sin(step);
      positions.push(x, 0, z);
      colors.push(r, g, b, (1 - fraction) * 255);
    }

    orbitGeometryRef.current.setAttribute("position", new Float32BufferAttribute(positions, 3));
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

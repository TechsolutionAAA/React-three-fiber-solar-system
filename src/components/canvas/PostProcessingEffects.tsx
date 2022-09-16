import { Bloom, EffectComposer, GodRays, SelectiveBloom } from "@react-three/postprocessing";
import store from "../../data/store";

const PostProcessingEffects = () => {
  const quality = store.useState((s) => s.userSettings.quality);
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const { lightSourceMeshRef } = store.useState((s) => s.componentRefs);

  if (quality === "Low" || !lightSourceMeshRef?.current) {
    return null;
  }

  return (
    <EffectComposer>
      {quality === "High" ? (
        <GodRays
          blur={3}
          decay={0.9}
          samples={actualScale ? 30 : 120}
          density={0.98}
          sun={lightSourceMeshRef.current}
        />
      ) : quality === "Med" ? (
        <SelectiveBloom
          selection={[lightSourceMeshRef.current]}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        />
      ) : (
        <></>
      )}
    </EffectComposer>
  );
};

export default PostProcessingEffects;

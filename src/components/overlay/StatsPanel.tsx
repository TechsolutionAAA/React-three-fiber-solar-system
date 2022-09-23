import { Affix, Card, Text } from "@mantine/core";
import store from "../../data/store";

const StatsPanel = () => {
  const actualScale = store.useState((s) => s.userSettings.actualScale);
  const showDebugInfo = store.useState((s) => s.userSettings.showDebugInfo);
  const cameraDistance = store.useState((s) => s.appSettings.cameraDistance);
  
  if (!actualScale) {
    return null;
  }
  
  const distance = cameraDistance.toLocaleString(undefined, { maximumFractionDigits: 0 });
  
  return (
    <Affix position={{top: 16, left: showDebugInfo ? 85 : 6 }}>
      <Card p="xs" style={{ zIndex: Number.MAX_SAFE_INTEGER }}>
        <Text size="sm">{ distance } km</Text>
      </Card>
    </Affix>
    );
};

export default StatsPanel;

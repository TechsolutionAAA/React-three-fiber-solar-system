import { Card, Text } from "@mantine/core";
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
        <Card
            p="xs"
            style={{
                position: "absolute",
                top: "6px",
                left: showDebugInfo ? "85px" : "6px",
                zIndex: Number.MAX_SAFE_INTEGER,
            }}
        >
            <Text size="sm">{ distance } km</Text>
        </Card>
    );
};

export default StatsPanel;
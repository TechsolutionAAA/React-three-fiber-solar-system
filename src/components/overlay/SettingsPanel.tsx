import { useEffect, useState } from "react";

import {
  Accordion,
  Affix,
  Anchor,
  Button,
  Card,
  Center,
  Checkbox,
  createStyles,
  Divider,
  Radio,
  ScrollArea,
  SegmentedControl,
  Slider,
  Stack,
  Text,
} from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { IconPlus } from '@tabler/icons';
import GitHubButton from "react-github-btn";
import useSound from "use-sound";
import store, { resetUserSettings, updateAppSetting, updateUserSetting } from "../../data/store";
import getBodyNames from "../../utils/getBodyNames";

// "Ambient Relaxing music for You" by Amurich, on https://pixabay.com
const musicFile =
  "https://cdn.pixabay.com/download/audio/2022/01/30/audio_874db07cfd.mp3?filename=ambient-relaxing-music-for-you-15969.mp3";

const useStyles = createStyles(() => ({
  content: {
    // paddingLeft: 0,
  },
  chevron: {
    '&[data-rotate]': {
    transform: 'rotate(45deg)'
    }
  },
}));

const SettingsPanel = () => {
  const userSettings = store.useState((s) => s.userSettings);
  const solarSystemData = store.useState((s) => s.appSettings.solarSystemData);
  const sun = userSettings.actualScale ? solarSystemData.real : solarSystemData.toon;

  const [bodyNames] = useState(getBodyNames(sun));
  const { fullscreen, toggle: toggleFullscreen } = useFullscreen();
  const { classes } = useStyles();

  const [play, { duration, sound }] = useSound(musicFile, { volume: 0.25, autoplay: userSettings.enableMusic });

  useEffect(() => {
    if (!duration) return;
    if (userSettings.enableMusic) {
      if (sound.playing()) sound.fade(0, 1, 300)
      else play()
    } else {
      sound.fade(1, 0, 300);
    }
  }, [duration, userSettings.enableMusic, play, sound]);

  return (
    <Affix position={{top: 16, right: 16, bottom: 16}} style={{ overflow: 'hidden'}}>
      <div style={{width: 256, position: 'relative', height: '100%' }}>
      <ScrollArea style={{height: '100%' }}>
        <Card p={0}>
          <Accordion
            multiple
            defaultValue={["settings", "controls"]}
            // iconPosition="right"
            classNames={classes}
            // variant="separated"
            chevron={<IconPlus size={16} />}
          >
            <Accordion.Item value="settings">
              <Accordion.Control>Settings</Accordion.Control>
              <Accordion.Panel>
                <Stack spacing="xs" py="xs">
                  <Checkbox
                    label="Labels"
                    checked={userSettings.showLabels}
                    onChange={(event) => updateUserSetting("showLabels", event.currentTarget.checked)}
                  />
                  <Checkbox
                    label="Orbits"
                    checked={userSettings.showOrbitPaths}
                    onChange={(event) => updateUserSetting("showOrbitPaths", event.currentTarget.checked)}
                  />
                  <Checkbox
                    label="Music"
                    checked={userSettings.enableMusic}
                    onChange={(event) => updateUserSetting("enableMusic", event.currentTarget.checked)}
                  />
                  <Checkbox label="Fullscreen" checked={fullscreen} onChange={toggleFullscreen} />
                  <Checkbox
                    label="Actual scale"
                    checked={userSettings.actualScale}
                    onChange={(event) => updateUserSetting("actualScale", event.currentTarget.checked)}
                  />
                  <Checkbox
                      label="Debug info"
                      checked={userSettings.showDebugInfo}
                      onChange={(event) => updateUserSetting("showDebugInfo", event.currentTarget.checked)}
                  />
                  </Stack>
                  <Divider mt="md" />
                  <Stack>
                  <Text size="sm" mt="sm">
                    Quality
                  </Text>
                  <SegmentedControl
                    fullWidth
                    value={userSettings.quality}
                    onChange={(value) => updateUserSetting("quality", value)}
                    data={["Low", "Med", "High"]}
                  />
                  <Text size="sm">Simulation speed</Text>
                  <Slider
                    value={userSettings.timeSpeedModifier * 1000}
                    onChange={(value) => updateUserSetting("timeSpeedModifier", value / 1000)}
                    min={0}
                    max={1000}
                  />
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="controls">
              <Accordion.Control>Controls</Accordion.Control>
              <Accordion.Panel>
                <Radio.Group
                  orientation="vertical"
                  label="Focused body"
                  spacing="xs"
                  size="sm"
                  value={userSettings.focusedBody}
                >
                  {bodyNames.map(({ name, level }) => (
                    <Radio
                      key={name}
                      value={name}
                      label={name}
                      style={{ marginLeft: `${level * 20}px` }}
                      onClick={() => {
                        updateUserSetting("focusedBody", name);
                        updateAppSetting("focusingBody", true);
                      }}
                    />
                  ))}
                </Radio.Group>
              </Accordion.Panel>
            </Accordion.Item>
            <Center p="md">
              <Button variant="outline" color="gray" onClick={resetUserSettings}>
                Reset settings
              </Button>
            </Center>
            <Divider/>
            <Accordion.Item value="help">
              <Accordion.Control>Help</Accordion.Control>
              <Accordion.Panel>
              <Stack spacing="xs" py={0}>
                <Text size="sm">The quick brown fox jumps over the lazy dog.</Text>
              </Stack>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="about">
              <Accordion.Control>About</Accordion.Control>
              <Accordion.Panel>
              <Stack spacing="xs" py={0}>
                <Text size="sm">A model solar system built with Three.js, React and React Three Fiber.</Text>
                <Text size="sm" mb="xs">
                  by{" "}
                  <Anchor size="sm" href="https://github.com/nbetts" target="_blank">
                    Nathan Betts
                  </Anchor>
                  .
                </Text>
                {/* @ts-ignore */}
                <GitHubButton
                  href="https://github.com/nbetts/react-solar-system"
                  data-color-scheme="no-preference: dark; light: dark; dark: dark;"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star nbetts/react-solar-system on GitHub"
                >
                  Star
                </GitHubButton>
              </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Card>
      </ScrollArea>
      </div>
    {/* </div> */}
    </Affix>
  );
};

export default SettingsPanel;

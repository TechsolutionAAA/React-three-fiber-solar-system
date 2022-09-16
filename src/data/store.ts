import { Store } from "pullstate";
import { RefObject } from "react";
import { Mesh } from "three/src/objects/Mesh";
import { AstronomicalBodyProps, realSolarSystemData, toonSolarSystemData } from "./astronomicalBodyData";

type Quality = "Low" | "Med" | "High";

type AppSettings = {
  timeStepModifier: number;
  timeStep: number;
  showingStartupModal: boolean;
  focusingBody: boolean; // whether or not a focus transition is occurring.
  cameraDistance: number;
  solarSystemData: {
    real: AstronomicalBodyProps;
    toon: AstronomicalBodyProps;
  };
};

type UserSettings = {
  showLabels: boolean;
  showOrbitPaths: boolean;
  showDebugInfo: boolean;
  enableMusic: boolean;
  actualScale: boolean;
  quality: Quality;
  timeSpeedModifier: number; // range [0-1].
  focusedBody: string; // body display name.
};

type ComponentRefs = {
  lightSourceMeshRef?: RefObject<Mesh>;
};

type StoreProps = {
  appSettings: AppSettings;
  userSettings: UserSettings;
  componentRefs: ComponentRefs;
};

const DEFAULT_APP_SETTINGS: AppSettings = {
  timeStepModifier: 0,
  timeStep: 0,
  showingStartupModal: true,
  focusingBody: false,
  cameraDistance: 1,
  solarSystemData: {
    real: realSolarSystemData,
    toon: toonSolarSystemData,
  },
} as const;

const DEFAULT_USER_SETTINGS: UserSettings = {
  showLabels: true,
  showOrbitPaths: true,
  showDebugInfo: false,
  enableMusic: true,
  actualScale: false,
  quality: "High",
  timeSpeedModifier: 0.35,
  focusedBody: "Mars",
} as const;

const loadUserSetting = <T>(key: keyof UserSettings, defaultValue: T) => {
  const stringValue = localStorage.getItem(key);
  return stringValue ? (JSON.parse(stringValue) as T) : defaultValue;
};

const saveUserSetting = <T>(key: keyof UserSettings, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const store = new Store<StoreProps>({
  appSettings: DEFAULT_APP_SETTINGS,
  userSettings: {
    showLabels: loadUserSetting("showLabels", DEFAULT_USER_SETTINGS.showLabels),
    showOrbitPaths: loadUserSetting("showOrbitPaths", DEFAULT_USER_SETTINGS.showOrbitPaths),
    showDebugInfo: loadUserSetting("showDebugInfo", DEFAULT_USER_SETTINGS.showDebugInfo),
    enableMusic: loadUserSetting("enableMusic", DEFAULT_USER_SETTINGS.enableMusic),
    actualScale: loadUserSetting("actualScale", DEFAULT_USER_SETTINGS.actualScale),
    quality: "High", // todo: currently always set to high by default because low/medium default results in quality not changing properly
    timeSpeedModifier: loadUserSetting("timeSpeedModifier", DEFAULT_USER_SETTINGS.timeSpeedModifier),
    focusedBody: loadUserSetting("focusedBody", DEFAULT_USER_SETTINGS.focusedBody),
  },
  componentRefs: {},
});

store.subscribe(
  (s) => s.userSettings.showLabels,
  (value) => saveUserSetting("showLabels", value)
);

store.subscribe(
  (s) => s.userSettings.showOrbitPaths,
  (value) => saveUserSetting("showOrbitPaths", value)
);

store.subscribe(
  (s) => s.userSettings.showDebugInfo,
  (value) => saveUserSetting("showDebugInfo", value)
);

store.subscribe(
  (s) => s.userSettings.enableMusic,
  (value) => saveUserSetting("enableMusic", value)
);

store.subscribe(
  (s) => s.userSettings.actualScale,
  (value) => saveUserSetting("actualScale", value)
);

store.subscribe(
  (s) => s.userSettings.quality,
  (value) => saveUserSetting("quality", value)
);

store.subscribe(
  (s) => s.userSettings.timeSpeedModifier,
  (value) => saveUserSetting("timeSpeedModifier", value)
);

store.subscribe(
  (s) => s.userSettings.focusedBody,
  (value) => saveUserSetting("focusedBody", value)
);

export const updateAppSetting = <T>(key: keyof AppSettings, value: T) => {
  store.update((s) => {
    //@ts-ignore
    s.appSettings[key] = value;
  });
};

export const updateUserSetting = <T>(key: keyof UserSettings, value: T) => {
  store.update((s) => {
    //@ts-ignore
    s.userSettings[key] = value;
  });
};

export const updateRefSetting = <T>(key: keyof ComponentRefs, value: T) => {
  store.update((s) => {
    //@ts-ignore
    s.componentRefs[key] = value;
  });
};

export const resetUserSettings = () => {
  store.update((s) => {
    s.appSettings.focusingBody = true;
    s.userSettings = DEFAULT_USER_SETTINGS;
  });
};

export default store;

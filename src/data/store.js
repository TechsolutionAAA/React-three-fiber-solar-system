import { Store } from "pullstate";
import { realSolarSystemData, toonSolarSystemData } from "./astronomicalBodyData";

const DEFAULT_APP_SETTINGS = {
    timeStepModifier: 0,
    timeStep: 0,
    showingStartupModal: true,
    focusingBody: false,
    cameraDistance: 1,
    solarSystemData: {
        real: realSolarSystemData,
        toon: toonSolarSystemData,
    },
};

const DEFAULT_USER_SETTINGS = {
    showLabels: true,
    showOrbitPaths: true,
    showDebugInfo: false,
    enableMusic: true,
    actualScale: false,
    quality: "High",
    timeSpeedModifier: 0.25,
    focusedBody: "Mars",
};

const loadUserSetting = (key, defaultValue) => {
    const stringValue = localStorage.getItem(key);
    return stringValue ? (JSON.parse(stringValue)) : defaultValue;
};

const saveUserSetting = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const store = new Store({
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
export const updateAppSetting = (key, value) => {
    store.update((s) => {
        //@ts-ignore
        s.appSettings[key] = value;
    });
};

export const updateUserSetting = (key, value) => {
    store.update((s) => {
        //@ts-ignore
        s.userSettings[key] = value;
    });
};

export const updateRefSetting = (key, value) => {
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
/**
 * data: https://nssdc.gsfc.nasa.gov/planetary/factsheet/
 * albedo data: https://en.wikipedia.org/wiki/Albedo
 * textures: https://www.solarsystemscope.com/textures/
 */
export type AstronomicalBodyProps = {
  name: string;
  color: number;
  radius: number; // km
  rotationPeriod: number; // hours
  axialTilt: number; // degrees
  albedo: number;
  textureSrc?: string;
  isLight?: boolean;
  ring?: {
    color: number;
    innerRadius: number; // km
    outerRadius: number; // km
    textureSrc?: string;
  };
  orbit: {
    color: number;
    radius: number; // km
    rotationPeriod: number; // days
    inclination: number; // degrees
  };
  satellites: AstronomicalBodyProps[];
};

export const realSolarSystemData: AstronomicalBodyProps = {
  name: "Sun",
  color: 0xfdfbd3,
  albedo: 1,
  radius: 1392700 / 2,
  rotationPeriod: 587.3,
  axialTilt: 7.25,
  textureSrc: "/assets/2k_sun.jpeg",
  isLight: true,
  orbit: {
    color: 0xfdfbd3,
    radius: 0,
    rotationPeriod: 0,
    inclination: 0,
  },
  satellites: [
    {
      name: "Mercury",
      color: 0x1a1a1a,
      albedo: 0.142,
      radius: 4879 / 2,
      rotationPeriod: 1407.6,
      axialTilt: 0.034,
      textureSrc: "/assets/2k_mercury.jpeg",
      orbit: {
        color: 0xa38f84,
        radius: 57900000,
        rotationPeriod: 88.0,
        inclination: 7.0,
      },
      satellites: [],
    },
    {
      name: "Venus",
      color: 0xe6e6e6,
      albedo: 0.689,
      radius: 12104 / 2,
      rotationPeriod: -5832.5,
      axialTilt: 177.4,
      textureSrc: "/assets/2k_venus_atmosphere.jpeg",
      orbit: {
        color: 0x9e8959,
        radius: 108200000,
        rotationPeriod: 224.7,
        inclination: 3.4,
      },
      satellites: [],
    },
    {
      name: "Earth",
      color: 0x2f6a69,
      albedo: 0.434,
      radius: 12756 / 2,
      rotationPeriod: 23.9,
      axialTilt: 23.4,
      textureSrc: "/assets/2k_earth.jpeg",
      orbit: {
        color: 0x008545,
        radius: 149600000,
        rotationPeriod: 365.2,
        inclination: 0,
      },
      satellites: [
        {
          name: "Moon",
          color: 0x888888,
          albedo: 0.14,
          radius: 3475 / 2,
          rotationPeriod: 655.7,
          axialTilt: 6.7,
          textureSrc: "/assets/2k_moon.jpeg",
          orbit: {
            color: 0x666666,
            radius: 384000,
            rotationPeriod: 27.3,
            inclination: 5.1,
          },
          satellites: [],
        },
      ],
    },
    {
      name: "Mars",
      color: 0x993d00,
      albedo: 0.17,
      radius: 6792 / 2,
      rotationPeriod: 24.6,
      axialTilt: 25.2,
      textureSrc: "/assets/2k_mars.jpeg",
      orbit: {
        color: 0x9c3100,
        radius: 228000000,
        rotationPeriod: 687.0,
        inclination: 1.8,
      },
      satellites: [
        {
          name: "Phobos",
          color: 0x84776f,
          albedo: 0.07,
          radius: 11.4,
          rotationPeriod: 0.31891 * 24,
          axialTilt: 0,
          orbit: {
            color: 0x84776f,
            radius: 9378,
            rotationPeriod: 0.31891,
            inclination: 1.08,
          },
          satellites: [],
        },
        {
          name: "Deimos",
          color: 0x90887e,
          albedo: 0.08,
          radius: 6.0,
          rotationPeriod: 1.26244 * 24,
          axialTilt: 0,
          orbit: {
            color: 0x90887e,
            radius: 23459,
            rotationPeriod: 1.26244,
            inclination: 1.79,
          },
          satellites: [],
        },
      ],
    },
    {
      name: "Jupiter",
      color: 0xb07f35,
      albedo: 0.538,
      radius: 142984 / 2,
      rotationPeriod: 9.9,
      axialTilt: 3.1,
      textureSrc: "/assets/2k_jupiter.jpeg",
      orbit: {
        color: 0xa15f00,
        radius: 778500000,
        rotationPeriod: 4331,
        inclination: 1.3,
      },
      satellites: [],
    },
    {
      name: "Saturn",
      color: 0xb08f36,
      albedo: 0.499,
      radius: 120536 / 2,
      rotationPeriod: 10.7,
      axialTilt: 26.7,
      textureSrc: "/assets/2k_saturn.jpeg",
      ring: {
        color: 0xb08f36,
        innerRadius: 60268 / 2,
        outerRadius: 139826 / 2,
        textureSrc: "/assets/2k_saturn_ring_alpha.png",
      },
      orbit: {
        color: 0xa1840e,
        radius: 1432000000,
        rotationPeriod: 10747,
        inclination: 2.5,
      },
      satellites: [],
    },
    {
      name: "Uranus",
      color: 0x5580aa,
      albedo: 0.488,
      radius: 51118 / 2,
      rotationPeriod: -17.2,
      axialTilt: 97.8,
      textureSrc: "/assets/2k_uranus.jpeg",
      orbit: {
        color: 0x51a6a9,
        radius: 2867000000,
        rotationPeriod: 30589,
        inclination: 0.8,
      },
      satellites: [],
    },
    {
      name: "Neptune",
      color: 0x366896,
      albedo: 0.442,
      radius: 49528 / 2,
      rotationPeriod: 16.1,
      axialTilt: 28.3,
      textureSrc: "/assets/2k_neptune.jpeg",
      orbit: {
        color: 0x002d92,
        radius: 4515000000,
        rotationPeriod: 59800,
        inclination: 1.8,
      },
      satellites: [],
    },
    {
      name: "Pluto",
      color: 0xdad7ce,
      albedo: 0.52,
      radius: 2376 / 2,
      rotationPeriod: -153.3,
      axialTilt: 122.5,
      textureSrc: "/assets/2k_ceres_fictional.jpeg",
      orbit: {
        color: 0x554535,
        radius: 5906400000,
        rotationPeriod: 90560,
        inclination: 17.2,
      },
      satellites: [],
    },
  ],
};

export const toonSolarSystemData: AstronomicalBodyProps = {
  name: "Sun",
  color: 0xfdfbd3,
  albedo: 1,
  radius: 100000,
  rotationPeriod: 587.3,
  axialTilt: 7.25,
  textureSrc: "/assets/2k_sun.jpeg",
  isLight: true,
  orbit: {
    color: 0xfdfbd3,
    radius: 0,
    rotationPeriod: 0,
    inclination: 0,
  },
  satellites: [
    {
      name: "Mercury",
      color: 0x1a1a1a,
      albedo: 0.142,
      radius: 10000,
      rotationPeriod: 1407.6,
      axialTilt: 0.034,
      textureSrc: "/assets/2k_mercury.jpeg",
      orbit: {
        color: 0xa38f84,
        radius: 200000,
        rotationPeriod: 88.0,
        inclination: 0,
      },
      satellites: [],
    },
    {
      name: "Venus",
      color: 0xe6e6e6,
      albedo: 0.689,
      radius: 15000,
      rotationPeriod: -5832.5,
      axialTilt: 177.4,
      textureSrc: "/assets/2k_venus_atmosphere.jpeg",
      orbit: {
        color: 0x9e8959,
        radius: 300000,
        rotationPeriod: 224.7,
        inclination: 0,
      },
      satellites: [],
    },
    {
      name: "Earth",
      color: 0x2f6a69,
      albedo: 0.434,
      radius: 16000,
      rotationPeriod: 23.9,
      axialTilt: 23.4,
      textureSrc: "/assets/2k_earth.jpeg",
      orbit: {
        color: 0x008545,
        radius: 400000,
        rotationPeriod: 365.2,
        inclination: 0,
      },
      satellites: [
        {
          name: "Moon",
          color: 0x888888,
          albedo: 0.14,
          radius: 4000,
          rotationPeriod: 655.7,
          axialTilt: 6.7,
          textureSrc: "/assets/2k_moon.jpeg",
          orbit: {
            color: 0x666666,
            radius: 50000,
            rotationPeriod: 27.3,
            inclination: 0,
          },
          satellites: [],
        },
      ],
    },
    {
      name: "Mars",
      color: 0x993d00,
      albedo: 0.17,
      radius: 12000,
      rotationPeriod: 24.6,
      axialTilt: 25.2,
      textureSrc: "/assets/2k_mars.jpeg",
      orbit: {
        color: 0x9c3100,
        radius: 500000,
        rotationPeriod: 687.0,
        inclination: 0,
      },
      satellites: [
        {
          name: "Phobos",
          color: 0x84776f,
          albedo: 0.07,
          radius: 500,
          rotationPeriod: 0.31891 * 24,
          axialTilt: 0,
          orbit: {
            color: 0x84776f,
            radius: 20000,
            rotationPeriod: 0.31891,
            inclination: 0,
          },
          satellites: [],
        },
        {
          name: "Deimos",
          color: 0x90887e,
          albedo: 0.08,
          radius: 250,
          rotationPeriod: 1.26244 * 24,
          axialTilt: 0,
          orbit: {
            color: 0x90887e,
            radius: 30000,
            rotationPeriod: 1.26244,
            inclination: 0,
          },
          satellites: [],
        },
      ],
    },
    {
      name: "Jupiter",
      color: 0xb07f35,
      albedo: 0.538,
      radius: 70000,
      rotationPeriod: 9.9,
      axialTilt: 3.1,
      textureSrc: "/assets/2k_jupiter.jpeg",
      orbit: {
        color: 0xa15f00,
        radius: 675000,
        rotationPeriod: 4331,
        inclination: 0,
      },
      satellites: [],
    },
    {
      name: "Saturn",
      color: 0xb08f36,
      albedo: 0.499,
      radius: 60000,
      rotationPeriod: 10.7,
      axialTilt: 26.7,
      textureSrc: "/assets/2k_saturn.jpeg",
      ring: {
        color: 0xb08f36,
        innerRadius: 30000,
        outerRadius: 70000,
        textureSrc: "/assets/2k_saturn_ring_alpha.png",
      },
      orbit: {
        color: 0xa1840e,
        radius: 900000,
        rotationPeriod: 10747,
        inclination: 0,
      },
      satellites: [],
    },
    {
      name: "Uranus",
      color: 0x5580aa,
      albedo: 0.488,
      radius: 50000,
      rotationPeriod: -17.2,
      axialTilt: 97.8,
      textureSrc: "/assets/2k_uranus.jpeg",
      orbit: {
        color: 0x51a6a9,
        radius: 1100000,
        rotationPeriod: 30589,
        inclination: 0,
      },
      satellites: [],
    },
    {
      name: "Neptune",
      color: 0x366896,
      albedo: 0.442,
      radius: 49000,
      rotationPeriod: 16.1,
      axialTilt: 28.3,
      textureSrc: "/assets/2k_neptune.jpeg",
      orbit: {
        color: 0x002d92,
        radius: 1300000,
        rotationPeriod: 59800,
        inclination: 0,
      },
      satellites: [],
    },
    {
      name: "Pluto",
      color: 0xdad7ce,
      albedo: 0.52,
      radius: 6000,
      rotationPeriod: -153.3,
      axialTilt: 122.5,
      textureSrc: "/assets/2k_ceres_fictional.jpeg",
      orbit: {
        color: 0x554535,
        radius: 1500000,
        rotationPeriod: 90560,
        inclination: 0,
      },
      satellites: [],
    },
  ],
};

const normalizeBodyData = (body: AstronomicalBodyProps) => {
  body.rotationPeriod = body.rotationPeriod === 0 ? body.rotationPeriod : 24 / body.rotationPeriod;
  body.axialTilt = (body.axialTilt * Math.PI) / 180;
  body.orbit.rotationPeriod =
    body.orbit.rotationPeriod === 0 ? body.orbit.rotationPeriod : 1 / body.orbit.rotationPeriod;
  body.orbit.inclination = (body.orbit.inclination * Math.PI) / 180;
  body.albedo = body.albedo * 100;
  body.satellites.forEach((satellite) => normalizeBodyData(satellite));
};

normalizeBodyData(realSolarSystemData);
normalizeBodyData(toonSolarSystemData);

import { AstronomicalBodyProps } from "../data/astronomicalBodyData";

type BodyMap = {
  name: string;
  level: number;
};

const getBodyName = (bodyNames: BodyMap[], body: AstronomicalBodyProps, level: number) => {
  bodyNames.push({ name: body.name, level });

  body.satellites.forEach((satellite) => {
    getBodyName(bodyNames, satellite, level + 1);
  });
};

const getBodyNames = (body: AstronomicalBodyProps): BodyMap[] => {
  const bodyNames: BodyMap[] = [];
  getBodyName(bodyNames, body, -1);
  bodyNames[0].level = 0;
  return bodyNames;
};

export default getBodyNames;
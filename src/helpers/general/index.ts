export const isFn = (data: unknown) => typeof data === "function";
const isNumber = (data: unknown) => typeof data === "number";

export const getRandomNumber = (min = 0, max = 1, decimal?: boolean) => {
  let random = Math.random() * (max - min);
  if (!decimal) {
    random = Math.round(random);
  }
  return min + random;
};

export const getRandomCharacters = (length: number, characters: string) => {
  let string = "";

  for (let index = 0; index < length; index++) {
    const characterIndex = Math.round(Math.random() * (characters.length - 1));
    string += characters[characterIndex];
  }

  return string;
};

export function getPathLength(path: SVGPathElement) {
  const length = path.getTotalLength();
  const actualWidth = path.getBoundingClientRect().width;
  const realWidth = path.getBBox().width;

  // TODO: This calculation only works if the scale is done by
  // width and height equally.

  const scale = actualWidth / realWidth || 1;

  return length * scale;
}

export { isNumber };

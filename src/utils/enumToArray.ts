const stringIsNumber = (value: string | number) => !isNaN(Number(value));

// Turn enum into array
const toArray = (enumme: any) => {
  return Object.keys(enumme)
    .filter(stringIsNumber)
    .map(key => enumme[key as any]);
};

export default toArray;

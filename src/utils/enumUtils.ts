export const toEnumValue = <T>(
  enumObj: T,
  value: string,
): T[keyof T] | undefined => {
  const enumValues = Object.values(enumObj) as string[];
  if (enumValues.includes(value)) {
    return value as T[keyof T];
  }
  return undefined;
};

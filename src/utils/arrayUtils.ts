export const chunkArray = <T>(array: readonly T[], chunkSize: number) => {
  const chunks: (readonly T[])[] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

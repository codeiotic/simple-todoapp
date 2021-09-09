const truncate = (input: string): string =>
  input.length > 15 ? `${input.substring(0, 15)}...` : input;

export default truncate;

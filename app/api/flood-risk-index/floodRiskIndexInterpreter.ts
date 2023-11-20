export function getInterpretation(value: number) {
  if (value <= 100) {
    return "Your rectangle is small";
  }
  if (value <= 500) {
    return "Your rectangle is medium";
  }
  if (value <= 1000) {
    return "Your rectangle is large";
  } else {
    return "Your rectangle is super large!";
  }
}

export function getInterpretation(value: number) {
  if (value <= 0.2) {
    return "Low risk";
  }
  if (value <= 0.5) {
    return "Medium risk";
  }
  if (value <= 0.8) {
    return "High Risk";
  } else {
    return "Flood prone";
  }
}

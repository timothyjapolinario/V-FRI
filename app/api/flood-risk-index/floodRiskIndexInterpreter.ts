export function getInterpretation(value: number) {
  if (value <= 0.247) {
    return "Very Low Flood Risk";
  }
  if (value <= 0.494) {
    return "Low Flood Risk";
  }
  if (value <= 0.742) {
    return "Moderate Flood Risk";
  }
  if (value <= 0.989) {
    return "Severe Flood Risk";
  } else {
    return "Flood prone";
  }
}

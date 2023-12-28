export const calculateHazard = (hazardCountValues: number[]) => {
  const returnVal = hazardCountValues.reduce((total, num) => {
    let toAdd = 0;
    if (num === 1) {
      toAdd = 0.4;
    } else if (num === 0) {
      toAdd = 0.05;
    } else {
      toAdd = Math.log(num);
    }
    return total + toAdd;
  }, 0);

  return returnVal;
};

export const calculateExposure = (exposureValues: number[]) => {
  const minX = 33.34;
  const maxX = 448.97;

  const returnVal = exposureValues.reduce((total, num) => {
    let toAdd = 0;
    if (num === 1) {
      toAdd = 0.4;
    } else if (num === 0) {
      toAdd = 0.05;
    } else {
      toAdd =
        (Math.log(num) - Math.log(minX)) / (Math.log(maxX) - Math.log(minX));
    }
    return total + toAdd;
  }, 0);

  return returnVal;
};

export const calculateVulnerability = (exposureValues: number[]) => {
  const minX = 1;
  const maxX = 38;

  const returnVal = exposureValues.reduce((total, num) => {
    let toAdd = 0;
    if (num === 1) {
      toAdd = 0.95;
    } else {
      toAdd =
        (Math.log(num) - Math.log(minX)) / (Math.log(maxX) - Math.log(minX));
    }
    return total + toAdd;
  }, 0);

  return 1 - returnVal;
};

export const calculateCapacity = (capacityValues: number[]) => {
  const maxX = 7;

  const returnVal = capacityValues.reduce((total, num) => {
    let toAdd = 0;
    if (num === 1) {
      toAdd = 0.2;
    } else if (num === 0) {
      toAdd = 0.05;
    } else {
      toAdd = Math.log(num) / Math.log(maxX);
    }
    return total + toAdd;
  }, 0);

  return returnVal / capacityValues.length;
};

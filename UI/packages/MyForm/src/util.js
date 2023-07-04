export const deepClone = (obj) => {
  if (!obj && typeof obj !== "object") {
    throw new Error("非数组或对象");
  } else {
    const cloneObj = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          cloneObj[key] = deepClone(obj[key]);
        } else {
          cloneObj[key] = obj[key];
        }
      }
    }
    return cloneObj;
  }
};

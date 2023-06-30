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

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export function handleProp(prop) {
  const propArr = prop.split(".");
  if (propArr.length === 1) {
    return prop;
  }
  return propArr[propArr.length - 1];
}

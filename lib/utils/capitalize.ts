const capitalize = (str: string): string => {
  const stringArray = str.split(" ");
  let finalStr = "";
  stringArray.forEach((singleStr) => {
    finalStr +=
      singleStr.charAt(0).toUpperCase() +
      singleStr.slice(1).toLowerCase() +
      " ";
  });

  return finalStr;
};

export default capitalize;

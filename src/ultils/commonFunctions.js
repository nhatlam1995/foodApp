const addCommas = number => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = number => number.toString().replace(/[^0-9]/g, "");

export const thousand = (number) => {
    const formatted = addCommas(removeNonNumeric(number));
    return formatted
}

export const objectIsNull = object => {
    if (object === null || object === undefined) {
      return true;
    } else {
      return false;
    }
  };

export const arrayIsEmpty = array => {
    if (objectIsNull(array) || array.length === 0) {
      return true;
    } else {
      return false;
    }
  };
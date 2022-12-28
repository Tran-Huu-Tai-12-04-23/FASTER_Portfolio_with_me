export const getData = async (id) => {
  const data = localStorage.getItem(`items-${id}`);
  if (data) {
    return JSON.parse(data);
  }
};
export const getColors = async (id) => {
  const colors = localStorage.getItem(`colors-${id}`);
  if (colors) {
    return JSON.parse(colors);
  }
};

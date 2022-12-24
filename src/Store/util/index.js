export const getData = async (id) => {
  const data = localStorage.getItem(`items-${id}`);
  if (data) {
    return JSON.parse(data);
  }
};

export const formatNumber = (number, options = {}) => {
    return (+number).toLocaleString(undefined, {
      useGrouping: true,
      ...options,
    });
  };
  
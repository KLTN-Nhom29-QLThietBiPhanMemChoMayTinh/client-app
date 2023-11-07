export const formatString = {
  formatNameByQuyen: (user) => {
    let str = "";
    switch (user.tenQuyen) {
      case "Giáo viên":
        str += str + "GV. ";
        break;

      default:
        str += str + "NV. ";
        break;
    }
    return str + user.name;
  },
  formatDate_MM_YYYY: (valdate) => {
    let date = new Date(valdate);
    let str = `${date.getMonth() + 1} - ${date.getFullYear()}`;
    return str;
  },
  formatNumber: () => {
    
    return Math.floor(Math.random() * 100000) + 1000;
  },
};

export const { 
  formatNameByQuyen,
  formatDate_MM_YYYY,
  formatNumber,
 } = formatString;

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

}

export const {
    formatNameByQuyen,
} = formatString;
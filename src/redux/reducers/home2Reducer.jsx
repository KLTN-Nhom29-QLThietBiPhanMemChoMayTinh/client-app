//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { setObjThongTinByMay, setObjThongTinByPhongMay } from "./homeReducer";
//phuc vụ cho ghi chú
const initialState = {
  objThongTinGhiChu: {
    arrTbi: [],
    arrPM: [],
    txtGhiChu: "",
  },
};

const home2Reducer = createSlice({
  name: "home2Reducer",
  initialState,
  reducers: {
    setObjThongTinGhiChu: (state, action) => {
      state.objThongTinGhiChu = action.payload;
    },
    setObjThongTinGhiChu_changeTbi: (state, action) => {
      state.objThongTinGhiChu = action.payload;
    },
  },
});
// exp nay de sử dụng theo cách 2
export const { setObjThongTinGhiChu } = home2Reducer.actions;
export default home2Reducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/**
 * cap nhat ghi chu - xac nhan da suawr
 * cap nhat tgian sua- noi dung - nguoi sua
 * @param {GhiChuMayTinh} objDataNew
 */
export const updateGhiChu_MayTinh_Tbi = (objDataNew) => {
  return async (dispatch) => {
    try {
      let result_saveGhiChu_MayTinh = await http.post(
        "/LuuGhiChuMayTinh",
        objDataNew
      );

      dispatch(setObjThongTinByMay(objDataNew.mayTinh));
      console.log("z");
    } catch (error) {
      alert("Lỗi hệ thống! Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:42 ~ return ~ error:", error);
    }
  };
};
/**
 * Chi chu may tinh va thiet bị
 * @param {*} param0
 * @returns
 */
export const insertGhiChuApi_MayTinh_Tbi = ({
  userLogin,
  objThongTin,
  objTTGhiChu,
}) => {
  let { arrPhanMem, arrThietBi, phong, mayTinh } = objThongTin;

  let { arrTbi, arrPM, txtTextGhiChu_Tbi, txtTextGhiChu_PM } = objTTGhiChu;

  //
  let objDataGhiChu_MayTinh_Tbi = {
    noiDung: txtTextGhiChu_Tbi,
    mayTinh: mayTinh,
    ngayBaoLoi: new Date(),
    maTKBaoLoi: userLogin.taiKhoan.maTK,
    ngaySua: "",
    nguoiSuaLoi: "",
  };

  return async (dispatch) => {
    try {
      //2. duyệt Ds PM có trong phòng
      // 3. duyệt DS PM được check trong modal Ghi chu
      // tìm PM nào check thì update vs status false (khog hỏng) - ngược lại true( bị hỏng)
      //
      let result_saveGhiChu_MayTinh = await http.post(
        "/LuuGhiChuMayTinh",
        objDataGhiChu_MayTinh_Tbi
      );

      // duyệt tường tụ PM
      arrThietBi.forEach(async (item) => {
        let index = arrTbi.findIndex((e) => e.maThietBi === item.maThietBi);
        let saveMayTinh_ThietBi = {};
        if (index >= 0) {
          // luu
          saveMayTinh_ThietBi = {
            mayTinh,
            thietBi: item,
            status: false,
          };
        } else {
          // update hong
          // luu
          saveMayTinh_ThietBi = {
            mayTinh,
            thietBi: item,
            status: true,
          };
        }

        await http.post("/LuuMayTinhThietBi", saveMayTinh_ThietBi);
      });

      let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);
      setTimeout(async () => {
        // giups reload laij page home
        dispatch(setObjThongTinByPhongMay(objUpdate.data));

        dispatch(setObjThongTinByMay(mayTinh));
      }, 1000);
      alert("Ghi chú thành công.");
    } catch (error) {
      alert("Ghi chú không thành công - lỗi kết nối. Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:39 ~ return ~ error:", error);
    }
  };
};
/**
 * Ghi chu phong may phan mem
 *
 * @param {*} param0
 * @returns
 */
export const insertGhiChu_PhongMay_Api = ({
  userLogin,
  objThongTin,
  objTTGhiChu,
}) => {
  let { arrPhanMem, arrThietBi, phong, mayTinh } = objThongTin;

  let { arrTbi, arrPM, txtTextGhiChu_Tbi, txtTextGhiChu_PM } = objTTGhiChu;

  //
  let objDataGhiChu_PhongMay_PM = {
    noiDung: txtTextGhiChu_PM,
    ngayBaoLoi: new Date(),
    phongMay: phong,
    maTKBaoLoi: userLogin.taiKhoan.maTK,
    nguoiSuaLoi: "",
    ngaySua: "",
  };

  return async (dispatch) => {
    try {
      // 1. luu ghi chú
      let result_saveGhiChu_PhongMay = await http.post(
        "/LuuGhiChuPhongMay",
        objDataGhiChu_PhongMay_PM
      );

      //2. duyệt Ds PM có trong phòng
      // 3. duyệt DS PM được check trong modal Ghi chu
      // tìm PM nào check thì update vs status false (khog hỏng) - ngược lại true( bị hỏng)
      //
      arrPhanMem.forEach(async (item) => {
        let index = arrPM.findIndex((e) => e.maPhanMem === item.maPhanMem);
        let savePhongMay_PhanMem = {};
        if (index >= 0) {
          // luu
          savePhongMay_PhanMem = {
            phongMay: phong,
            phanMem: item,
            status: false,
          };
        } else {
          // update hong
          // luu
          savePhongMay_PhanMem = {
            phongMay: phong,
            phanMem: item,
            status: true,
          };
        }

        await http.post("/LuuPhongMayPhanMem", savePhongMay_PhanMem);
      });
      //
      //4.khi người dùng đứng ở chon phòng (chưa chọn máy tính)
      setTimeout(async () => {
        // giups reload laij page home
        let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);
        dispatch(setObjThongTinByPhongMay(objUpdate.data));
      }, 1000);
      alert("Ghi chú thành công.");
      return;
    } catch (error) {
      alert("Ghi chú không thành công - lỗi kết nối. Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:39 ~ return ~ error:", error);
    }
  };
};

/**
 * tao mọt ghi chu ={ userLogin, objThongTin, objTTGhiChu }
 * @param {*} param0
 * @returns
 */
export const insertGhiChuApi = ({ userLogin, objThongTin, objTTGhiChu }) => {
  let { arrPhanMem, arrThietBi, phong, mayTinh } = objThongTin;

  let { arrTbi, arrPM, txtTextGhiChu_Tbi, txtTextGhiChu_PM } = objTTGhiChu;

  //
  let objDataGhiChu_PhongMay_PM = {
    noiDung: txtTextGhiChu_PM,
    ngayBaoLoi: new Date(),
    phongMay: phong,
    maTKBaoLoi: userLogin.taiKhoan.maTK,
    nguoiSuaLoi: "",
    ngaySua: "",
  };
  //
  let objDataGhiChu_MayTinh_Tbi = {
    noiDung: txtTextGhiChu_Tbi,
    mayTinh: mayTinh,
    ngayBaoLoi: new Date(),
    maTKBaoLoi: userLogin.taiKhoan.maTK,
    ngaySua: "",
    nguoiSuaLoi: "",
  };

  return async (dispatch) => {
    try {
      // 1. luu ghi chú
      let result_saveGhiChu_PhongMay = await http.post(
        "/LuuGhiChuPhongMay",
        objDataGhiChu_PhongMay_PM
      );

      //2. duyệt Ds PM có trong phòng
      // 3. duyệt DS PM được check trong modal Ghi chu
      // tìm PM nào check thì update vs status false (khog hỏng) - ngược lại true( bị hỏng)
      //
      arrPhanMem.forEach(async (item) => {
        let index = arrPM.findIndex((e) => e.maPhanMem === item.maPhanMem);
        let savePhongMay_PhanMem = {};
        if (index >= 0) {
          // luu
          savePhongMay_PhanMem = {
            phongMay: phong,
            phanMem: item,
            status: false,
          };
        } else {
          // update hong
          // luu
          savePhongMay_PhanMem = {
            phongMay: phong,
            phanMem: item,
            status: true,
          };
        }

        await http.post("/LuuPhongMayPhanMem", savePhongMay_PhanMem);
      });
      //
      if (arrTbi.length === 0) {
        //4.khi người dùng đứng ở chon phòng (chưa chọn máy tính)
        setTimeout(async () => {
          // giups reload laij page home
          let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);
          dispatch(setObjThongTinByPhongMay(objUpdate.data));
        }, 1000);
        alert("Ghi chú thành công.");
        return;
      }

      //
      let result_saveGhiChu_MayTinh = await http.post(
        "/LuuGhiChuMayTinh",
        objDataGhiChu_MayTinh_Tbi
      );

      // duyệt tường tụ PM
      arrThietBi.forEach(async (item) => {
        let index = arrTbi.findIndex((e) => e.maThietBi === item.maThietBi);
        let saveMayTinh_ThietBi = {};
        if (index >= 0) {
          // luu
          saveMayTinh_ThietBi = {
            mayTinh,
            thietBi: item,
            status: false,
          };
        } else {
          // update hong
          // luu
          saveMayTinh_ThietBi = {
            mayTinh,
            thietBi: item,
            status: true,
          };
        }

        await http.post("/LuuMayTinhThietBi", saveMayTinh_ThietBi);
      });

      // let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);
      setTimeout(async () => {
        // giups reload laij page home
        // dispatch(setObjThongTinByPhongMay(objUpdate.data));

        dispatch(setObjThongTinByMay(mayTinh));
      }, 500);
      alert("Ghi chú thành công.");
    } catch (error) {
      alert("Ghi chú không thành công - lỗi kết nối. Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:39 ~ return ~ error:", error);
    }
  };
};

export const setThongTinObjGhiChuRedux = (objThongTin) => {
  return async (dispatch) => {
    let { arrPhanMem, arrThietBi } = objThongTin;
    let arrTbi = [];
    let arrPM = [];

    if (arrPhanMem.length !== 0) {
      arrPM = arrPhanMem.filter((item) => {
        return !item.trangThaiPM;
      });
    }
    if (arrThietBi.length !== 0) {
      arrTbi = arrThietBi.filter((item) => {
        return !item.trangThaiTbi;
      });
    }
    //txtGhiChu sau co the lay theo /DSGhiChuTheoPhongMay/{maPhong}
    let objData = {
      arrPM,
      arrTbi,
      txtGhiChu: "",
    };

    dispatch(setObjThongTinGhiChu(objData));
  };
};

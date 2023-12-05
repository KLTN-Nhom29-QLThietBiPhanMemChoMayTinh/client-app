//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate2, http } from "../../util/config";
import {
  setObjThongTinByMay,
  setObjThongTinByPhongMay,
  setObjThongTinByTang,
} from "./homeReducer";
import { setArrPhongMay_GhiChuAction } from "./phongMayReducer";
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
 *
 * @param {can ma thiete bij de cap nhatj phongMayPhanMem} phanMem
 * @param {maphong de update ghi chu - update PhanmemThietBI} phong
 * @param {reload lại page home} phong
 * @returns
 */
export const updateGhiChu_PhongMay_PM_btnSuaPM = (
  maTK,
  txtNoiDung,
  phanMem,
  arrPhongMay_GhiChu,
  phong,
  tang
) => {
  console.log(maTK, txtNoiDung, phanMem, arrPhongMay_GhiChu, phong, tang);
  return async (dispatch) => {
    try {
      let result_ObjGhiChuGanNhat_maPhong = await http.get(
        `/GhiChuPhongMayGanNhatTheoPhongMay/${phong.maPhong}`
      );
      console.log(result_ObjGhiChuGanNhat_maPhong.data);

      let objGhiChu = { ...result_ObjGhiChuGanNhat_maPhong.data };

      let noidungNew = objGhiChu.noiDung + txtNoiDung;

      // // cap nhat laij ghi chu
      let objGhiChuNew = {
        ...objGhiChu,
        noiDung: noidungNew,
        ngaySua: new Date(),
        nguoiSuaLoi: maTK,
      };
      console.log(objGhiChuNew);
      await http.post("/LuuGhiChuPhongMay", objGhiChuNew);

      // //cap nhat PhongMayPhanMem
      let savePhongMay_PhanMem = {
        phongMay: phong,
        phanMem: phanMem,
        status: true,
      };
      console.log(savePhongMay_PhanMem);
      await http.post("/LuuPhongMayPhanMem", savePhongMay_PhanMem);

      // //

      // let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);
      // // giups reload laij page home

      // dispatch(setObjThongTinByPhongMay(objUpdate.data));
      // dispatch(setObjThongTinByMay(mayTinh));

      let arrPhongMayNew = arrPhongMay_GhiChu.map((item) => {
        if (item.maPhong === phong.maPhong) {
          let { dsGhiChuPM } = item;

          let dsGhiChuPMNew = dsGhiChuPM.map((item) => {
            if (item.maGhiChu === objGhiChu.maGhiChu) return objGhiChuNew;
            return item;
          });
          return { ...item, dsGhiChuPM: [...dsGhiChuPMNew] };
        }
        return item;
      });
      dispatch(setArrPhongMay_GhiChuAction([...arrPhongMayNew]));
      // giups reload laij page home
      dispatch(setObjThongTinByTang(tang, arrPhongMayNew));
    } catch (error) {
      alert("Lỗi hệ thống! Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:42 ~ return ~ error:", error);
    }
  };
};
/**
 *
 * @param {can ma thiete bij de cap nhatj MayTInhThietbi} thietBi
 * @param {maMay tinh de updat eghi chu - update MayTinhThietBI} mayTinh
 * @param {reload lại page home} phong
 * @returns
 */
export const updateGhiChu_MayTinh_Tbi_btnSuaTbi = (
  maTK,
  txtNoiDung,
  thietBi,
  mayTinh,
  phong
) => {
  return async (dispatch) => {
    try {
      let result_ObjGhiChuGanNhat_maMay = await http.get(
        `/GhiChuGanNhatTheoPhongMay/${mayTinh.maMay}`
      );

      let objGhiChu = { ...result_ObjGhiChuGanNhat_maMay.data };

      let noidungNew = objGhiChu.noiDung + txtNoiDung;

      // cap nhat laij ghi chu
      let objGhiChuNew = {
        ...objGhiChu,
        noiDung: noidungNew,
        ngaySua: new Date(),
        nguoiSuaLoi: maTK,
      };
      await http.post("/LuuGhiChuMayTinh", objGhiChuNew);

      //cap nhat MayTinhThietBI
      let saveMayTinh_ThietBi = {
        mayTinh,
        thietBi,
        status: true,
      };
      await http.post("/LuuMayTinhThietBi", saveMayTinh_ThietBi);

      //

      let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);
      // giups reload laij page home

      dispatch(setObjThongTinByPhongMay(objUpdate.data));
      dispatch(setObjThongTinByMay(mayTinh));

      console.log("z");
    } catch (error) {
      alert("Lỗi hệ thống! Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:42 ~ return ~ error:", error);
    }
  };
};
/**
 * cap nhat ghi chu - xac nhan da suawr
 * cap nhat tgian sua- noi dung - nguoi sua
 * @param {GhiChuPhanMem} objDataNew
 * @param {phong dang ở dể có the reload lại} phong
 */
export const updateGhiChu_MayTinh_PM = (
  objDataNew,
  phong,
  tang,
  arrPhongMay_GhiChu
) => {
  return async (dispatch) => {
    try {
      let result_saveGhiChu_PhongMay = await http.post(
        "/LuuGhiChuPhongMay",
        objDataNew
      );
      let arrPhongMayNew = arrPhongMay_GhiChu.map((item) => {
        if (item.maPhong === phong.maPhong) {
          let { dsGhiChuPM } = item;

          let dsGhiChuPMNew = dsGhiChuPM.map((item) => {
            if (item.maGhiChu === objDataNew.maGhiChu) return objDataNew;
            return item;
          });
          return { ...item, dsGhiChuPM: [...dsGhiChuPMNew] };
        }
        return item;
      });
      dispatch(setArrPhongMay_GhiChuAction([...arrPhongMayNew]));
      // giups reload laij page home
      dispatch(setObjThongTinByTang(tang, arrPhongMayNew));
    } catch (error) {
      alert("Lỗi hệ thống! Vui lòng quay lại sau.");
      console.log("🚀 ~ file: home2Reducer.jsx:42 ~ return ~ error:", error);
    }
  };
};
/**
 * cap nhat ghi chu - xac nhan da suawr
 * cap nhat tgian sua- noi dung - nguoi sua
 * @param {GhiChuMayTinh} objDataNew
 * @param {phong dang ở dể có the reload lại} phong
 */
export const updateGhiChu_MayTinh_Tbi = (objDataNew, phong) => {
  return async (dispatch) => {
    try {
      let result_saveGhiChu_MayTinh = await http.post(
        "/LuuGhiChuMayTinh",
        objDataNew
      );
      let objUpdate = await http.get(`/PhongMay/${phong.maPhong}`);

      // giups reload laij page home
      dispatch(setObjThongTinByPhongMay(objUpdate.data));
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
    soThietBi: arrTbi.length,
    ngayBaoLoi: new Date(),
    maTKBaoLoi: userLogin.taiKhoan.maTK,
    ngaySua: "",
    nguoiSuaLoi: "",
  };

  return async (dispatch) => {
    try {
      //
      let result_DsGhiChuNgayHOmNay = await http.get(
        `/DSGhiChuMayTinhTheoNgayBaoLoi/${formatStringDate2()}`
      );

      //
      let objGhiChu = result_DsGhiChuNgayHOmNay.data.find((e) => {
        // if (e.mayTinh.maMay === objDataGhiChu_MayTinh_Tbi.mayTinh.maMay) {
        // }
        return e.mayTinh.maMay === objDataGhiChu_MayTinh_Tbi.mayTinh.maMay;
      });

      if (objGhiChu != null) {
        // da co ghi chu
        let noiDungNew =
          objGhiChu.noiDung + "\n" + objDataGhiChu_MayTinh_Tbi.noiDung;

        let objNew = {
          ...objGhiChu,
          noiDung: noiDungNew,
          ngayBaoLoi: new Date(),
          maTKBaoLoi: userLogin.taiKhoan.maTK,
        };
        let result_saveGhiChu_MayTinh = await http.post(
          "/LuuGhiChuMayTinh",
          objNew
        );
      } else {
        // chua co ghi chu
        let result_saveGhiChu_MayTinh = await http.post(
          "/LuuGhiChuMayTinh",
          objDataGhiChu_MayTinh_Tbi
        );
      }

      //2. duyệt Ds PM có trong phòng
      // 3. duyệt DS PM được check trong modal Ghi chu
      // tìm PM nào check thì update vs status false (khog hỏng) - ngược lại true( bị hỏng)
      //
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
    soPhanMem: arrPM.length,
    ngayBaoLoi: new Date(),
    phongMay: phong,
    maTKBaoLoi: userLogin.taiKhoan.maTK,
    nguoiSuaLoi: "",
    ngaySua: "",
  };

  return async (dispatch) => {
    try {
      //
      let result_DsGhiChuNgayHOmNay = await http.get(
        `/DSGhiChuPhongMayTheoNgayBaoLoi/${formatStringDate2()}`
      );
      //
      let objGhiChu = result_DsGhiChuNgayHOmNay.data.find((e) => {
        // if (e.phongMay.maPhong === objDataGhiChu_PhongMay_PM.phongMay.maPhong) {
        // }
        return (
          e.phongMay.maPhong === objDataGhiChu_PhongMay_PM.phongMay.maPhong
        );
      });

      if (objGhiChu != null) {
        // da co ghi chu
        let noiDungNew =
          objGhiChu.noiDung + "\n" + objDataGhiChu_PhongMay_PM.noiDung;
        let objNew = {
          ...objGhiChu,
          noiDung: noiDungNew,
          ngayBaoLoi: new Date(),
          maTKBaoLoi: userLogin.taiKhoan.maTK,
        };
        let result_saveGhiChu_PhongMay = await http.post(
          "/LuuGhiChuPhongMay",
          objNew
        );
      } else {
        // 1. luu ghi chú
        let result_saveGhiChu_PhongMay = await http.post(
          "/LuuGhiChuPhongMay",
          objDataGhiChu_PhongMay_PM
        );
      }

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
      }, 500);
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
    soPhanMem: arrPM.length,
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
    soThietBi: arrTbi.length,
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

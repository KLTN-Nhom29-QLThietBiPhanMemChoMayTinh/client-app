//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, formatStringDate3, http } from "../../util/config";
import { history } from "../..";

//
const fun_Search = (objData) => {
  let {
    arrCaThucHanh,
    valueSearch,
    valueDateFrom,
    valueDateTo,
    valueSelGiaoVien,
    valueSelBuoiTH,
    valueSelPhongMay,
  } = objData;

  return dataSearch(
    arrCaThucHanh,
    valueSearch,
    valueDateFrom,
    valueDateTo,
    valueSelGiaoVien,
    valueSelBuoiTH,
    valueSelPhongMay
  );
};
const dataSearch = (
  arrData,
  valSearch,
  valDateFrom,
  valDateTo,
  valSelGiaoVien,
  valSelBuoiTH,
  valSelPhongMay
) => {
  //
  let search = valSearch.trim().toLowerCase();

  let arrUpdate = arrData.filter((item) => {
    let tgian = new Date(item.ngayThucHanh);

    let strTietTH = `${item.tietBatDau} - ${item.tietKetThuc}`;

    return (
      (item.monHoc.maMon + "").toLowerCase().includes(search) ||
      item.monHoc.tenMon.toLowerCase().includes(search) ||
      (item.buoiSo + "").toLowerCase().includes(search) ||
      formatStringDate3(tgian).toLowerCase().includes(search) ||
      item.tenCa.toLowerCase().includes(search) ||
      strTietTH.toLowerCase().includes(search) ||
      item.giaoVien.maGiaoVien.toLowerCase().includes(search) ||
      item.phongMay.tenPhong.toLowerCase().includes(search)
    );
  });

  //
  if (valDateFrom.length > 0) {
    let dayForm = new Date(valDateFrom);
    arrUpdate = arrUpdate.filter((item) => {
      let tgianTH = new Date(item.ngayThucHanh);
      return tgianTH >= dayForm;
    });

    //
    if (valDateTo.length > 0) {
      let day = new Date(valDateTo);
      arrUpdate = arrUpdate.filter((item) => {
        let tgianTH = new Date(item.ngayThucHanh);
        return tgianTH <= day;
      });
    }
  }
  //
  if (valSelGiaoVien != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.giaoVien.maGiaoVien.includes(valSelGiaoVien);
    });
  }
  //
  if (valSelBuoiTH != -1) {
    let searchBuoiTH = valSelBuoiTH.toLowerCase();
    arrUpdate = arrUpdate.filter((item) => {
      return item.tenCa.toLowerCase().includes(searchBuoiTH);
    });
  }
  //
  if (valSelPhongMay != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.phongMay.maPhong == valSelPhongMay;
    });
  }

  //
  return [...arrUpdate];
};
//
const initialState = {
  arrCaThucHanh: [],
  arrCaThucHanhSearch: [],
  arrPhanMemByMonHoc: [],
  arrPhongByMonHoc: [],
  arrMonHoc_CaTH: [], // ds mon hoc maf chuaw cos ca thuc hanh
  objDetailCaTH: {},
  valueSearch: "",
  valueDateFrom: "",
  valueDateTo: "",
  valueSelGiaoVien: -1,
  valueSelBuoiTH: -1,
  valueSelPhongMay: -1,
};

const lichThucHanhReducer = createSlice({
  name: "lichThucHanhReducer",
  initialState,
  reducers: {
    setArrCaThucHanhAction: (state, action) => {
      state.arrCaThucHanh = action.payload;
      state.objDetailCaTH = state.arrCaThucHanh[0];

      state.arrCaThucHanhSearch = fun_Search(state);
    },
    serArrPhanMemByIdMonHocAction: (state, action) => {
      state.arrPhanMemByMonHoc = action.payload;
    },
    serArrPhongByDSPhanMem_MonHocAction: (state, action) => {
      state.arrPhongByMonHoc = action.payload;
    },
    setArrMonHoc_CaThucHanhAction: (state, action) => {
      state.arrMonHoc_CaTH = action.payload;
    },
    // search
    setObjDetailCaThucHanh: (state, action) => {
      state.objDetailCaTH = action.payload;
    },
    setValueSelSearchCaTHAction: (state, action) => {
      state.valueSearch = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    setValueSelDateFromCaTHAction: (state, action) => {
      state.valueDateFrom = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    setValueSelDateToCaTHAction: (state, action) => {
      state.valueDateTo = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    setValueSelGiaoVienCaTHAction: (state, action) => {
      state.valueSelGiaoVien = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    setvalueSelBuoiTHCaTHAction: (state, action) => {
      state.valueSelBuoiTH = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    setValueSelPhongMayCaTHAction: (state, action) => {
      state.valueSelPhongMay = action.payload;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    resetValueSearchAction: (state, action) => {
      state.valueDateFrom = "";
      state.valueDateTo = "";
      state.valueSelGiaoVien = -1;
      state.valueSelBuoiTH = -1;
      state.valueSelPhongMay = -1;
      //
      state.arrCaThucHanhSearch = fun_Search(state);
    },
    //update
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrCaThucHanhAction,
  serArrPhanMemByIdMonHocAction,
  serArrPhongByDSPhanMem_MonHocAction,
  setArrMonHoc_CaThucHanhAction,
  setObjDetailCaThucHanh,
  setValueSelSearchCaTHAction,
  setValueSelDateFromCaTHAction,
  setValueSelDateToCaTHAction,
  setValueSelGiaoVienCaTHAction,
  setvalueSelBuoiTHCaTHAction,
  setValueSelPhongMayCaTHAction,
  resetValueSearchAction,
} = lichThucHanhReducer.actions;
export default lichThucHanhReducer.reducer;
//
// Call api +++++++++++++++++++++++++++++++++++++++++++++++++

export const updateLichThucHanh = (obj_lichTH) => {
  return async (dispatch) => {
    try {
      await http.post("/LuuCaThucHanh", obj_lichTH);
      dispatch(getAllCaThucHanhApi);

      //
      history.push("/phan-cong/lich-thuc-hanh");
    } catch (error) {
      alert('Lỗi server! Vui lòng quay lại sau.')
      console.log(
        "🚀 ~ file: lichThucHanhReducer.jsx:202 ~ updateLichThucHanh ~ error:",
        error
      );
    }
  };
};

// cai này dư
export const getDsNgayTH = async (maMon) => {
  let arrData = [];
  try {
    let result = await http.get(`/DSCaThucHanhTheoMonHoc/${maMon}`);
    result.data.forEach((item) => {
      let { maCa, buoiSo, ngayThucHanh, tenCa, tietBatDau, tietKetThuc } = item;
      arrData.push({
        maCa,
        buoiSo,
        ngayThucHanh,
        tenCa,
        tietBatDau,
        tietKetThuc,
      });
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: lichThucHanhReducer.jsx:202 ~ getDsNgayTH ~ error:",
      error
    );
  }
  return [...arrData];
};
//
/**
 * 1. lay Ds mon hoc
 * 2. lays DS ca cuar mon hoc (theo ma)
 * 3. thif dsCa cua mon hoc nào không có gtri thì dưa vào arrData_MH
 * arrData_MH: ds môn học chua co ca
 * @param {*} dispatch
 */
export const setArrMonHoc_CaThucHanhApi = async (dispatch) => {
  try {
    let result_dsMonHoc = await http.get("/DSMonHoc");

    let arrData_MH = [];
    result_dsMonHoc.data.forEach(async (item) => {
      let result_CaTH_IdMonHoc = await http.get(
        `/DSCaThucHanhTheoMonHoc/${item.maMon}`
      );

      if (result_CaTH_IdMonHoc.data.length === 0) {
        arrData_MH.push(item);
      }
    });

    //
    setTimeout(() => {
      dispatch(setArrMonHoc_CaThucHanhAction([...arrData_MH]));
    }, 2000);
  } catch (error) {
    console.log("🚀 ~ file: lichThucHanhReducer.jsx:200 ~ error:", error);
  }
};
/**
 * upload laij data PM vs PHong mays theo monHOc
 * @param {*} arrPhong
 * @returns
 */
export const setThongtinKhiSelMonHoc_All = (arrPhong) => {
  return async (dispatch) => {
    dispatch(serArrPhongByDSPhanMem_MonHocAction(arrPhong));
    dispatch(serArrPhanMemByIdMonHocAction([]));
  };
};
/**
 * call all DsPhong
 * @param {*} dispatch
 */
export const getAllDsPhongHocInMonHoc = async (dispatch) => {
  try {
    let result = await http.get("/DSPhongMay");
    dispatch(serArrPhongByDSPhanMem_MonHocAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: lichThucHanhReducer.jsx:195 ~ getAllDsPhongHocInMonHoc ~ error:",
      error
    );
  }
};
/**
 * 1. tìm DS phan mem của mon hoc (theo maMon hoc)
 * 2. lấy DS Phần mềm của Phòng
 * 3. so sánh tìm phòng hợp vs môn học ( phòng nào có đủ các PM của môn học )
 * 4. cập nhật arr phong máy theo ar phong may mới (byMonHoc)
 * @param {mã môn học giúp tìm ds MonHocPhanmem } maMonHoc
 * @param {ds toàn bộ phòng (có list phần mềm)} arrPhong
 * @returns
 */
export const getDSPhong_trungPM_MonHocApi = (maMonHoc, arrPhong) => {
  return async (dispatch) => {
    try {
      //1.
      let resultMonHocPhanMem = await http.get(`/DSMonHocPhanMem/${maMonHoc}`);
      let arrPhanMemByMonHoc = [];
      //
      resultMonHocPhanMem.data.forEach((e) => {
        arrPhanMemByMonHoc.push(e.phanMem);
      });

      // 2.

      let arrPhongByMonHoc = [];

      arrPhongByMonHoc = arrPhong.filter((item) => {
        let check = 1; // true : thoa man; false không trùng PM
        let { phanMems } = item; // dsPhan mêm trong Mon hoc
        // 3.
        arrPhanMemByMonHoc.forEach((e) => {
          let maPMByMonHoc = e.maPhanMem;

          // tìm từng PM 1 trong DS Phan mem By Phong; trùng trả về gtri >= 0
          let value = phanMems.findIndex((x) => x.maPhanMem === maPMByMonHoc);

          // nếu gtri < 0 thi trong DS Phan mem By Phong không có môn học cần tìm
          if (value < 0) {
            check = 0; // cập nhật check =0 để khong them phongf vao ds phongf  có PM trùng cs PM Môn học
          }
        });

        if (check == 1) {
          return check == 1; // filter - tra ve item co check = 1
        }
      });

      //
      dispatch(serArrPhanMemByIdMonHocAction(arrPhanMemByMonHoc));
      dispatch(serArrPhongByDSPhanMem_MonHocAction(arrPhongByMonHoc));

      return arrPhongByMonHoc[0];
    } catch (error) {
      console.log(
        "🚀 ~ file: lichThucHanhReducer.jsx:197 ~ return ~ error:",
        error
      );
    }
  };
};
// dung ơ FormUpdateLichThucHanh()
export const getDSPhong_trungPM_MonHocApi3 = (maMonHoc) => {
  return async (dispatch) => {
    try {
      //1.
      let resultMonHocPhanMem = await http.get(`/DSMonHocPhanMem/${maMonHoc}`);
      let arrPhanMemByMonHoc = [];
      let result_arrPhongMay = await http.get("/DSPhongMay2");
      //
      resultMonHocPhanMem.data.forEach((e) => {
        arrPhanMemByMonHoc.push(e.phanMem);
      });

      // 2.

      let arrPhongByMonHoc = [];

      arrPhongByMonHoc = result_arrPhongMay.data.filter((item) => {
        let check = 1; // true : thoa man; false không trùng PM
        let { phanMems } = item; // dsPhan mêm trong Mon hoc
        // 3.
        arrPhanMemByMonHoc.forEach((e) => {
          let maPMByMonHoc = e.maPhanMem;

          // tìm từng PM 1 trong DS Phan mem By Phong; trùng trả về gtri >= 0
          let value = phanMems.findIndex((x) => x.maPhanMem === maPMByMonHoc);

          // nếu gtri < 0 thi trong DS Phan mem By Phong không có môn học cần tìm
          if (value < 0) {
            check = 0; // cập nhật check =0 để khong them phongf vao ds phongf  có PM trùng cs PM Môn học
          }
        });

        if (check == 1) {
          return check == 1; // filter - tra ve item co check = 1
        }
      });

      //
      dispatch(serArrPhanMemByIdMonHocAction(arrPhanMemByMonHoc));
      dispatch(serArrPhongByDSPhanMem_MonHocAction(arrPhongByMonHoc));
    } catch (error) {
      console.log(
        "🚀 ~ file: lichThucHanhReducer.jsx:197 ~ return ~ error:",
        error
      );
    }
  };
};

export const getDSPhong_trungPM_MonHocApi2 = async (maMonHoc, arrPhong) => {
  try {
    //1.
    let resultMonHocPhanMem = await http.get(`/DSMonHocPhanMem/${maMonHoc}`);
    let arrPhanMemByMonHoc = [];
    //
    resultMonHocPhanMem.data.forEach((e) => {
      arrPhanMemByMonHoc.push(e.phanMem);
    });

    // 2.

    let arrPhongByMonHoc = [];

    arrPhongByMonHoc = arrPhong.filter((item) => {
      let check = 1; // true : thoa man; false không trùng PM
      let { phanMems } = item; // dsPhan mêm trong Mon hoc
      // 3.
      arrPhanMemByMonHoc.forEach((e) => {
        let maPMByMonHoc = e.maPhanMem;

        // tìm từng PM 1 trong DS Phan mem By Phong; trùng trả về gtri >= 0
        let value = phanMems.findIndex((x) => x.maPhanMem === maPMByMonHoc);

        // nếu gtri < 0 thi trong DS Phan mem By Phong không có môn học cần tìm
        if (value < 0) {
          check = 0; // cập nhật check =0 để khong them phongf vao ds phongf  có PM trùng cs PM Môn học
        }
      });

      if (check == 1) {
        return check == 1; // filter - tra ve item co check = 1
      }
    });

    //
    // dispatch(serArrPhanMemByIdMonHocAction(arrPhanMemByMonHoc));
    // dispatch(serArrPhongByDSPhanMem_MonHocAction(arrPhongByMonHoc));

    return arrPhongByMonHoc[0];
  } catch (error) {
    console.log(
      "🚀 ~ file: lichThucHanhReducer.jsx:197 ~ return ~ error:",
      error
    );
  }
  return {};
};

/**
 * add 1 ca thuc hanh
 * @param {object} objData
 * @returns
 */
export const insertCaThucHanhApi = (objData) => {
  let { tenCa, tietBatDau, tietKetThuc, giaoVien, phongMay, monHoc } = objData;
  // ngayThucHanh - BuoiSo
  let { soBuoi, ngayBatDau } = monHoc;

  return async (dispatch) => {
    try {
      for (let i = 0; i < soBuoi; i++) {
        let ngayThucHanh = new Date(ngayBatDau);
        ngayThucHanh.setDate(ngayThucHanh.getDate() + i * 7);

        let objCaTH = { ...objData, buoiSo: i + 1, ngayThucHanh };
        await http.post("/LuuCaThucHanh", objCaTH);
      }

      dispatch(getAllCaThucHanhApi);

      setTimeout(() => {
        history.push("/phan-cong/lich-thuc-hanh");
        alert("Tạo mới thành công!");
      }, 3000);
    } catch (error) {
      console.log(
        "🚀 ~ file: lichThucHanhReducer.jsx:183 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * call ALl DS CaThucHanh
 * @param {*} dispatch
 */
export const getAllCaThucHanhApi = async (dispatch) => {
  try {
    let result = await http.get("/DSCaThucHanh");

    dispatch(setArrCaThucHanhAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: lichThucHanhReducer.jsx:36 ~ getAllCaThucHanh ~ error:",
      error
    );
  }
};

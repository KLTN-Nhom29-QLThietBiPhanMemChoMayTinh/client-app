//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";
import { history } from "../..";
import { setStatusDataMoi } from "./homeReducer";

const initialState = {
  arrPhongMay: [],
  arrPhongMaySearch: [],
  arrTangbyToaNha: [],
  valueSearch: "",
  valueSelectToaNha: "-1",
  valueSelectTang: "-1",
};

const phongMayReducer = createSlice({
  name: "phongMayReducer",
  initialState,
  reducers: {
    setArrPhongMayAction: (state, action) => {
      state.arrPhongMay = action.payload;
      state.arrPhongMaySearch = action.payload;
    },
    setValueSearchPhongMayAction: (state, action) => {
      state.valueSearch = action.payload;

      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        action.payload,
        valueSelectToaNha,
        valueSelectTang
      );
    },
    setvalueSelectToaNhaPhongMayAction: (state, action) => {
      let { valSelect, arrTang } = action.payload;

      state.valueSelectToaNha = valSelect;
      state.valueSelectTang = "-1";

      state.arrTangbyToaNha = arrTang.filter(
        (item) => item.toaNha.maToaNha == valSelect
      );

      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        valueSearch,
        valSelect,
        "-1"
      );
    },
    setvalueSelectTangPhongMayAction: (state, action) => {
      let { valSelect } = action.payload;
      state.valueSelectTang = valSelect;

      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        valueSearch,
        valueSelectToaNha,
        valSelect
      );
    },
    insertPhongMayAction: (state, action) => {},
    updatePhongMayAction: (state, action) => {
      let itemUpdate = action.payload;

      let rowToChange = state.arrPhongMay.findIndex(
        (item) => item.maPhong == itemUpdate.maPhong
      );
      state.arrPhongMay[rowToChange] = itemUpdate;
      //
      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        valueSearch,
        valueSelectToaNha,
        valueSelectTang
      );
    },
    deletePhongAction: (state, action) => {
      let maXoa = action.payload;

      let arrUpdate = state.arrPhongMay.filter(
        (item) => item.maPhong !== maXoa
      );

      state.arrPhongMay = [...arrUpdate];

      //
      let { arrPhongMay, valueSearch, valueSelectToaNha, valueSelectTang } =
        state;

      state.arrPhongMaySearch = dataSearch(
        arrPhongMay,
        valueSearch,
        valueSelectToaNha,
        valueSelectTang
      );
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrPhongMayAction,
  setValueSearchPhongMayAction,
  setvalueSelectToaNhaPhongMayAction,
  setvalueSelectTangPhongMayAction,
  updatePhongMayAction,
  deletePhongAction,
} = phongMayReducer.actions;
export default phongMayReducer.reducer;

/// =================================
const dataSearch = (arrData, valSearch, valSelectTN, valSelectTG) => {
  let search = valSearch.toLowerCase();
  let arrUpdate = arrData;
  if (valSelectTN != -1) {
    // console.log("toa nha != -1");
    if (valSelectTG != -1) {
      // console.log("tang != -1");
      arrUpdate = arrUpdate.filter((item) => {
        return (
          (item.tenPhong.toLowerCase().includes(search) ||
            item.moTa.toLowerCase().includes(search) ||
            (item.mayTinhs.length + "").toLowerCase().includes(search) ||
            (item.phanMems.length + "").toLowerCase().includes(search) ||
            item.trangThai.toLowerCase().includes(search)) &&
          item.tang.maTang == valSelectTG &&
          item.tang.toaNha.maToaNha == valSelectTN
        );
      });
    } else {
      // console.log("tang == -1");
      arrUpdate = arrUpdate.filter((item) => {
        return (
          (item.tenPhong.toLowerCase().includes(search) ||
            item.moTa.toLowerCase().includes(search) ||
            (item.mayTinhs.length + "").toLowerCase().includes(search) ||
            (item.phanMems.length + "").toLowerCase().includes(search) ||
            item.trangThai.toLowerCase().includes(search)) &&
          item.tang.toaNha.maToaNha == valSelectTN
        );
      });
    }
  } else {
    // console.log("toa nha = -1");

    if (valSelectTG != -1) {
      // console.log("tang != -1");
      arrUpdate = arrData.filter((item) => {
        return (
          (item.tenPhong.toLowerCase().includes(search) ||
            item.moTa.toLowerCase().includes(search) ||
            (item.mayTinhs.length + "").toLowerCase().includes(search) ||
            (item.phanMems.length + "").toLowerCase().includes(search) ||
            item.trangThai.toLowerCase().includes(search)) &&
          item.tang.maTang == valSelectTG
        );
      });
    } else {
      // console.log("tang == -1");
      arrUpdate = arrUpdate.filter((item) => {
        return (
          item.tenPhong.toLowerCase().includes(search) ||
          item.moTa.toLowerCase().includes(search) ||
          (item.mayTinhs.length + "").toLowerCase().includes(search) ||
          (item.phanMems.length + "").toLowerCase().includes(search) ||
          item.trangThai.toLowerCase().includes(search)
        );
      });
    }
  }

  // console.log(arrUpdate);
  return [...arrUpdate];
};

// CAll APi++++++++++++++++++++++++++++++++++++++

/**
 * - del PhongMayPHanMem theo phanMems<arr>
 * del phong theo idPhong
 */
export const deletePhongApi = (phongMay) => {
  // phongMay - Object
  return async (dispatch) => {
    try {
      phongMay.phanMems.forEach(async (item) => {
        // del phong may PM cu
        await http.delete(
          `/XoaPhongMayPhanMem/${phongMay.maPhong}/${item.maPhanMem}`
        );
      });

      await http.delete(`/XoaPhongMay/${phongMay.maPhong}`);

      dispatch(deletePhongAction(phongMay.maPhong));
      // reload data
      dispatch(setStatusDataMoi(true));
    } catch (error) {
      console.log(
        "🚀 ~ file: phongMayReducer.jsx:177 ~ deletePhongApi ~ error:",
        error
      );
    }
  };
};

/**
 * update phong may
 *  - update data phong mays
 *  - xoa het phongf mays phần mềm
 *  - tạo mới phòng máy phần mềm
 * @param {} phongMay
 * @returns
 */
export const updatePhongMayApi1 = (phongMay, phongMayOld) => {
  let phanMems_old = phongMayOld.phanMems;
  return async (dispatch) => {
    try {
      let result = await http.post(`/LuuPhongMay/`, phongMay);

      // del phong may PM cu
      phanMems_old.forEach(async (item) => {
        await http.delete(
          `/XoaPhongMayPhanMem/${phongMay.maPhong}/${item.maPhanMem}`
        );
      });
      // add Phong may PM moi

      phongMay.phanMems.forEach(async (item) => {
        let savePhongMay_PhanMem = {
          phongMay: result.data,
          phanMem: item,
          status: true,
        };
        await http.post("/LuuPhongMayPhanMem", savePhongMay_PhanMem);
      });

      dispatch(updatePhongMayAction(phongMay));
      // reload data
      dispatch(setStatusDataMoi(true));
      history.push("/quan-ly/phong");
    } catch (error) {
      console.log(
        "🚀 ~ file: phongMayReducer.jsx:175 ~ returnasync ~ error:",
        error
      );
    }
  };
};
/**
 * update phong may
 *  - update data phong mays
 *  - duyet list PM phan mêm nào được chọn trong phongmay(new) thì được dthem ngược lại del
 * @param {} phongMay
 * @returns
 */
export const updatePhongMayApi = (phongMay, arrPhanMem) => {
  let { phanMems } = phongMay;
  return async (dispatch) => {
    try {
      let result = await http.post(`/LuuPhongMay/`, phongMay);

      arrPhanMem.forEach(async (item) => {
        let rowData = phanMems.findIndex((e) => e.maPhanMem == item.maPhanMem);
        if (rowData >= 0) {
          // add Phong may PM moi
          let savePhongMay_PhanMem = {
            phongMay: result.data,
            phanMem: item,
            status: true,
          };
          await http.post("/LuuPhongMayPhanMem", savePhongMay_PhanMem);
        } else {
          // del phong may PM cu
          await http.delete(
            `/XoaPhongMayPhanMem/${phongMay.maPhong}/${item.maPhanMem}`
          );
        }
      });

      dispatch(updatePhongMayAction(phongMay));
      // reload data
      dispatch(setStatusDataMoi(true));
      history.push("/quan-ly/phong");
    } catch (error) {
      console.log(
        "🚀 ~ file: phongMayReducer.jsx:175 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * add 1 phong may và 1 list may tính
 */
export const insertPhongMayApi = (phongMay) => {
  let { tenPhong, soLuongMay, phanMem, phanCung, objToaNha, objTang, mota } =
    phongMay;

  let arrPhanMem = [...phanMem];

  // luu phong may
  let savePhong = {
    tenPhong,
    soMay: soLuongMay,
    moTa: mota,
    tang: objTang,
    trangThai: "Trống",
  };
  //
  //Luu phong máy vs Phanmem

  return async (dispatch) => {
    try {
      // luu phong may
      let result = await http.post(`/LuuPhongMay/`, savePhong);
      let { maPhong } = result.data;
      // Luu phong máy vs Phanmem

      arrPhanMem.forEach(async (item) => {
        let savePhongMay_PhanMem = {
          phongMay: result.data,
          phanMem: item,
          status: true,
        };
        await http.post("/LuuPhongMayPhanMem", savePhongMay_PhanMem);
      });

      // luu mayIinh

      let arrMayTinh = [];
      let day = new Date();

      for (let i = 0; i < soLuongMay; i++) {
        let x = i + 1;
        let mayTinh = {
          moTa: `Máy tính ${x < 10 ? "0" + x : x}`,
          ngayLapDat: day,
          trangThai: "Đang hoạt động",
          phongMay: {
            maPhong,
          },
        };
        arrMayTinh.push(mayTinh);
      }

      arrMayTinh.forEach(async (item) => {
        let resultMayTinh = await http.post("/LuuMayTinh", item);

        // luu maytinh vaf thiet bi
        phanCung.forEach(async (item) => {
          let saveMayTinhThietBi = {
            mayTinh: resultMayTinh.data,
            thietBi: item,
          };

          await http.post("/LuuMayTinhThietBi", saveMayTinhThietBi);
        });
      });

      dispatch(getAllPhongMayApi);
      alert("Tạo mới thành công.");
      dispatch(setStatusDataMoi(true)); // cap nhat trang home
      history.push("/quan-ly/phong");
    } catch (error) {
      console.log(
        "🚀 ~ file: phongMayReducer.jsx:157 ~ returnasync ~ error:",
        error
      );
    }
  };
};

/**
 * call All
 * @param {*} dispatch
 */
export const getAllPhongMayApi = async (dispatch) => {
  try {
    let result = await http.get("/DSPhongMay2");

    dispatch(setArrPhongMayAction(result.data));
  } catch (error) {
    console.log(
      "🚀 ~ file: phongMayReducer.jsx:30 ~ getAllPhongMayApi ~ error:",
      error
    );
  }
};

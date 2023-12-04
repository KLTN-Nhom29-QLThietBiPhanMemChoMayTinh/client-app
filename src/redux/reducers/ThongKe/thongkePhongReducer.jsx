//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../util/config";

const initialState = {
  sum_PM: 0,
  valueSearch: "",
  valueSelectToaNha: -1,
  valueSelectTang: -1,
  valueDateFrom_tkTheoGhiChu: "",
  valueDateTo_tkTheoGhiChu: "",
  obj_TKPhong: {},
  arrTK_DataPhong: [],
  arrTK_DataPhong_Search: [],
  arrTK_DataPhong_ghiChu: [],
  arrTK_DataPhong_ghiChu_search: [],
  valueSort: 3, // sort theo soMay
  valueSort_2: 5, // sort theo soMay
};

const thongkePhongReducer = createSlice({
  name: "thongkePhongReducer",
  initialState,
  reducers: {
    set_tk__PhongMay_Action: (state, action) => {
      state.arrTK_DataPhong = action.payload;
    },
    set_tk_valueDateFrom_tkTheoGhiChu_PhongMay_Action: (state, action) => {
      state.valueDateFrom_tkTheoGhiChu = action.payload;
    },
    set_tk_valueDateTo_tkTheoGhiChu_PhongMay_Action: (state, action) => {
      state.arrTK_valueDateTo_tkTheoGhiChuataPhong = action.payload;
    },
    set_tk_arrTK_DataPhong_ghiChu_PhongMay_Action: (state, action) => {
      state.arrTK_DataPhong_ghiChu = action.payload;
      //
      state.arrTK_DataPhong_ghiChu_search = dataSearch_arr2(state);
    },
    set_obj_TKPhong_Action: (state, action) => {
      state.arrTK_DataPhong = action.payload;
      let arrData = action.payload;
      state.arrTK_DataPhong = arrData.map((item) => {
        let { tang, mayTinhs, tenPhong, arrPhanMem } = item;
        let soPM_err = 0;
        let soMT_err = 0;
        arrPhanMem.map((item) => {
          if (!item.trangThaiPM) {
            soPM_err++;
          }
        });
        mayTinhs.map((item) => {
          if (item.trangThai.includes("Đã hỏng")) {
            soMT_err++;
          }
        });
        let objData = {
          tenPhong,
          tang,
          soMayTinh: mayTinhs.length,
          soPhanMem: arrPhanMem.length,
          soPM_err,
          soMT_err,
        };
        return objData;
      });

      state.arrTK_DataPhong_Search = funcSearch(state);
    },
    set_tk_valueSort_Action: (state, action) => {
      state.valueSort = action.payload;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
    },
    set_tk_valueSort_data2_Action: (state, action) => {
      state.valueSort_2 = action.payload;
      //
      state.arrTK_DataPhong_ghiChu_search = dataSearch_arr2(state);
    },
    set_Sum_PM: (state, action) => {
      state.sum_PM = action.payload;
    },
    set_tk_valueSearch_Action: (state, action) => {
      state.valueSearch = action.payload;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
      //
      state.arrTK_DataPhong_ghiChu_search = dataSearch_arr2(state);
    },
    set_tk_valueSelectToaNha_Action: (state, action) => {
      state.valueSelectToaNha = action.payload;
      state.valueSelectTang = -1;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
      //
      state.arrTK_DataPhong_ghiChu_search = dataSearch_arr2(state);
    },
    set_tk_valueSelectTang_Action: (state, action) => {
      state.valueSelectTang = action.payload;
      //
      state.arrTK_DataPhong_Search = funcSearch(state);
      //
      state.arrTK_DataPhong_ghiChu_search = dataSearch_arr2(state);
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  set_Sum_PM,
  set_obj_TKPhong_Action,
  set_tk_arrTK_DataPhong_ghiChu_PhongMay_Action,
  // search - sort
  set_tk_valueSelectToaNha_Action,
  set_tk_valueSelectTang_Action,
  set_tk_valueSearch_Action,
  set_tk_valueSort_Action,
  set_tk_valueSort_data2_Action,
  //
  set_tk_valueDateFrom_tkTheoGhiChu_PhongMay_Action,
  set_tk_valueDateTo_tkTheoGhiChu_PhongMay_Action,
} = thongkePhongReducer.actions;
export default thongkePhongReducer.reducer;

// +++++++++++++++++++++++++++++++++++++++++++++++++
const funcSearch = (objData) => {
  let {
    arrTK_DataPhong,
    valueSort,
    valueSearch,
    valueSelectToaNha,
    valueSelectTang,
  } = objData;

  return dataSearch(
    arrTK_DataPhong,
    valueSearch,
    valueSort,
    valueSelectToaNha,
    valueSelectTang
  );
};
const dataSearch = (arrData, valSearch, valSort, valSelect1, valSelect2) => {
  let arrUpdate = arrData;
  //
  if (valSearch.trim().length !== 0) {
    let search = valSearch.trim().toLowerCase();
    arrUpdate = arrUpdate.filter((item) => {
      return item.tenPhong.toLowerCase().includes(search);
    });
  }
  //
  if (valSelect1 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.tang.toaNha.maToaNha == valSelect1;
    });
  }
  //
  if (valSelect2 != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.tang.maTang == valSelect2;
    });
  }
  // sort
  switch (valSort) {
    case 1:
      arrUpdate.sort(sort_soPhanMem);
      break;
    case 2:
      arrUpdate.sort(sort_soPhanMem_err);
      break;
    case 4:
      arrUpdate.sort(sort_soMayTinh_err);
      break;

    default:
      arrUpdate.sort(sort_soMayTinh);
  }

  return [...arrUpdate];
};
const dataSearch_arr2 = (state) => {
  let {
    arrTK_DataPhong_ghiChu,
    valueSort_2,
    valueSearch,
    valueSelectToaNha,
    valueSelectTang,
  } = state;
  let arrUpdate = arrTK_DataPhong_ghiChu;
  //
  if (valueSearch.trim().length !== 0) {
    let search = valueSearch.trim().toLowerCase();
    arrUpdate = arrUpdate.filter((item) => {
      return item.tenPhong.toLowerCase().includes(search);
    });
  }
  //
  if (valueSelectToaNha != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.tang.toaNha.maToaNha == valueSelectToaNha;
    });
  }
  //
  if (valueSelectTang != -1) {
    arrUpdate = arrUpdate.filter((item) => {
      return item.tang.maTang == valueSelectTang;
    });
  }
  // sort
  switch (valueSort_2) {
    case 5:
      arrUpdate.sort(sort_soLanBaoLoiPhongMay);
      break;
    case 6:
      arrUpdate.sort(sort_soLanBaoLoiPhanMem);
      break;

    default:
      break;
  }

  return [...arrUpdate];
};
//
const sort_soLanBaoLoiPhongMay = (a, b) => {
  let valuea = a.soLanPhongMay_err;
  let valueb = b.soLanPhongMay_err;
  return valueb - valuea;
};
//
const sort_soLanBaoLoiPhanMem = (a, b) => {
  let valuea = a.soLanPhanMem_err;
  let valueb = b.soLanPhanMem_err;
  return valueb - valuea;
};
//
const sort_soMayTinh = (a, b) => {
  let valuea = a.soMayTinh;
  let valueb = b.soMayTinh;
  return valueb - valuea;
};
//
const sort_soMayTinh_err = (a, b) => {
  let valuea = a.soMT_err;
  let valueb = b.soMT_err;
  return valueb - valuea;
};
//
const sort_soPhanMem_err = (a, b) => {
  return b.soPM_err - a.soPM_err;
};
//
const sort_soPhanMem = (a, b) => {
  return b.soPhanMem - a.soPhanMem;
};
// +++++++++++++++++++++++++++++++++++++++++++++++++
export const getData_arrTK_DataPhong_ghiChu_date_api = (date_sort_table1) => {
  return async (dispatch) => {
    let { from, to } = date_sort_table1;
    console.log(from, to);
    let dateFrom = new Date(from);
    let dateTo = new Date(to);

    const result_DSPhong = await http.get("/DSPhongMay");

    let arrDataPhong = [];
    result_DSPhong.data.forEach(async (item) => {
      // ds ghi chu Phong may  -theo ma
      //@GetMapping("/DSGhiChuPhongMayTheoPhongMay/{maPhong}")
      let result_DSGhiChuPhong = await http.get(
        `/DSGhiChuPhongMayTheoPhongMay/${item.maPhong}`
      );

      let soLanPhongMay_err = 0;
      let soLanPhanMem_err = 0;
      result_DSGhiChuPhong.data.forEach((item) => {
        let ngayBaoLoi = new Date(item.ngayBaoLoi);
        if (
          dateFrom.getTime() <= ngayBaoLoi.getTime() &&
          ngayBaoLoi.getTime() <= dateTo.getTime()
        ) {
          soLanPhanMem_err += item.soPhanMem;
          soLanPhongMay_err++;
        }
      });

      arrDataPhong.push({ ...item, soLanPhongMay_err, soLanPhanMem_err });
    });

    setTimeout(() => {
      dispatch(set_tk_arrTK_DataPhong_ghiChu_PhongMay_Action(arrDataPhong));
    }, 500);
  };
};
//
export const getData_arrTK_DataPhong_ghiChu_api = async (dispatch) => {
  try {
    const result_DSPhong = await http.get("/DSPhongMay");

    let arrDataPhong = [];
    result_DSPhong.data.forEach(async (item) => {
      // ds ghi chu Phong may  -theo ma
      //@GetMapping("/DSGhiChuPhongMayTheoPhongMay/{maPhong}")
      let result_DSGhiChuPhong = await http.get(
        `/DSGhiChuPhongMayTheoPhongMay/${item.maPhong}`
      );

      // let arrGhiChuZ = result_DSGhiChuPhong.data.map((item) => {
      //   return { ...item, phongMay: null };
      // });
      let soLanPhongMay_err = result_DSGhiChuPhong.data.length;
      let soLanPhanMem_err = 0;
      result_DSGhiChuPhong.data.forEach((item) => {
        soLanPhanMem_err += item.soPhanMem;
      });

      arrDataPhong.push({ ...item, soLanPhongMay_err, soLanPhanMem_err });
    });

    setTimeout(() => {
      dispatch(set_tk_arrTK_DataPhong_ghiChu_PhongMay_Action([...arrDataPhong]));
    }, 500);
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkePhongReducer.jsx:182 ~ constgetData_arrTK_DataPhong_ghiChu_api= ~ error:",
      error
    );
  }
};
//
export const getData_TkPhong_Api = async (dispatch) => {
  try {
    const result_DSPhong = await http.get("/DSPhongMay");

    let arrDataPhong = [];
    result_DSPhong.data.forEach(async (item) => {
      let arrPhanMem = [];
      let resultPM = await http.get(
        `/DSPhongMayPhanMemTheoMaPhong/${item.maPhong}`
      );
      if (resultPM.data.length !== 0) {
        arrPhanMem = resultPM.data.map((e) => {
          return { ...e.phanMem, trangThaiPM: e.status };
        });
      }

      arrDataPhong.push({ ...item, arrPhanMem });
    });
    // lays ds PM - de co sum PM
    let resultPM = await http.get("/DSPhanMem");

    setTimeout(() => {
      dispatch(set_Sum_PM(resultPM.data.length));
      dispatch(set_obj_TKPhong_Action(arrDataPhong));
    }, 1000);
  } catch (error) {
    console.log(
      "🚀 ~ file: thongkePhongReducer.jsx:39 ~ constgetData_TkPhong_Api=async ~ error:",
      error
    );
  }
};

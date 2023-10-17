//rxslice

import { createSlice } from "@reduxjs/toolkit";
import { formatStringDate, http } from "../../util/config";
import Database from "../../util/database/Database";

// function
/**
 * 
 * @param {list data gốc} arrData 
 * @param {text search dang co} valSearch 
 * @param {value select dang chon} valSelect 
 * @returns 
 */
const searchData = (arrData, valSearch, valSelect) => {
  let textSearch = valSearch.toLowerCase();

  // search - text
  let arrUpdate = arrData.filter((item) => {
    let ngayBD = new Date(item.ngayBatDau);
    let ngayKT = new Date(item.ngayBatDau);
    ngayKT.setDate(ngayKT.getDate() + item.soBuoi * 7);

    return (
      item.idCode.toLowerCase().includes(textSearch) ||
      item.name.toLowerCase().includes(textSearch) ||
      // item.ngayBatDau.toLowerCase().includes(textSearch)  ||
      (item.soBuoi + "").toLowerCase().includes(textSearch) ||
      formatStringDate(ngayBD).toLowerCase().includes(textSearch) ||
      formatStringDate(ngayKT).toLowerCase().includes(textSearch)
    );
  });
  console.log(arrUpdate);

  // search -- select
  let day = new Date();

  if (valSelect == 1) {
    // Kết thúc
    arrUpdate = arrUpdate.filter((item) => {
      let ngayKT = new Date(item.ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + item.soBuoi * 7);

      return ngayKT < day;
    });
  } else if (valSelect == 2) {
    // Chờ mở lớp
    arrUpdate = arrUpdate.filter((item) => {
      let ngayBD = new Date(item.ngayBatDau);

      return ngayBD > day;
    });
  } else if (valSelect == 3) {
    // Đang học
    arrUpdate = arrUpdate.filter((item) => {
      let ngayBD = new Date(item.ngayBatDau);
      let ngayKT = new Date(item.ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + item.soBuoi * 7);

      return ngayBD < day && ngayKT > day;
    });
  }

  return [...arrUpdate];
};

const initialState = {
  valueTxtSearch: "",
  valueSelect: "",
  arrMonHoc: [
    {
      id: 1,
      idCode: "MH001",
      name: "Lập trình www.",
      ngayBatDau: new Date(2022, 9, 9),
      soBuoi: 15,
    },
  ],
  arrMonHocSort: [],
  detailMonHoc: {},
};

const monHocReducer = createSlice({
  name: "monHocReducer",
  initialState,
  reducers: {
    setValueTxtSearchAction: (state, action) => {
      state.valueTxtSearch = action.payload;

      let { arrMonHoc, valueTxtSearch, valueSelect } = state;
      state.arrMonHocSort = searchData(arrMonHoc, valueTxtSearch, valueSelect);
    },
    setValueSelectAction: (state, action) => {
      state.valueSelect = action.payload;

      let { arrMonHoc, valueTxtSearch, valueSelect } = state;
      state.arrMonHocSort = searchData(arrMonHoc, valueTxtSearch, valueSelect);
    },
    setArrMonHocAction: (state, action) => {
      state.arrMonHoc = action.payload;
      state.arrMonHocSort = action.payload;
    },
    /**
     * tìm kiem theo txtSearch
     */
    searchArrMonHocAction: (state, action) => {
      let textSearch = action.payload.toLowerCase();
      let dataUpdate = state.arrMonHoc.filter((item) => {
        let ngayBD = new Date(item.ngayBatDau);
        let ngayKT = new Date(item.ngayBatDau);
        ngayKT.setDate(ngayKT.getDate() + item.soBuoi * 7);

        return (
          item.idCode.toLowerCase().includes(textSearch) ||
          item.name.toLowerCase().includes(textSearch) ||
          // item.ngayBatDau.toLowerCase().includes(textSearch)  ||
          (item.soBuoi + "").toLowerCase().includes(textSearch) ||
          formatStringDate(ngayBD).toLowerCase().includes(textSearch) ||
          formatStringDate(ngayKT).toLowerCase().includes(textSearch)
        );
      });

      state.arrMonHocSort = [...dataUpdate];
    },
    /**
     * tìm kiem theo select
     */
    searchArrMonHocSelectAction: (state, action) => {
      let value = action.payload;
      let dataUpdate = state.arrMonHocSort;
      let day = new Date();

      if (value == 1) {
        // Kết thúc
        dataUpdate = dataUpdate.filter((item) => {
          let ngayKT = new Date(item.ngayBatDau);
          ngayKT.setDate(ngayKT.getDate() + item.soBuoi * 7);

          return ngayKT < day;
        });
      } else if (value == 2) {
        // Chờ mở lớp
        dataUpdate = dataUpdate.filter((item) => {
          let ngayBD = new Date(item.ngayBatDau);

          return ngayBD > day;
        });
      } else if (value == 3) {
        // Đang học
        dataUpdate = dataUpdate.filter((item) => {
          let ngayBD = new Date(item.ngayBatDau);
          let ngayKT = new Date(item.ngayBatDau);
          ngayKT.setDate(ngayKT.getDate() + item.soBuoi * 7);

          return ngayBD < day && ngayKT > day;
        });
      }

      state.arrMonHocSort = [...dataUpdate];
    },
  },
});
// exp nay de sử dụng theo cách 2
export const {
  setArrMonHocAction,
  searchArrMonHocAction,
  searchArrMonHocSelectAction,
  setValueSelectAction,
  setValueTxtSearchAction,
} = monHocReducer.actions;
export default monHocReducer.reducer;

// -------------- Call Api -----------------

export const getAllMonHoc = async (dispatch) => {
  // call Api
  try {
    // let result = await http.get('/monhoc...');
    // const action = setArrMonHocAction(result.data.content)
    const action = setArrMonHocAction(Database.dataMonHoc);

    dispatch(action);
  } catch (error) {
    console.log(
      "🚀 ~ file: monHocReducer.jsx:37 ~ getAllMonHoc ~ error:",
      error
    );
  }
};

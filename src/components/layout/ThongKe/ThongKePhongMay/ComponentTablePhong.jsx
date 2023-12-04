import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData_arrTK_DataPhong_ghiChu_api,
  getData_arrTK_DataPhong_ghiChu_date_api,
  set_tk_valueSort_Action,
  set_tk_valueSort_data2_Action,
} from "../../../../redux/reducers/ThongKe/thongkePhongReducer";
import { TfiReload } from "react-icons/tfi";
import { formatStringDate2 } from "../../../../util/config";

export default function ComponentTablePhong() {
  //
  const dispatch = useDispatch();
  //
  let [date_sort_table1, setDate_sort_table1] = useState({
    from: "",
    to: formatStringDate2(),
  });
  //

  const {
    arrTK_DataPhong,
    sum_PM,
    arrTK_DataPhong_Search,
    arrTK_DataPhong_ghiChu,
    arrTK_DataPhong_ghiChu_search,
  } = useSelector((state) => state.thongkePhongReducer);
  //
  if (arrTK_DataPhong.length === 0) {
    return <>Đang tìm số liệu.</>;
  }
  if (arrTK_DataPhong_ghiChu.length === 0) {
    return <>Đang tìm số liệu.</>;
  }
  //

  //
  let sumMayTinh = 0;
  let sumMayTinh_err = 0;
  let sumPM_err = 0;
  let valueRow = 0;

  let arrNhanXet_PM = [];
  let arrNhanXet_MT = [];

  //
  let sum_soLanPhongMay_err = 0;
  let sum_soLanPhanMem_err = 0;
  //
  const handleChangeDateFrom = (e) => {
    let value = e.target.value; // value cua from

    if (value.length === 0) {
      setDate_sort_table1({ from: "", to: formatStringDate2() });
      dispatch(getData_arrTK_DataPhong_ghiChu_api);
      return;
    }

    let { from, to } = date_sort_table1;

    if (from.length === 0 && to.length === 0) {
      setDate_sort_table1({ ...date_sort_table1, from: value });
    } else {
      setDate_sort_table1({ ...date_sort_table1, from: value });
      // api
      dispatch(
        getData_arrTK_DataPhong_ghiChu_date_api({
          ...date_sort_table1,
          from: value,
        })
      );
    }
  };
  //
  const handleChangeDateTo = (e) => {
    let value = e.target.value; // value cua from
    if (value.length === 0) {
      setDate_sort_table1({ ...date_sort_table1, to: formatStringDate2() });
      dispatch(getData_arrTK_DataPhong_ghiChu_api);
      return;
    }

    setDate_sort_table1({ ...date_sort_table1, to: value });
    //api
    dispatch(
      getData_arrTK_DataPhong_ghiChu_date_api({
        ...date_sort_table1,
        to: value,
      })
    );
  };
  //render
  //
  const renderDataTK_Phong_TheoGhiChu = () => {
    if (arrTK_DataPhong_ghiChu_search.length === 0) {
      return <>Không có thông tin.</>;
    }

    //
    valueRow = 0;
    return arrTK_DataPhong_ghiChu_search?.map((item, index) => {
      valueRow++;

      let { tenPhong, tang, soLanPhongMay_err, soLanPhanMem_err } = item;

      sum_soLanPhongMay_err += soLanPhongMay_err;
      sum_soLanPhanMem_err += soLanPhanMem_err;

      if (valueRow == 9) {
        return (
          <tr key={index}>
            <td className="text-center">
              {index < 9 ? `0${index + 1}` : index + 1}
            </td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
          </tr>
        );
      } else if (valueRow > 9) {
        return <></>;
      }

      return (
        <tr key={index}>
          <td className="text-center">
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{tenPhong}</td>
          <td>
            {tang.tenTang} - {tang.toaNha.tenToaNha}
          </td>
          <td className="text-center">{soLanPhongMay_err}</td>
          <td className="text-center">{soLanPhanMem_err}</td>
        </tr>
      );
    });
  };
  //
  const renderDataTK_Phong = () => {
    if (arrTK_DataPhong_Search.length === 0) {
      return <>Không có thông tin.</>;
    }

    //
    valueRow = 0;
    return arrTK_DataPhong_Search?.map((item, index) => {
      valueRow++;

      let { tenPhong, tang, soMayTinh, soPhanMem, soPM_err, soMT_err } = item;

      //
      let tile_err_PM = ((soPM_err * 100) / soPhanMem).toFixed(2);
      if (tile_err_PM > 10 || soPM_err >= 4) {
        let objErr = {
          title: "phần mềm",
          name: tenPhong,
          tile: tile_err_PM,
          soLuong_err: soPM_err,
        };
        arrNhanXet_PM.push(objErr);
      }
      //
      let tile_err_MT = ((soMT_err * 100) / soMayTinh).toFixed(2);
      if (tile_err_MT > 10 || soMT_err >= 10) {
        let objErr = {
          title: "máy tính",
          name: tenPhong,
          tile: tile_err_MT,
          soLuong_err: soMT_err,
        };
        arrNhanXet_MT.push(objErr);
      }

      sumMayTinh_err += soMT_err;
      sumMayTinh += soMayTinh;
      sumPM_err += soPM_err;
      if (valueRow == 9) {
        return (
          <tr key={index}>
            <td className="text-center">
              {index < 9 ? `0${index + 1}` : index + 1}
            </td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
            <td className="text-center">...</td>
          </tr>
        );
      } else if (valueRow > 9) {
        return <></>;
      }

      return (
        <tr key={index}>
          <td className="text-center">
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{tenPhong}</td>
          <td>
            {tang.tenTang} - {tang.toaNha.tenToaNha}
          </td>
          <td className="text-center">{soPhanMem}</td>
          <td className="text-center">{soPM_err}</td>
          <td className="text-center">{soMayTinh}</td>
          <td className="text-center">{soMT_err}</td>
        </tr>
      );
    });
  };
  //
  const renderNhanXet = () => {
    let arrNhanXet = [...arrNhanXet_MT, ...arrNhanXet_PM];
    if (arrNhanXet.length === 0)
      return <li>Không tìm thấy vấn dề nghiêm trọng.</li>;
    //
    let rowData = 0;
    return arrNhanXet?.map((item, index) => {
      rowData++;
      if (rowData == 8) {
        return <li>...</li>;
      } else if (rowData > 8) {
        return <></>;
      }
      let { title, name, tile, soLuong_err } = item;
      let str = `${name} có ${soLuong_err} ${title} bị hỏng, chiếm ${tile}% tổng số ${title}.`;
      return <li key={index}>{str}</li>;
    });
  };
  //
  return (
    <>
      <div className="table-responsive-md mt-5 ">
        <strong>Bảng 1: Thống kê phòng máy theo dữ liệu ghi chú. </strong>
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor className="form-label">
                Tìm theo thời gian
                <small id="helpId" className="form-text text-muted">
                  *
                </small>
              </label>
              <div className="d-flex align-items-center">
                Từ
                <input
                  onChange={handleChangeDateFrom}
                  type="date"
                  value={date_sort_table1.from}
                  max={date_sort_table1.to}
                  className="form-control p-1 mx-2"
                />
                Đến
                <input
                  min={date_sort_table1.from}
                  value={date_sort_table1.to}
                  type="date"
                  disabled={date_sort_table1.from.length > 0 ? 0 : 1}
                  max={formatStringDate2()}
                  className="form-control p-1 mx-2"
                  onChange={handleChangeDateTo}
                />
                <button
                  onClick={() => {
                    setDate_sort_table1({ from: "", to: formatStringDate2() });
                    dispatch(getData_arrTK_DataPhong_ghiChu_api);
                  }}
                  className="btn btn-outline-primary p-1 px-2"
                >
                  <TfiReload size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên phòng</th>
              <th>Tòa nhà</th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_data2_Action(5));
                }}
              >
                Số lần báo lỗi
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_data2_Action(6));
                }}
              >
                Số PM bị lỗi
              </th>
            </tr>
          </thead>
          <tbody>{renderDataTK_Phong_TheoGhiChu()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-center fw-bold">
                Tổng
              </td>
              <td className="text-center fw-bold">{sum_soLanPhongMay_err} </td>
              <td className="text-center fw-bold">{sum_soLanPhanMem_err}</td>
            </tr>
          </tfoot>
        </table>
        <div className="row">
          <div className="col-5" style={{ fontSize: "14px" }}>
            <strong>Ghi chú:</strong>
            <ul>
              <li>PM: phần mềm</li>
              <li>
                Tổng số lần báo lỗi: tổng số lần báo lỗi có trong danh sách.
              </li>
              <li>
                Tổng số lần PM bị lỗi: tổng số lần PM bị lỗi có trong danh sách.
              </li>
            </ul>
          </div>
          <div className="col-7">
            <strong>Nhận xét: </strong>
            <ul>{renderNhanXet()}</ul>
          </div>
        </div>
      </div>
      <div className="table-responsive-md mt-5 ">
        <strong>Bảng 2: Thống kê theo phòng máy( thời gian hiện tại ) </strong>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên phòng</th>
              <th>Tòa nhà</th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_Action(1));
                }}
              >
                Số ứng dụng PM
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_Action(2));
                }}
              >
                Số PM bị lỗi
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_Action(3));
                }}
              >
                Số máy
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_Action(4));
                }}
              >
                Số máy bị hỏng
              </th>
            </tr>
          </thead>
          <tbody>{renderDataTK_Phong()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-center fw-bold">
                Tổng
              </td>
              <td className="text-center fw-bold">{sum_PM} </td>
              <td className="text-center fw-bold">{sumPM_err}</td>
              <td className="text-center fw-bold">{sumMayTinh} (máy)</td>
              <td className="text-center fw-bold">
                {sumMayTinh_err} ({" "}
                {((sumMayTinh_err * 100) / sumMayTinh).toFixed(2)}% )
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="row">
          <div className="col-5" style={{ fontSize: "14px" }}>
            <strong>Ghi chú:</strong>
            <ul>
              <li>PM: phần mềm</li>
              <li>Tổng số ứng dụng PM: tổng số phần mềm trong hệ thống có.</li>
              <li>Tổng số PM bị lỗi: tổng số PM bị lỗi có trong danh sách.</li>
              <li>Tổng số máy: tổng số máy có trong danh sách trên.</li>
              <li>
                Tổng số máy bị hỏng A (B%): A - tổng số máy bị hỏng có trong
                danh sách; B - tỉ lệ máy bị hỏng với tổng số máy tính.
              </li>
            </ul>
          </div>
          <div className="col-7">
            <strong>Nhận xét: </strong>
            <ul>{renderNhanXet()}</ul>
          </div>
        </div>
      </div>
    </>
  );
}

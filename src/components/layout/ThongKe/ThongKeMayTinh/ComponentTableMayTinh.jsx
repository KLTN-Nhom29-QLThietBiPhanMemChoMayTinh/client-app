import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  set_tk_valueSort_MT_Action,
  set_tk_valueSort_err_MT_Action,
} from "../../../../redux/reducers/ThongKe/thongkeMayTinhReducer";

export default function ComponentTableMayTinh() {
  //
  const dispatch = useDispatch();
  //
  const {
    arrDataTK_MayTinh,
    sum_Tbi,
    arrDataTK_MayTinhSearch,
    arrDataTK_MayTinhSearch_err,
  } = useSelector((state) => state.thongkeMayTinhReducer);
  if (arrDataTK_MayTinh.length === 0) {
    return <>Đang tìm số liệu.</>;
  }
  // render

  let sumThieBi_err = 0;
  let sumThieBi2_err = 0;
  let rowData = 0;

  //
  let arrNhanXet_Tbi_Bang1 = [];
  let arrNhanXet_Tbi_Bang2 = [];

  const renderDataTK_MayTinh_bang1 = () => {
    if (arrDataTK_MayTinhSearch.length === 0) {
      return <>Không có thông tin.</>;
    }

    //
    let valueRow = 0;
    return arrDataTK_MayTinhSearch?.map((item, index) => {
      valueRow++;
      let { moTa, phongMay, soThietBi, soTbi_err } = item;
      sumThieBi_err += soTbi_err;

      // nhan xet
      let val_tiLe = ((soTbi_err * 100) / soThietBi).toFixed(2);
      if (val_tiLe > 15 || soTbi_err > 3) {
        let objErr = {
          title: "thiết bị",
          name: moTa,
          tiLe: val_tiLe,
          soLuong_err: soTbi_err,
        };
        arrNhanXet_Tbi_Bang1.push(objErr);
      }
      //
      if (valueRow == 11) {
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
          </tr>
        );
      } else if (valueRow > 11) {
        return <></>;
      }
      let strPhong = `${phongMay.tenPhong} - ${phongMay.tang.tenTang} - ${phongMay.tang.toaNha.tenToaNha}`;
      return (
        <tr key={index}>
          <td className="text-center">
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{moTa}</td>
          <td>{strPhong}</td>
          <td className="text-center">{soThietBi}</td>
          <td className="text-center">{soTbi_err}</td>
          <td className="text-center">{val_tiLe}%</td>
        </tr>
      );
    });
  };
  //
  const renderDataTK_MayTinh_bang2 = () => {
    if (arrDataTK_MayTinhSearch_err.length === 0) {
      return <>Không có thông tin.</>;
    }

    //
    let valueRow = 0;
    return arrDataTK_MayTinhSearch_err?.map((item, index) => {
      valueRow++;
      let { moTa, phongMay, soThietBi, soTbi_err } = item;
      sumThieBi2_err += soTbi_err;

      // nhan xet
      let val_tiLe = ((soTbi_err * 100) / soThietBi).toFixed(2);
      if (val_tiLe < 15 || soTbi_err < 2) {
        let objErr = {
          title: "thiết bị",
          name: moTa,
          tiLe: val_tiLe,
          soLuong_err: soTbi_err,
        };
        arrNhanXet_Tbi_Bang2.push(objErr);
      }
      //
      if (valueRow == 11) {
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
          </tr>
        );
      } else if (valueRow > 11) {
        return <></>;
      }
      let strPhong = `${phongMay.tenPhong} - ${phongMay.tang.tenTang} - ${phongMay.tang.toaNha.tenToaNha}`;
      return (
        <tr key={index}>
          <td className="text-center">
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{moTa}</td>
          <td>{strPhong}</td>
          <td className="text-center">{soThietBi}</td>
          <td className="text-center">{soTbi_err}</td>
          <td className="text-center">{val_tiLe}%</td>
        </tr>
      );
    });
  };
  //
  const renderNhanXet_Bang1 = () => {
    rowData = 0;
    if (arrNhanXet_Tbi_Bang1.length === 0) {
      return <li>Không tìm thấy vấn dề nghiêm trọng.</li>;
    }
    return arrNhanXet_Tbi_Bang1?.map((item, index) => {
      rowData++;
      if (rowData == 8) {
        return <li>...</li>;
      } else if (rowData > 8) {
        return <></>;
      }
      let { title, name, tiLe, soLuong_err } = item;
      let str = `${name} có ${soLuong_err} ${title} bị hỏng, chiếm ${tiLe}% tổng số ${title}.`;
      return <li key={index}>{str}</li>;
    });
  };
  //
  const renderNhanXet_Bang2 = () => {
    rowData = 0;
    if (arrNhanXet_Tbi_Bang2.length === 0) {
      return <li>Không tìm thấy vấn dề nghiêm trọng.</li>;
    }
    return arrNhanXet_Tbi_Bang2?.map((item, index) => {
      rowData++;
      if (rowData == 8) {
        return <li>...</li>;
      } else if (rowData > 8) {
        return <></>;
      }
      let { title, name, tiLe, soLuong_err } = item;
      let str = `${name} có ${soLuong_err} ${title} bị hỏng, có khả năng sửa chữa.`;
      return <li key={index}>{str}</li>;
    });
  };

  //
  return (
    <>
      <div className="table-responsive-md mt-5 ">
        <strong>Bảng 1: Thống kê theo máy tính ( Đang hoạt động ) </strong>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên máy tính</th>
              <th>Phòng máy</th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_MT_Action(1));
                }}
              >
                Số thiết bị
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_MT_Action(2));
                }}
              >
                Số thiết bị lỗi
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_MT_Action(3));
                }}
              >
                Tỉ lệ lỗi
              </th>
            </tr>
          </thead>
          <tbody>{renderDataTK_MayTinh_bang1()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-center fw-bold">
                Tổng
              </td>
              <td className="text-center fw-bold">{sum_Tbi} </td>
              <td className="text-center fw-bold">{sumThieBi_err}</td>
              <td className="text-center fw-bold">---</td>
            </tr>
          </tfoot>
        </table>
        <div className="row">
          <div className="col-5">
            <strong>Ghi chú: </strong>
            <ul style={{ fontSize: "14px" }}>
              <li>Thông tin trên được thống kê ở thời điểm hiện tại.</li>
              <li>Tổng số thiết bị: là tổng số thiết bị có trong hệ thống.</li>
              <li>
                Tổng số thiết bị lỗi là tổng số thiết bị có trong danh sách.
              </li>
            </ul>
          </div>
          <div className="col-7">
            <strong>Nhận xét: </strong>
            <ul>{renderNhanXet_Bang1()}</ul>
          </div>
        </div>
      </div>
      <div className="table-responsive-md mt-5 ">
        <strong>Bảng 2: Thống kê theo máy tính ( Bị hỏng ) </strong>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên máy tính</th>
              <th>Phòng máy</th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_err_MT_Action(1));
                }}
              >
                Số thiết bị
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_err_MT_Action(2));
                }}
              >
                Số thiết bị lỗi
              </th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_err_MT_Action(3));
                }}
              >
                Tỉ lệ lỗi
              </th>
            </tr>
          </thead>
          <tbody>{renderDataTK_MayTinh_bang2()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-center fw-bold">
                Tổng
              </td>
              <td className="text-center fw-bold">{sum_Tbi} </td>
              <td className="text-center fw-bold">{sumThieBi2_err}</td>
              <td className="text-center fw-bold">---</td>
            </tr>
          </tfoot>
        </table>
        <div className="row">
          <div className="col-5">
            <strong>Ghi chú: </strong>
            <ul style={{ fontSize: "14px" }}>
              <li>Thông tin trên được thống kê ở thời điểm hiện tại.</li>
              <li>Tổng số thiết bị: là tổng số thiết bị có trong hệ thống.</li>
              <li>
                Tổng số thiết bị lỗi là tổng số thiết bị có trong danh sách.
              </li>
            </ul>
          </div>
          <div className="col-7">
            <strong>Nhận xét: </strong>
            <ul>{renderNhanXet_Bang2()}</ul>
          </div>
        </div>
      </div>
    </>
  );
}

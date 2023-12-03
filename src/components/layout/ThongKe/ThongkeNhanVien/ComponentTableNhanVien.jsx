import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_tk_valueSort_NV_Action } from "../../../../redux/reducers/ThongKe/thongkeNhanVienReducer";

export default function ComponentTableNhanVien() {
  const dispatch = useDispatch();
  //
  let { arrDataTK_NhanVien, arrDataTK_NhanVienSearch } = useSelector(
    (state) => state.thongkeNhanVienReducer
  );
  if (arrDataTK_NhanVien.length === 0) {
    return <>Đang tìm số liệu.</>;
  }
  console.log(
    "🚀 ~ file: ComponentTableNhanVien.jsx:7 ~ ComponentTableNhanVien ~ arrDataTK_NhanVien:",
    arrDataTK_NhanVien
  );

  //
  let sumLichTruc = 0;

  // render
  const renderDataTK_LichTruc_NhanVien = () => {
    if (arrDataTK_NhanVienSearch.length === 0) {
      return <>Không có thông tin.</>;
    }
    //
    let valueRow = 0;
    return arrDataTK_NhanVienSearch?.map((item, index) => {
      valueRow++;
      let { maNV, tenNV, arrLichTruc } = item;

      let soLichTruc = arrLichTruc.length;
      sumLichTruc += soLichTruc;
      // nhan xet

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
      return (
        <tr key={index}>
          <td className="text-center">
            {index < 9 ? `0${index + 1}` : index + 1}
          </td>
          <td>{maNV}</td>
          <td>{tenNV}</td>
          <td>
            <ul>
              {arrLichTruc.map((item, index) => {
                let { tang, thoiGianBatDau, thoiGianKetThuc } = item;
                let strCaTruc = `${thoiGianBatDau}h - ${thoiGianKetThuc}h`;
                let str = `${tang.tenTang} - ${tang.toaNha.tenToaNha}( ${strCaTruc} )`;
                return <li key={index}>{str}</li>;
              })}
            </ul>
          </td>
          <td className="text-center">{soLichTruc}</td>
        </tr>
      );
    });
  };
  //
  return (
    <>
      <div className="table-responsive-md mt-5 ">
        <strong>Bảng 1: Thống kê theo nhân viên </strong>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Mã NV</th>
              <th>Tên nhân viên</th>
              <th>Lịch trực</th>
              <th
                className="btn_moune"
                onClick={() => {
                  dispatch(set_tk_valueSort_NV_Action(1));
                }}
              >
                Số ca lịch trực
              </th>
            </tr>
          </thead>
          <tbody>{renderDataTK_LichTruc_NhanVien()}</tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="text-center fw-bold">
                Tổng
              </td>
              <td className="text-center fw-bold">{sumLichTruc} </td>
            </tr>
          </tfoot>
        </table>
        <div className="row">
          <div className="col-5">
            <strong>Ghi chú: </strong>
            {/* <ul style={{ fontSize: "14px" }}>
              <li>Thông tin trên được thống kê ở thời điểm hiện tại.</li>
              <li>Tổng số thiết bị: là tổng số thiết bị có trong hệ thống.</li>
              <li>
                Tổng số thiết bị lỗi là tổng số thiết bị có trong danh sách.
              </li>
            </ul> */}
          </div>
          <div className="col-7">
            <strong>Nhận xét: </strong>
            {/* <ul>{renderNhanXet_Bang1()}</ul> */}
          </div>
        </div>
      </div>
    </>
  );
}

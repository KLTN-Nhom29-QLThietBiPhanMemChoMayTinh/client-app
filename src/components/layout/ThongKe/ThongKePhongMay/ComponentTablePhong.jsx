import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_tk_valueSort_Action } from "../../../../redux/reducers/ThongKe/thongkePhongReducer";

export default function ComponentTablePhong() {
  //
  const dispatch = useDispatch();
  //

  const { arrTK_DataPhong, sum_PM, arrTK_DataPhong_Search } = useSelector(
    (state) => state.thongkePhongReducer
  );
  let sumMayTinh = 0;
  let sumMayTinh_err = 0;
  let sumPM_err = 0;
  let valueRow = 0;

  //render
  const renderDataTK_Phong = () => {
    return arrTK_DataPhong_Search?.map((item, index) => {
      valueRow++;

      let { tenPhong, tang, soMayTinh, soPhanMem, soPM_err, soMT_err } = item;

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
  return (
    <div>
      <div className="table-responsive-md mt-5 ">
        <strong>Bảng 1: Thống kê theo phòng máy( thời gian hiện tại ) </strong>
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
          <tbody>
            {renderDataTK_Phong()}
            <tr>
              <td colSpan={3} className="text-center fw-bold">
                Tổng
              </td>
              <td className="text-center fw-bold">{sum_PM} </td>
              <td className="text-center fw-bold">
                {sumPM_err} ( {((sumPM_err * 100) / sum_PM).toFixed(2)}% ){" "}
              </td>
              <td className="text-center fw-bold">{sumMayTinh} (máy)</td>
              <td className="text-center fw-bold">
                {sumMayTinh_err} ({" "}
                {((sumMayTinh_err * 100) / sumMayTinh).toFixed(2)}% )
              </td>
            </tr>
          </tbody>
          <tfoot />
        </table>
        <div className="row">
          <div className="col-5" style={{ fontSize: "14px" }}>
            <strong>Ghi chú:</strong>
            <ul>
              <li>PM: phần mềm</li>
              <li>Tổng số ứng dụng PM: tổng số phần mềm trong hệ thống có.</li>
              <li>
                Tổng số PM bị lỗi A (B%): A - tổng số PM bị lỗi có trong danh
                sách; B - tị lệ PM lỗi với tổng số PM.
              </li>
              <li>Tổng số máy: tổng số máy có trong danh sách trên.</li>
              <li>
                Tổng số máy bị hỏng A (B%): A - tổng số máy bị hỏng có trong
                danh sách; B - tỉ lệ máy bị hỏng với tổng số máy tính.
              </li>
            </ul>
          </div>
          <div className="col-7">
            <strong>Nhận Xét: </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

//
const TableTKTang = (props) => {
  let { index, sum, data_table, text_name, name_title } = props.data;

  return (
    <div key={index} className="table-responsive-md mt-5 ">
      <strong>Bảng {name_title} </strong>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tầng</th>
            <th>Số {text_name}</th>
            <th>Tỉ lệ</th>
          </tr>
        </thead>
        <tbody>
          {data_table?.map((item, index1) => {
            let ti_le = (item.value / sum) * 100;
            return (
              <tr key={index1}>
                <td className="text-center">
                  {index1 < 9 ? `0${index1 + 1}` : index1 + 1}
                </td>
                <td>{item.name}</td>
                <td className="text-center">{item.value}</td>
                <td className="text-center">{ti_le.toFixed(2)}%</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan={2} className="text-center fw-bold">
              Tổng
            </td>
            <td className="text-center fw-bold">
              {sum} ({text_name})
            </td>
            <td className="text-center fw-bold">100%</td>
          </tr>
        </tbody>
        <tfoot />
      </table>
    </div>
  );
};

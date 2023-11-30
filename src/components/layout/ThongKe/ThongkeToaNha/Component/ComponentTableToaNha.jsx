import React from "react";
import { useSelector } from "react-redux";

export default function ComponentTableToaNha() {
  const { tk_ToaNha_SoTang, tk_TheoToaNha_arr, tk_ToaNha_status_mayTinh } =
    useSelector((state) => state.thongkeToaNhaReducer);
  console.log(
    "🚀 ~ file: ComponentTableToaNha.jsx:6 ~ ComponentTableToaNha ~ tk_ToaNha_status_mayTinh:",
    tk_ToaNha_status_mayTinh
  );
  //render

  return (
    <div>
      {tk_TheoToaNha_arr?.map((item, index) => {
        let data = { ...item, index };
        return <TableTKToaNha data={data} />;
      })}
      <TableTKToaNha_TrangThaiMay data={tk_ToaNha_status_mayTinh} />
    </div>
  );
}

//
const TableTKToaNha = (props) => {
  let { index, sum, data_table, text_name, name_title } = props.data;

  return (
    <div key={index} className="table-responsive-md mt-5 ">
      <strong>Bảng {name_title} </strong>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tòa nha</th>
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
//
/**
 * 
  props.data
{
  "name_title": "4: thống kê tòa nhà theo trạng thái máy tính",
  "sum": 118,
  "text_name": "máy",
  "data_table": [
      {
          "name": "Toà nhà A",
          "soMayTinh": 44,
          "soMay_biHong": 2,
          "soMay_dangSD": 42
      },
      {
          "name": "Toà nhà B",
          "soMayTinh": 20,
          "soMay_biHong": 1,
          "soMay_dangSD": 19
      },
      {
          "name": "Toà nhà D",
          "soMayTinh": 54,
          "soMay_biHong": 6,
          "soMay_dangSD": 48
      }
  ]
}
 * @param {*} props 
 * @returns 
 */
const TableTKToaNha_TrangThaiMay = (props) => {
  let { index, sum, data_table, text_name, name_title } = props.data;
  let sum_biHong = 0;
  return (
    <div key={index} className="table-responsive-md mt-5 ">
      <strong>Bảng {name_title} </strong>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên tòa nha</th>
            <th>Số máy đang hoạt động</th>
            <th>Số máy bị hỏng</th>
            <th>Tỉ lệ hỏng so với tòa nha</th>
          </tr>
        </thead>
        <tbody>
          {data_table?.map((item, index1) => {
            let { soMay_dangSD, soMay_biHong } = item;
            let ti_le = (soMay_biHong / soMay_dangSD) * 100;
            sum_biHong += soMay_biHong;
            return (
              <tr key={index1}>
                <td className="text-center">
                  {index1 < 9 ? `0${index1 + 1}` : index1 + 1}
                </td>
                <td>{item.name}</td>
                <td className="text-center">{item.soMay_dangSD}</td>
                <td className="text-center">{item.soMay_biHong}</td>
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
            <td className="text-center fw-bold">{sum_biHong} ({text_name})</td>
            <td className="text-center fw-bold">
              {((sum_biHong * 100) / sum).toFixed(2)}%
            </td>
          </tr>
        </tbody>
        <tfoot />
      </table>
    </div>
  );
};

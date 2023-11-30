import React from "react";
import { useSelector } from "react-redux";

export default function ComponentTablePhong() {
  // const { tk_TheoTang_arr } = useSelector((state) => state.thongkeTangReducer);
  //render

  return (
    <div>
      {/* {tk_TheoTang_arr?.map((item, index) => {
        let data = { ...item, index };
        return <TableTKTang data={data} />;
      })} */}
      {/* <TableTKToaNha_TrangThaiMay data={tk_ToaNha_status_mayTinh} /> */}
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
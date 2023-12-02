import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function ComponentGraphMayTinh() {
  //
  const {
    arrDataTK_MayTinh,
    arrDataTK_MayTinhSearch,
    arrDataTK_MayTinhSearch_err,
  } = useSelector((state) => state.thongkeMayTinhReducer);
  // render
  if (arrDataTK_MayTinh.length === 0) {
    return <>Đang tìm số liệu.</>;
  }

  //
  const renderTK_MayTinh1 = () => {
    if(arrDataTK_MayTinhSearch.length === 0) {
      return <>Bảng 1: không có thông tin</>
    }
    //
    let rowItem = 0;
    let arrGraph = [];
    arrDataTK_MayTinhSearch.forEach((item) => {
      rowItem++;
      if (rowItem >= 9) return;
      let { moTa, phongMay, soThietBi, soTbi_err } = item;
      arrGraph.push({ name:moTa, namey:'Số lượng', "Số thiết bị": soThietBi, "Số thiết bị hỏng": soTbi_err });
    });
    return (
      <ResponsiveContainer className="col-md-8 mt-5" height={400}>
        <BarChart
          width={500}
          height={300}
          data={arrGraph}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Số thiết bị"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Số thiết bị hỏng"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
        <p className="text-center w-100">
          Biểu đồ 1: Thống kê máy tính theo số thiết bị quản lý
        </p>
      </ResponsiveContainer>
    );
  }


  //
  return <div className="mb-5">
    {/*  */}
    <>{renderTK_MayTinh1()}</>
    <div className="col-5 mt-5">
        <strong>Ghi Chú</strong>
        <ul>
          <li>Biểu đồ đo theo thời gian hiện tại</li>
          <li>
            Biểu đồ được bị ảnh hưởng số liệu theo bảng 1 bên số liệu ( thống kê
            theo máy tính )
          </li>
        </ul>
      </div>
  </div>;
}

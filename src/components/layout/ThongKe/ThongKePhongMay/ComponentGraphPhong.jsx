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

let data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 11800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

export default function ComponentGraphPhong() {
  //
  const { arrTK_DataPhong, sum_PM, arrTK_DataPhong_Search } = useSelector(
    (state) => state.thongkePhongReducer
  );
  //

  // render
  const renderTK_Phong_MayTinh = () => {
    if (arrTK_DataPhong.length === 0) {
      return <></>;
    }
    let rowItem = 0;
    let arrGraph = [];
    arrTK_DataPhong_Search.forEach((item) => {
      rowItem++;
      if (rowItem >= 9) return;
      let { tenPhong, soMayTinh, soMT_err } = item;
      arrGraph.push({ tenPhong, "Số máy": soMayTinh, "Số máy hỏng": soMT_err });
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
          <XAxis dataKey="tenPhong" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Số máy"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Số máy hỏng"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
        <p className="text-center w-100">
          Biểu đồ 1: Thống kê phòng theo số máy quản lý
        </p>
      </ResponsiveContainer>
    );
  };
  //
  const renderTK_Phong_PhanMem = () => {
    if (arrTK_DataPhong.length === 0) {
      return <></>;
    }
    let rowItem = 0;
    let arrGraph = [];
    arrTK_DataPhong_Search.forEach((item) => {
      rowItem++;
      if (rowItem >= 9) return;
      let { tenPhong, soPhanMem, soPM_err } = item;
      arrGraph.push({ tenPhong, "Số phần mềm": soPhanMem, "Số PM bị lỗi": soPM_err });
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
          <XAxis dataKey="tenPhong" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="Số phần mềm"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="Số PM bị lỗi"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
        <p className="text-center w-100"> 
          Biểu đồ 2: Thống kê phòng theo số phần mềm quản lý
        </p>
      </ResponsiveContainer>
    );
  };
  //
  return (
    <div className="mb-5">
      {/*  */}
      <>{renderTK_Phong_MayTinh()}</>
      {/*  */}
      <>{renderTK_Phong_PhanMem()}</>
      
      
      <div className="col-5 mt-5">
        <strong>Ghi Chú</strong>
        <ul>
          <li>PM: phần mềm</li>
          <li>Biểu đồ đo theo thời gian hiện tại</li>
          <li>
            Biểu đồ được bị ảnh hưởng số liệu theo bảng 1 bên số liệu ( thống kê theo phòng )
          </li>
        </ul>
      </div>
    </div>
  );
}

//
const sort_soMayTinh = (a, b) => {
  let valuea = a.soMayTinh;
  let valueb = b.soMayTinh;
  return valueb - valuea;
};

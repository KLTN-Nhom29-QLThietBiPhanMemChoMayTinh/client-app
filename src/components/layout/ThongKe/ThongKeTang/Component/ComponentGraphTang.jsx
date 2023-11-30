import React, { PureComponent, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`SL ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 6}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Tỉ lệ ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class GraphTKTang extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div key={this.props.key} className="col-md-5">
        <ResponsiveContainer width={"100%"} height={300}>
          <PieChart width={"100%"} height={300}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={this.props.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#308aff"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center w-100">Biểu đồ {this.props.nameTitle}</p>
      </div>
    );
  }
}

export default function ComponentGraphTang() {
  const { tk_TheoTang_arr } = useSelector((state) => state.thongkeTangReducer);

  //
  // let { name_title, data_table } = tk_ToaNha_SoTang;
  //
  //render
  const renderGraph_ToaNha = () => {
    return tk_TheoTang_arr.map((item, index) => {
      let { name_title, data_table } = item;
      return (
        // <GraphTKTang key={index} data={data_table} nameTitle={name_title} />
        <GraphTKTang_SimpleBarChart data={item} />
      );
    });
  };
  //
  return (
    <div className="mb-5">
      <div className="d-flex justify-content-around flex-wrap">
        {renderGraph_ToaNha()}
        
      </div>
      <div className="d-flex justify-content-around flex-wrap">
        {/* <GraphTKToaNhaTheoTrangThai_SimpleBarChart
          data={tk_ToaNha_status_mayTinh}
        /> */}
      </div>
    </div>
  );
}

//
const GraphTKTang_SimpleBarChart = (props) => {
  let { index, sum, data_table, text_name, name_title } = props.data;
  let nameGiatri = "";

  let arrData = data_table.map((item) => {
    let { name, value } = item;
    if (text_name.includes("phòng")) {
      nameGiatri = "Số phòng";
      return { name, "Số phòng": value };
    } else if (text_name.includes("máy")) {
      nameGiatri = "Số máy";
      return { name, "Số máy": value };
    }
    return { name, value };
  });
  return (
    <ResponsiveContainer className="col-md-8 mt-5" width={'100%'} height={400}>
      <BarChart
        data={arrData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={nameGiatri}
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
      <p className="text-center w-100">Biểu đồ {name_title}</p>
    </ResponsiveContainer>
  );
};

// SimpleBarChart -- bieu do  cot
const GraphTKToaNhaTheoTrangThai_SimpleBarChart = (props) => {
  let { index, sum, data_table, text_name, name_title } = props.data;
  console.log(
    "🚀 ~ file: ComponentGraphToaNha.jsx:170 ~ data_table:",
    data_table
  );
  let arrData = data_table.map((item) => {
    let { name, soMay_dangSD, soMay_biHong } = item;
    return { name, "Đang sử dụng": soMay_dangSD, "Bị hỏng": soMay_biHong };
  });
  // let { soMay_dangSD, soMay_biHong } = item;
  return (
    <ResponsiveContainer className="col-md-8 mt-5" width={700} height={300}>
      <BarChart
        width={500}
        height={300}
        data={arrData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Đang sử dụng"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="Bị hỏng"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
      <p className="text-center w-100">Biểu đồ {name_title}</p>
    </ResponsiveContainer>
  );
};

import React, { PureComponent, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, PieChart, Pie, Sector } from "recharts";

const data = [
  { name: "Tòa nhà A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

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

class GraphTKToaNha extends PureComponent {
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

export default function ComponentGraphToaNha() {
  const { tk_ToaNha_SoTang, tk_TheoToaNha_arr } = useSelector(
    (state) => state.thongkeToaNhaReducer
  );

  //
  // let { name_title, data_table } = tk_ToaNha_SoTang;
  //
  //render
  const renderGraph_ToaNha = () => {
    return tk_TheoToaNha_arr.map((item, index) => {
      let { name_title, data_table } = item;
      return <GraphTKToaNha key={index} data={data_table} nameTitle={name_title} />;
    });
  };
  //
  return (
    <div className="d-flex justify-content-around flex-wrap">
      {renderGraph_ToaNha()}
      {/* <GraphTKToaNha data={data_table} nameTitle={name_title} />
      <GraphTKToaNha data={data} name={"2: thống kê tòa nhà theo số phòng"} />
      <GraphTKToaNha data={data} name={"2: thống kê tòa nhà theo số máy"} /> */}
    </div>
  );
}

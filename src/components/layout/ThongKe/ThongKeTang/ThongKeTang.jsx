import React, { useState } from "react";
import ComponentThongKe from "../ComponentThongKe";
import ComponentGraphTang from "./Component/ComponentGraphTang";
import ComponentTableTang from "./Component/ComponentTableTang";
import ComponentSortTang from "./Component/ComponentSortTang";

export default function ThongKeTang() {
  let [btnChangeTableOrGraph, setBtnChangeTableOrGraph] = useState(true);

  // handle
  const handleBtnChangeTableOrGraph = (e) => {
    let value = !btnChangeTableOrGraph;
    if (value) {
      // update data reducer
    } else {
      // update data reducer
    }
    setBtnChangeTableOrGraph(value);
  };
  // render
  const renderDataThongKe = () => {
    if (!btnChangeTableOrGraph) return <ComponentGraphTang />;
    return <ComponentTableTang />;
  };
  return (
    <>
      <div className="d-flex flex-column bd-highlight">
        <div className="p-2 flex-shrink-1 bd-highlight">
          {/* top */}
          <ComponentSortTang />
        </div>
        {/* body */}
        <div className="p-2 bd-highlight pb-5 ">
          <div>
            <h2 className="text-center pt-3"> Thống kê theo Tầng</h2>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={handleBtnChangeTableOrGraph}
                className="btn btn-primary mt-2"
              >
                {btnChangeTableOrGraph ? "Biểu đồ" : "Số liệu"}
              </button>
            </div>
          </div>
          {renderDataThongKe()}
        </div>
      </div>
    </>
  );
}

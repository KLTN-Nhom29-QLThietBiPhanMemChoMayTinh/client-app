import React, { useState } from "react";
import ComponentThongKe from "../ComponentThongKe";
import ComponentSortToaNha from "./Component/ComponentSortToaNha";
import ComponentGraphToaNha from "./Component/ComponentGraphToaNha";
import ComponentTableToaNha from "./Component/ComponentTableToaNha";

export default function ThongKeToaNha() {
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
  const renderDataToaNha = () => {
    if (!btnChangeTableOrGraph) return <ComponentGraphToaNha />;
    return <ComponentTableToaNha />;
  };

  return (
    <>
      <div className="d-flex flex-column bd-highlight">
        <div className="p-2 flex-shrink-1 bd-highlight">
          {/* top */}
          <ComponentSortToaNha />
        </div>
        {/* body */}
        <div className="p-2 bd-highlight  ">
          <div>
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
          {renderDataToaNha()}
        </div>
      </div>
    </>
  );
}

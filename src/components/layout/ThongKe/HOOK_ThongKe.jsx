import React, { useState } from "react";

export default function HOOK_ThongKe(props) {
  console.log("🚀 ~ file: HOOK_ThongKe.jsx:4 ~ HOOK_ThongKe ~ props:", props);
  let { title, ComponentSort, ComponentGraph, ComponentTable } = props.data;
  //
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
  //render
  const renderDataThongKe = () => {
    if (!btnChangeTableOrGraph) return <ComponentGraph />;
    return <ComponentTable />;
  };
  //

  return (
    <>
      <div className="d-flex flex-column bd-highlight">
        <div className="p-2 flex-shrink-1 bd-highlight">
          {/* top */}
          <ComponentSort />
        </div>
        {/* body */}
        <div className="p-2 bd-highlight pb-5 ">
          <div>
            <h2 className="text-center pt-3"> {title}</h2>
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

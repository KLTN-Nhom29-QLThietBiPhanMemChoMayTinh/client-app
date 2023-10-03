import React from "react";
import { FaRegCopyright } from "react-icons/fa";


export default function Footer() {
  return (
    <div
      className="d-flex justify-content-between bg-white p-3"
      style={{ margin: "0px -11px" }}
    >
      <span className="fw-bold opacity-75">
        Copyright <FaRegCopyright /> 2023 - Nguyễn văn Hoàng -- Phạm lê Thành
      </span>
      <span className="fw-bold opacity-75">Vesion 1.0.0</span>
    </div>
  );
}

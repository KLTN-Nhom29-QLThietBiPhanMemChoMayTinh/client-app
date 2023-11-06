import React from "react";
import { useSelector } from "react-redux";

export default function ComponentThongTinChiTiet() {
  let { objThongTin } = useSelector((state) => state.homeReducer);
  if (
    Object.keys(objThongTin).length === 0 ||
    Object.keys(objThongTin.tang).length === 0
  ) {
    return <></>;
  }

  let { phong, tang, mayTinh, arrPhanMem, giaoVien, nhanVien, monHoc } =
    objThongTin;

  // render
  const renderThongTinTheoPhong = () => {
    if(Object.keys(phong).length === 0){
      return <></>
    }
    return (
      <>
        <div className="pt-2">
          <span className="h5" style={{ fontWeight: 600 }}>
            Phòng: {phong.tenPhong}
          </span>
          <div>
            <span style={{ fontWeight: 600 }}>- Số lượng máy: </span>
            <span> {phong.soMay}</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Giáo viên dạy: </span>
            <span>Trần bảo bình</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Môn học: </span>
            <span>Hệ thống thông tin</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Ứng dụng phần mềm: </span>{" "}
            <br />
            <li className="ms-3">Hệ thống thông tin</li>
            <li className="ms-3">Hệ thống thông tin</li>
            <li className="ms-3">Hệ thống thông tin</li>
          </div>
        </div>
      </>
    );
  };
  //
  const renderThongTinTheoMayTinh = () => {
    if(Object.keys(mayTinh).length === 0)
    {
      return <></>
    }
    return <>
    <div className="pt-2">
        <span className="h5" style={{ fontWeight: 600 }}>
          Máy tính H3.1.1
        </span>
        <div>
          <span style={{ fontWeight: 600 }}>- Thiết bị phần cứng: </span> <br />
          <li className="ms-3">Hệ thống thông tin</li>
          <li className="ms-3">Hệ thống thông tin</li>
          <li className="ms-3">Hệ thống thông tin</li>
        </div>
      </div>
    </>
  }


  return (
    <div className="h-100 mb-2 over_flow_auto">
      <div className="pt-2">
        <h5 style={{ fontWeight: 600 }}>
          {tang.toaNha.tenToaNha} - {tang.tenTang}{" "}
        </h5>
      </div>
      {renderThongTinTheoPhong()}

      {renderThongTinTheoMayTinh()}
    </div>
  );
}

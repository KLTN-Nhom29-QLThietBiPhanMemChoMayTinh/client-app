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
    if (Object.keys(phong).length === 0) {
      return <></>;
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
            <span>Đang cập nhật!</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Môn học: </span>
            <span>Đang cập nhật!</span>
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Ứng dụng phần mềm: </span>{" "}
            <br />
            <li className="ms-3">Đang cập nhật!</li>
            <li className="ms-3">Đang cập nhật!</li>
            <li className="ms-3">Đang cập nhật!</li>
          </div>
        </div>
      </>
    );
  };
  //
  const renderThongTinTheoMayTinh = () => {
    if (Object.keys(mayTinh).length === 0) {
      return <></>;
    }

    // render
    const renderThietBi = () => {
      if(mayTinh.thietBis.length === 0)
        return <><li className="ms-3">
        Không có.
      </li></>
      return mayTinh.thietBis?.map((item, index) => {
        return (
          <li key={index} className="ms-3">
            {item.tenThietBi}
          </li>
        );
      });
    };

    // 
    const renderTrangThai = () => {
      if (mayTinh.trangThai.toLowerCase().includes( ("Đang hoạt động").toLowerCase())) {
        return <span>{mayTinh.trangThai}</span>
      }
      return <span style={{color:'red'}}>{mayTinh.trangThai}</span> 
    }
    //
    return (
      <>
        <div className="pt-2">
          <span className="h5" style={{ fontWeight: 600 }}>
            {mayTinh.moTa}
          </span>
          <div>
            <span style={{ fontWeight: 600 }}>- Trạng thái: </span>
            {renderTrangThai()}
          </div>
          <div>
            <span style={{ fontWeight: 600 }}>- Thiết bị phần cứng: </span>{" "}
            <br />
            {renderThietBi()}
          </div>
        </div>
      </>
    );
  };

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

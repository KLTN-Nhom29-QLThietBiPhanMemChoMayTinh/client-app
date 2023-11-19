import React from "react";
import { useSelector } from "react-redux";

export default function ComponentThongTinChiTiet() {
  let { objThongTin } = useSelector((state) => state.homeReducer);
  if (
    Object.keys(objThongTin).length === 0 ||
    objThongTin.tang == null ||
    Object.keys(objThongTin.tang).length === 0
  ) {
    return <></>;
  }

  let { phong, tang, mayTinh, arrPhanMem, arrThietBi, giaoVien, nhanVien, monHoc } =
    objThongTin;

  // render
  const renderThongTinTheoPhong = () => {
    if (Object.keys(phong).length === 0) {
      return <></>;
    }
    // render 
    const renderArrPhanMem = () => {
      if(arrPhanMem.length === 0) {
        return <li className="ms-3">Không có.</li>
      }
      return arrPhanMem?.map((item, index) => {
        if(!item.trangThai){
          return <></>
        }
        if(!item.trangThaiPM) {
          return <li key={index} className="ms-3 text-danger">{item.tenPhanMem}</li>
        }
        return <li key={index} className="ms-3">{item.tenPhanMem}</li>
      })
    }
    //
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
            {renderArrPhanMem()}
            
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
      if(arrThietBi?.length === 0)
        return <><li className="ms-3">
        Không có.
      </li></>
      return arrThietBi?.map((item, index) => {
        if(!item.status) {// thiet biij khong con sử dụng nưa
          return <></>
        }

        let {loaiThietBi}  = item;
        if(!item.trangThaiTbi){
          return (
            <li key={index} className="ms-3 text-danger">
              <strong>{loaiThietBi.tenLoai}: </strong>{item.tenThietBi}
            </li>
          );
        }
        return (
          <li key={index} className="ms-3">
            <strong>{loaiThietBi.tenLoai}: </strong>{item.tenThietBi}
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

import React from "react";
import { useSelector } from "react-redux";
import { formatStringDate } from "../../util/config";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ComponentModelDetail() {
  const navigate = useNavigate();
  //
  let { objThongTin } = useSelector((state) => state.homeReducer);
  if (
    Object.keys(objThongTin).length === 0 ||
    Object.keys(objThongTin.tang).length === 0
  ) {
    return <></>;
  }

  let {
    phong,
    tang,
    mayTinh,
    arrPhanMem,
    arrThietBi,
    giaoVien,
    nhanVien,
    monHoc,
  } = objThongTin;

  // render
  const renderThongTinNhanVien = () => {
    if (Object.keys(nhanVien).length === 0) {
      return <div className="ms-3">Không có thông tin.</div>;
    }

    return <>Họ ten - sdt</>;
  };
  //
  const renderThongTinMonHoc = () => {
    if (Object.keys(monHoc).length === 0) {
      return <div className="ms-3">Không có thông tin.</div>;
    }
    return <>ten mon hoc - ca truoc - ca sap toi - ten gv - sdt - khoa</>;
  };
  const renderThongTinPhanMem = () => {
    if (arrPhanMem?.length === 0) {
      return <div className="ms-3">Không có thông tin.</div>;
    }

    return (
      <div className="px-3">
        <table className="table w-100 table-striped table-hover align-middle">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phần mềm</th>
              <th>Phiên bản</th>
              <th>Ngày hết hạn</th>
              <th>Trạng thái</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {arrPhanMem.map((item, index) => {
              // render
              const renderTrangThai = () => {
                if (!item.trangThai) {
                  return <span className="text-danger">Không sử dụng</span>;
                }

                return item.trangThaiPM ? (
                  "Đang sử dụng"
                ) : (
                  <span className="text-danger">Bị hỏng</span>
                );
              };
              let ngayKT = new Date(item?.ngayCaiDat);
              ngayKT.setMonth(ngayKT.getMonth() + item?.tuoiTho);
              return (
                <tr key={index}>
                  <td className="text-center">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </td>
                  <td>{item.tenPhanMem}</td>
                  <td className="text-center">{item.phienBan}</td>
                  <td className="text-center">{formatStringDate(ngayKT)}</td>
                  <td className="text-center">{renderTrangThai()}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary px-2"
                      style={{ padding: "2px" }}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => {
                        navigate(
                          `/quan-ly/phan-mem/update?id=${item.maPhanMem}`
                        );
                      }}
                    >
                      <FaPencilAlt color="white" size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  //
  const renderThongTinThietBi = () => {
    if (arrThietBi?.length !== 0 && arrThietBi != null) {
      return (
        <div className="px-3">
          <table className="table w-100 table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên thiết bị</th>
                <th>Ngày hết hạn</th>
                <th>Trạng thái</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {arrThietBi?.map((item, index) => {
                // render
                const renderTrangThai = () => {
                  if (!item.status) {
                    return <span className="text-danger">Không sử dụng</span>;
                  }

                  return item.trangThaiTbi ? (
                    "Đang sử dụng"
                  ) : (
                    <span className="text-danger">Bị hỏng</span>
                  );
                };
                let ngayKT = new Date(item?.ngayCaiDat);
                ngayKT.setMonth(ngayKT.getMonth() + item?.tuoiTho);
                return (
                  <tr key={index}>
                    <td className="text-center">
                      {index < 9 ? `0${index + 1}` : index + 1}
                    </td>
                    <td>{item.tenThietBi}</td>
                    <td className="text-center">{formatStringDate(ngayKT)}</td>
                    <td className="text-center">{renderTrangThai()}</td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary px-2"
                        style={{ padding: "2px" }}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          navigate(
                            `/quan-ly/thiet-bi/update?id=${item.maThietBi}`
                          );
                        }}
                      >
                        <FaPencilAlt color="white" size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    return <div className="ms-3">Không có thông tin.</div>;
  };

  if (Object.keys(phong).length === 0) {
    return (
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="modalIdDetail"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modalTitleId"
          aria-hidden="true"
        >
          <div className=" modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title text-center w-100" id="modalTitleId">
                  {tang.toaNha.tenToaNha} - {tang.tenTang} - {}
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="container-fluid ">
                  <h4> Hãy chọn một phòng học.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdDetail"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title text-center w-100" id="modalTitleId">
                {tang.toaNha.tenToaNha} - {tang.tenTang} - {phong.tenPhong} - Số
                máy: {phong.soMay}
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid ">
                {/* THông tin */}

                <div className="pt-2">
                  <strong>Nhân viên trực: </strong> <br />
                  {renderThongTinNhanVien()}
                </div>
                <div className="pt-2">
                  <strong>Môn học: </strong> <br />
                  {renderThongTinMonHoc()}
                </div>
                <div className="pt-2">
                  <strong>Ứng dụng phần mềm: </strong> <br />
                  {renderThongTinPhanMem()}
                </div>
                <div className="pt-2">
                  <strong>Thiết bị phần cứng: </strong> <br />
                  {renderThongTinThietBi()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

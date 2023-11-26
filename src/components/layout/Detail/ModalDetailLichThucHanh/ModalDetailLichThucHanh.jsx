import React from "react";
import { useSelector } from "react-redux";
import { formatStringDate } from "../../../../util/config";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ModalDetailLichThucHanh() {
  //
  const navigate = useNavigate();
  //
  let { objDetailCaTH } = useSelector((state) => state.lichThucHanhReducer);

  let {
    ngayThucHanh,
    tenCa,
    tietBatDau,
    tietKetThuc,
    giaoVien,
    phongMay,
    monHoc,
  } = objDetailCaTH;

  // render
  //
  const renderDetailPhongMay = () => {
    if (phongMay == null) return <>Không có thông tin.</>;

    let { maPhong, tenPhong, soMay, moTa, trangThai, tang } = phongMay;

    return (
      <div className="px-3">
        <table className="table w-100 table-striped table-hover align-middle">
          <thead>
            <tr>
              <td className="text-center">Tên phòng máy</td>
              <td className="text-center">Mô tả</td>
              <td className="text-center">Số máy</td>
              <td className="text-center">Tầng</td>
              <td className="text-center">Tòa nhà</td>
              <td className="text-center">#</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{tenPhong}</td>
              <td>{moTa}</td>
              <td className="text-end">{soMay}</td>
              <td className="text-center">{tang.tenTang}</td>
              <td className="text-center">{tang.toaNha.tenToaNha}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-primary px-2"
                  style={{ padding: "2px" }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate(`/quan-ly/phong/update?id=${maPhong}`);
                  }}
                >
                  <FaPencilAlt color="black" size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  //
  const renderDetailGiaoVien = () => {
    if (giaoVien == null) return <>Không có thông tin.</>;

    let strGiaoVien = "";
    let { hoTen, soDienThoai, email, maGiaoVien, hocVi, khoa } = giaoVien;

    return (
      <div className="px-3">
        <table className="table w-100 table-striped table-hover align-middle">
          <thead>
            <tr>
              <td className="text-center">Tên giáo viên</td>
              <td className="text-center">Số điện thoại</td>
              <td className="text-center">Email</td>
              <td className="text-center">Khoa</td>
              <td className="text-center">#</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{hoTen}</td>
              <td className="text-center">{soDienThoai}</td>
              <td className="text-center">{email}</td>
              <td className="text-center">{khoa.tenKhoa}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-outline-primary px-2"
                  style={{ padding: "2px" }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    navigate(`/quan-ly/giao-vien/update?id=${maGiaoVien}`);
                  }}
                >
                  <FaPencilAlt color="black" size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  //
  const renderDetailMonHoc = () => {
    if (monHoc == null) {
      return <>Không có thông tin.</>;
    }
    let { tenMon, ngayBatDau, ngayKetThuc } = monHoc;
    let str = `${tenMon} ( có 2 buổi TH, ${formatStringDate(
      new Date(ngayBatDau)
    )} -> ${formatStringDate(new Date(ngayKetThuc))} ) `;

    return <>{str}</>;
  };
  //
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdDetailLichTH"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="modalTitleId">
                Thông tin chi tiết lịch thực hành
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                {/* body */}
                <div className="pt-2">
                  <strong>Môn học: </strong>
                  {renderDetailMonHoc()}
                </div>
                <div className="pt-2">
                  <strong>Buổi thực hành: </strong>
                  {tenCa}
                </div>
                <div className="pt-2">
                  <strong>tiết thực hành: </strong>
                  {`${tietBatDau} - ${tietKetThuc}`}
                </div>
                <div className="pt-2">
                  <strong>Giáo viên: </strong> <br />
                  {renderDetailGiaoVien()}
                </div>
                <div className="pt-2">
                  <strong>Phòng máy: </strong> <br />
                  {renderDetailPhongMay()}
                </div>
                {/*  */}
              </div>
            </div>
            <div className="modal-footer">{/* footer */}</div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { formatNameByHocVi, formatStringDate3 } from "../../../../util/config";

export default function ModalDetailMonHoc() {
  //detailMonHoc
  let { detailMonHoc } = useSelector((state) => state.monHocReducer);
  if (detailMonHoc == null || Object.keys(detailMonHoc).length === 0) {
    return <></>;
  }

  let { maMon, tenMon, ngayBatDau, soBuoi, dsCaThucHanh } = detailMonHoc;
  let ngayBD = new Date(ngayBatDau);
  let ngayKT = new Date(ngayBatDau);
  ngayKT.setDate(ngayKT.getDate() + (soBuoi + 1) * 7);

  // render
  let { giaoVien, phongMay } = dsCaThucHanh[0];
  let txtPhong = `${phongMay.tenPhong} - ${phongMay.tang.tenTang} - ${phongMay.tang.toaNha.maToaNha}`;
  const renderDSCaThucHanh = () => {
    return dsCaThucHanh.map((item, index) => {
      let tgian = new Date(item.ngayThucHanh);

      let strTietTH = `${item.tietBatDau} - ${item.tietKetThuc}`;

      return (
        <tr key={index}>
          <td>{item.buoiSo}</td>
          <td>{formatStringDate3(tgian)}</td>
          <td>{item.tenCa}</td>
          <td>{strTietTH}</td>
        </tr>
      );
    });
  };
  //
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdDetailMonHoc"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Bảng chi tiết môn học
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
                <div>
                  <div>
                    <strong>Tên môn: </strong>
                    <span>{tenMon}</span>
                  </div>
                  <div>
                    <strong>Số buổi: </strong>
                    <span>{soBuoi}</span>
                  </div>
                  <div>
                    <strong>Ngày bắt đầu: </strong>
                    <span>{formatStringDate3(ngayBD)}</span>
                  </div>
                  <div>
                    <strong>Ngày kết thúc: </strong>
                    <span>{formatStringDate3(ngayKT)}</span>
                  </div>
                  <div>
                    <strong>Giáo viên: </strong>
                    <span>
                      {formatNameByHocVi({
                        name: giaoVien.hoTen,
                        hocVi: giaoVien.hocVi,
                      })}
                    </span>
                  </div>
                  <div>
                    <strong>Phòng thực hành: </strong>
                    <span>{txtPhong}</span>
                  </div>
                  <div>
                    <strong>Danh sách ca thực hành: </strong> <br />
                    <div className="px-3">
                      <table className="table w-100 table-striped table-hover align-middle">
                        <thead>
                          <tr>
                            <th scope="col">Buổi TH</th>
                            <th scope="col">Ngày TH</th>
                            <th scope="col">Ca TH</th>
                            <th scope="col">tiết TH</th>
                          </tr>
                        </thead>
                        <tbody
                          className="over_flow_auto"
                          style={{ maxHeight: "300px" }}
                        >
                          {renderDSCaThucHanh()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button> */}
              {/* <button type="button" className="btn btn-primary">
                Save
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

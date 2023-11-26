import React from "react";

let date = new Date();
let dateYear = date.getFullYear();
let dateMonth = date.getMonth() + 1;
let dateDay = date.getDate();

let strDate = `${dateYear}-${dateMonth}-${dateDay}`;

//
export default function ModalSearchLichThucHanh() {
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="modalIdSearchLichTH"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className=" modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="modalTitleId">
                Tìm kiếm lịch thực hành
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
                  <strong>- Thời gian thực hành: </strong> <br />
                  <strong>Từ: 
                  <input
                    type="date"
                    className="col-4 mx-2"
                    id="dateFrom"
                    max={strDate}
                  /> Đến: 
                  <input
                    type="date"
                    className="col-4 mx-2"
                    id="dateTo"
                    max={strDate}
                    disabled={false}
                  />


</strong>
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

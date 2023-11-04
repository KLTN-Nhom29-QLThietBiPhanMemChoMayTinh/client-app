import React from 'react'

export default function ModalChangePass(props) {
  return (
    <>
      {/* Modal */}
      <form
        className="modal fade "
        id="modalId"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Thay đổi mật khẩu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="pass_old" className="form-label">
                  Mật khẩu cũ
                  <small id="helpPass_old" className="mx-2 form-text text-danger">*</small>
                </label>
                <input type="password" className="form-control" name="pass_old" id="pass_old" aria-describedby="helpPass_old" placeholder="Mật khẩu cũ" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="pass_new" className="form-label">
                  Mật khẩu mới
                  <small id="helpPass_new" className="mx-2 form-text text-danger">*</small>
                </label>
                <input type="password" className="form-control" name="pass_new" id="pass_new" aria-describedby="helpPass_new" placeholder="Mật khẩu mới" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="pass_new2" className="form-label">
                  Nhập lại mật khẩu
                  <small id="helpPass_new2" className="mx-2 form-text text-danger">*</small>
                </label>
                <input type="password" className="form-control" name="pass_new2" id="pass_new2" aria-describedby="helpPass_new2" placeholder="Mật khẩu mới" />
              </div>


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Thoát
              </button>
              <button type="button" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

import React, { useState } from 'react'

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{6,}$/;

export default function ModalChangePass(props) {

  let [password, setPassword] = useState({
    pass_old: '',
    pass_new: '',
    pass_new2: ''
  })
  let [errPass, setErrorPass] = useState({
    pass_old: '',
    pass_new: '',
    pass_new2: ''
  })

  // handle
  const handleChangePass = (e) => {
    const regex = new RegExp(REGEX_PASSWORD);
    let {id,value} = e.target;

    setPassword({...password, [id] : value})


    if ([id] == 'pass_new2') {
      if (value !== password.pass_new && value.length >=6 ) {
        setErrorPass({...errPass, pass_new2:'Hai mật khẩu mới phải giống nhau!'})
      }
      else if(value === password.pass_new)
      {
        setErrorPass({...errPass, pass_new2:''})
      }
    }
    else{
      let booleanRegex = regex.test(value);
      if(!booleanRegex && value.length >=6 )
      {
          setErrorPass({...errPass, [id]:'Mật khẩu trên 6 ký tự có ít nhất một chữ cái hoắc chữ số!'})
      }
      else if(booleanRegex)
      {
        setErrorPass({...errPass, [id]:''})
      }
    }
    if ([id] == 'pass_new') {
      if (value === password.pass_new2 && value.length >=6 ) 
      {
        setErrorPass({...errPass, pass_new2:''})
      }
      else if(value !== password.pass_new2 && password.pass_new2.length >=6){
        setErrorPass({...errPass, pass_new2:'Hai mật khẩu mới phải giống nhau!'})
      }
    }
  }
  //
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(password);
    if(checkData()) {
      // true
    }
    // false
  }
  // 
  const checkData = () => {
    const regex = new RegExp(REGEX_PASSWORD);
    // let booleanRegex = regex.test(value);

    /**
     * duyet obj 
     - so sanh vs regex
     - xxuat loi
     - check data cu vs data moi 
     - gui data redux
     - cal Api
     */
    return true;
  }

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
                onClick={() => {
                  setErrorPass({
                    pass_old: '',
                    pass_new: '',
                    pass_new2: ''
                  });
                  setPassword({
                    pass_old: '',
                    pass_new: '',
                    pass_new2: ''
                  });
                }}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="pass_old" className="form-label">
                  Mật khẩu cũ
                  <small id="helpPass_old" className="mx-2 form-text text-danger">*{errPass.pass_old}</small>
                </label>
                <input onChange={handleChangePass} value={password.pass_old} type="password" className="form-control" name="pass_old" id="pass_old" aria-describedby="helpPass_old" placeholder="Mật khẩu cũ" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="pass_new" className="form-label">
                  Mật khẩu mới
                  <small id="helpPass_new" className="mx-2 form-text text-danger">*{errPass.pass_new}</small>
                </label>
                <input  onChange={handleChangePass} value={password.pass_new}  type="password" className="form-control" name="pass_new" id="pass_new" aria-describedby="helpPass_new" placeholder="Mật khẩu mới" />
              </div>
              
              <div className="mb-3">
                <label htmlFor="pass_new2" className="form-label">
                  Nhập lại mật khẩu
                  <small id="helpPass_new2" className="mx-2 form-text text-danger">*{errPass.pass_new2}</small>
                </label>
                <input  onChange={handleChangePass} value={password.pass_new2}  type="password" className="form-control" name="pass_new2" id="pass_new2" aria-describedby="helpPass_new2" placeholder="Mật khẩu mới" />
              </div>


            </div>
            <div className="modal-footer">
              <button
                type="reset"
                className="btn btn-secondary"
                onClick={() => {
                  setErrorPass({
                    pass_old: '',
                    pass_new: '',
                    pass_new2: ''
                  });
                  setPassword({
                    pass_old: '',
                    pass_new: '',
                    pass_new2: ''
                  });
                }}
              >
                Làm mới
              </button>
              <button 
                onClick={handleSubmit}
                type="submit" className="btn btn-primary">
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
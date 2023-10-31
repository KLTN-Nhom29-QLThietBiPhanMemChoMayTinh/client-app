import React, { useEffect } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllNhanVienApi } from "../../../redux/reducers/nhanVienReducer";
import { getAllTangApi } from "../../../redux/reducers/tangReducer";

let day_now = new Date();
let strDateMax = `${day_now.getFullYear()}-${day_now.getMonth()}-${day_now.getDate()}`;
let strDateMin = `${day_now.getFullYear() - 5}-${day_now.getMonth()}-${day_now.getDate()}`;


export default function FormAddLichTruc() {
    const dispatch = useDispatch();

    const {arrNhanVien } = useSelector(state => state.nhanVienReducer);
    const {arrTang } = useSelector(state => state.tangReducer);
    
    useEffect(()=> {
        if (arrNhanVien.length === 0 ) {
            dispatch(getAllNhanVienApi);
        }
        if (arrTang.length === 0 ) {
            dispatch(getAllTangApi);
        }
    }, [])


    // handle
    const handleSubmit = (e) => {

    }


  // Mảng quản lý data navtab
  let arrLinkNavTab = [{ name: "Phân công lịch trực", link: "../phan-cong/lich-truc" }];
  //
  return (
    <>
      <div className="container " style={{height:'100vh'}}>
      <div className="d-flex flex-column justify-content-between h-100">
        <div className="">
        {/*  */}
        <NavTab
          itemLink={{
            arrLinkNavTab,
            chucNang: "Tạo mới",
          }}
        />
        {/* Form */}
        <div className=" bg-white p-4">
          <form onSubmit={handleSubmit} action="/quan-ly/khu-vuc">

            <div className="row">
               <div className="col-md-6">
                  {/* select nv  */}
                  <div class="mb-3 px-3">
                     <label for="selectNameNV" class="form-label">
                        Chọn nhân viên
                        <small id="errNameNV" className="form-text text-danger mx-1">*</small>
                     </label>
                     <div className="col-10">
                        <select class="form-select " name="selectNameNV" id="selectNameNV" aria-describedby="errNameNV" >
                              {arrNhanVien.map((item,index) => {
                                 return (
                                    <option key={index} value={item.maNV}>{item.tenNV}</option>
                                 )
                              })}
                        </select>
                     </div>
                  </div>
                  {/*  */}
                  <div className="mb-3 px-3">
                     <label htmlFor="id1" className="form-label">
                        Thời gian trực sau phai bo
                        <small id="helpId1" className="form-text text-danger mx-1">*</small>
                     </label>
                     <div className="col-10">
                        <input type="date" className="form-control" name="id1" id="id1" 
                           defaultValue={"2023-10-01"} 
                           max={strDateMax} 
                           min={strDateMin} 
                           aria-describedby="helpId1"  />
                     </div>
                  </div>
                  {/*  */}
                  <div class="mb-3 px-3">
                     <label for="selectCaTruc" class="form-label">
                        Chọn ca chực
                        <small id="errCaTruc" className="form-text text-danger mx-1">*</small>
                     </label>
                     <div className="col-10">
                        <select class="form-select " name="selectCaTruc" id="selectCaTruc" aria-describedby="errCaTruc" >
                           <option  value={1}>6h-14h</option>
                           <option  value={2}>14h-22h</option>
                        </select>
                     </div>
                  </div>

               </div>
               <div className="col-md-6">
                  {/* select Toa Nha  */}
                  <div class="mb-3  px-3">
                     <label for="selectTang" class="form-label">
                        Chọn tòa nhà
                        <small id="errTang" className="form-text text-danger mx-1">*</small>
                     </label>
                     <div className="col-10">
                        <select class="form-select " name="selectTang" id="selectTang" aria-describedby="errTang" >
                              {arrTang.map((item,index) => {
                                 return (
                                    <option key={index} value={item.maTang}>{item.tenTang}</option>
                                 )
                              })}
                        </select>
                     </div>                     
                  </div>

                  {/* select tang  */}
                  <div class="mb-3  px-3">
                     <label for="selectTang" class="form-label">
                        Chọn tầng
                        <small id="errTang" className="form-text text-danger mx-1">*</small>
                     </label>
                     <div className="col-10">
                        <select class="form-select " name="selectTang" id="selectTang" aria-describedby="errTang" >
                              {arrTang.map((item,index) => {
                                 return (
                                    <option key={index} value={item.maTang}>{item.tenTang}</option>
                                 )
                              })}
                        </select>
                     </div>                     
                  </div>
               </div>
            </div>

            


            <div className="mt-4">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button type="reset" className="btn btn-danger mx-3">
                  Reset
                </button>
            </div>
          </form>
        </div>
        </div>
        
        <Footer />
      </div>
    </div>
    </>
  );
}

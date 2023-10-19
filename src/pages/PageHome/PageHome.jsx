import React from "react";

export default function PageHome() {
//   $(document).ready(function() {
//     $('#example').dataTable( {
//         "scrollX": true
//     } );
// } );


  return (
    <div
      className="row p-2 d-flex justify-content-between bg-light  w-100"
      style={{ height: "100vh", margin: "0px" }}
    >
      {/*1. col Toa nha -- Tang */}
      <div className="col-2  flex-column d-flex px-1">
          {/* select toa nha */}
          <div >
            <select className="form-select form-select-lg">
              <option selected>Tòa nhà A</option>
              <option value>Tòa nhà B</option>
              <option value>Tòa nhà C</option>
            </select>
          </div>
        {/* List tang */}
        <div className=" border border-info rounded mt-2 flex-grow-1  d-flex flex-column " style={{maxHeight:'89vh', minHeight:'auto'  }}>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            <button type="button" className="btn btn-primary  mx-2 mt-2">Tầng 1</button>
            
        </div>
      </div>

      {/*1. Col2 phong - CT Phong  */}
      <div
        className="col-7 flex-column d-flex px-2"
        style={{ height: "100%",  }}
      >
        {/* list Phong  */}
        <div className="border border-info rounded d-flex flex-row  mb-2 text-white over_flow_auto" >
          
          <div className="bg-success rounded d-flex flex-column  my-2 ms-2 " style={{height:'90px'}}>
            <span className=" flex-grow-1 text-center  pt-2 " style={{width: '110px'}}>Phòng máy H3.1.1</span>
            <button  className="btn btn-success border-top border-0  rounded-0 rounded-bottom border-dark " style={{fontSize:'13px', padding:'5px'}}>Chi tiết</button>
          </div>

        </div>
        {/* List Detail Phong */}
        <div className="bg-warning flex-grow-1">PageHome</div>
      </div>

      {/*1. Col3 Thongo tin  */}
      <div className="col-3 bg-primary">PageHome</div>
    </div>
  );
}

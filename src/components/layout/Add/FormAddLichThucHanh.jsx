import React, { useEffect, useRef, useState } from "react";
import NavTab from "../../common/NavTab/NavTab";
import Footer from "../../common/Footer/Footer";
import { getAllToaNhaApi } from "../../../redux/reducers/toaNhaReducer";
import { getAllTangApi } from "../../../redux/reducers/tangReducer";
import { getAllPhongMayApi } from "../../../redux/reducers/phongMayReducer";
import { useDispatch, useSelector } from "react-redux";
import { getAllMonHoc } from "../../../redux/reducers/monHocReducer";
import { getAllGiaoVienApi } from "../../../redux/reducers/giaoVienReducer";
import {
  getAllDsPhongHocInMonHoc,
  getDSPhong_trungPM_MonHocApi,
  insertCaThucHanhApi,
  serArrPhongByDSPhanMem_MonHocAction,
  setArrMonHoc_CaThucHanhApi,
  setThongtinKhiSelMonHoc_All,
} from "../../../redux/reducers/lichThucHanhReducer";
import { formatStringDate3 } from "../../../util/config";

export default function FormAddLichThucHanh() {
  //
  const dispatch = useDispatch();
  //
  let { arrPhanMemByMonHoc, arrPhongByMonHoc, arrMonHoc_CaTH } = useSelector(
    (state) => state.lichThucHanhReducer
  );
  let { arrToaNha } = useSelector((state) => state.toaNhaReducer);
  let { arrTang } = useSelector((state) => state.tangReducer);
  let { arrPhongMay } = useSelector((state) => state.phongMayReducer);
  let { arrGiaoVien } = useSelector((state) => state.giaoVienReducer);
  let { arrMonHoc } = useSelector((state) => state.monHocReducer);
  //
  let objCaThucHanh = useRef({
    valueSelGiaoVien: -1,
    soCaTH: 0,
    ngayBD: "",
    ngayKT: "",
    valueSelMonHoc: -1,
    valueSelTang: -1,
    valueSelPhongMay: -1,
    valueSelToaNha: -1,
    valueSelBuoiTH: -1,
  });
  let [errCaTH, setErrCaTH] = useState({
    valueSelGiaoVien: "",
    valueSelMonHoc: "",
    valueSelTang: "",
    valueSelPhongMay: "",
    valueSelToaNha: "",
    valueSelBuoiTH: "",
  });

  //
  useEffect(() => {
    if (arrToaNha.length === 0) {
      dispatch(getAllToaNhaApi);
    }
    if (arrTang.length === 0) {
      dispatch(getAllTangApi);
    }
    if (arrPhongMay.length === 0) {
      dispatch(getAllPhongMayApi);
    }
    if(arrMonHoc_CaTH.length === 0) {
      dispatch(setArrMonHoc_CaThucHanhApi)
    }
    if (arrMonHoc.length === 0) {
      dispatch(getAllMonHoc);
    }
    if (arrGiaoVien.length === 0) {
      dispatch(getAllGiaoVienApi);
    }
    // update arrPhongByMonHoc - gia tri ban dau là toàn bộ arrPhong
    if (arrPhongByMonHoc.length === 0) {
      dispatch(getAllDsPhongHocInMonHoc);
    }

    // setErrCaTH({ ...errCaTH });
  }, []);
  //
  //handle
  //
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkData()) {
      //false
      console.log("false");
      return;
    }
    //true
    let {
      valueSelGiaoVien,
      soCaTH,
      valueSelMonHoc,
      valueSelTang,
      valueSelPhongMay,
      valueSelToaNha,
      valueSelBuoiTH,
    } = objCaThucHanh.current;

    let objMonHoc = arrMonHoc.find((item) => {
      return item.maMon == valueSelMonHoc;
    });
    let objGiaoVien = arrGiaoVien.find((item) => {
      return item.maGiaoVien == valueSelGiaoVien;
    });
    let objPhongMay = arrPhongMay.find((item) => {
      return item.maPhong == valueSelPhongMay;
    });
    let tenCa = "";
    let tietBatDau = "";
    let tietKetThuc = "";
    if (valueSelBuoiTH == 1) {
      tenCa = "sáng";
      tietBatDau = 1;
      tietKetThuc = 3;
    } else if (valueSelBuoiTH == 2) {
      tenCa = "chiều";
      tietBatDau = 4;
      tietKetThuc = 6;
    } else {
      tenCa = "tối";
      tietBatDau = 7;
      tietKetThuc = 9;
    }
    let objData = {
      tenCa,
      tietBatDau,
      tietKetThuc,
      giaoVien: objGiaoVien,
      phongMay: objPhongMay,
      monHoc: objMonHoc,
    };

    console.log(objData);
    dispatch(insertCaThucHanhApi(objData));
  };
  //
  const checkData = () => {
    let check = 1;
    let err_valueSelGiaoVien = "";
    let err_valueSelMonHoc = "";
    let err_valueSelTang = "";
    let err_valueSelPhongMay = "";
    let err_valueSelToaNha = "";
    let err_valueSelBuoiTH = "";
    let err_text = "Hãy chọn thông tin!";
    let {
      valueSelGiaoVien,
      soCaTH,
      valueSelMonHoc,
      valueSelTang,
      valueSelPhongMay,
      valueSelToaNha,
      valueSelBuoiTH,
    } = objCaThucHanh.current;

    //
    if (valueSelBuoiTH == -1) {
      err_valueSelBuoiTH = err_text;
      check = 0;
    }
    //
    if (valueSelPhongMay == -1) {
      err_valueSelPhongMay = err_text;
      check = 0;
    }
    //
    if (valueSelMonHoc == -1) {
      err_valueSelMonHoc = err_text;
      check = 0;
    }
    //
    if (valueSelGiaoVien == -1) {
      err_valueSelGiaoVien = err_text;
      check = 0;
    }

    setErrCaTH({
      ...errCaTH,
      valueSelGiaoVien: err_valueSelGiaoVien,
      valueSelMonHoc: err_valueSelMonHoc,
      valueSelTang: err_valueSelTang,
      valueSelPhongMay: err_valueSelPhongMay,
      valueSelToaNha: err_valueSelToaNha,
      valueSelBuoiTH: err_valueSelBuoiTH,
    });

    return check;
  };
  //
  const handleChangeSelectBuoiTH = (e) => {
    let { value } = e.target;

    objCaThucHanh.current.valueSelBuoiTH = value;

    setErrCaTH({ ...errCaTH, valueSelBuoiTH: "" });
  };
  //
  const handleChangeSelectGiaoVien = (e) => {
    let value = e.target.value;
    objCaThucHanh.current.valueSelGiaoVien = value;

    if (value == -1) {
      setErrCaTH({
        ...errCaTH,
        valueSelGiaoVien: "Hãy chọn giáo viên!",
      });
    } else {
      setErrCaTH({
        ...errCaTH,
        valueSelGiaoVien: "",
      });
    }
  };
  //
  const handleChangeSelectMonHoc = (e) => {
    let value = e.target.value;
    if (value == -1) {
      objCaThucHanh.current = {
        ...objCaThucHanh.current,
        valueSelMonHoc: value,
        soCaTH: 0,
        ngayBD: "",
        ngayKT: "",
      };
      dispatch(setThongtinKhiSelMonHoc_All(arrPhongMay));

      setErrCaTH({
        ...errCaTH,
        valueSelMonHoc: "Hãy chọn môn học!",
      });
    } else {
      let objDataMH = arrMonHoc.find((item) => item.maMon == value);
      let { soBuoi, ngayBatDau, maMon } = objDataMH;

      // tim PM cho mon hoc - tim phongf
      dispatch(getDSPhong_trungPM_MonHocApi(maMon, arrPhongMay));

      /// gans cho thong tin mon hoc
      let ngayBD = new Date(ngayBatDau);
      let ngayKT = new Date(ngayBatDau);
      ngayKT.setDate(ngayKT.getDate() + (soBuoi + 1) * 7);
      //
      objCaThucHanh.current = {
        ...objCaThucHanh.current,
        valueSelMonHoc: value,
        valueSelPhongMay: -1,
        valueSelToaNha: -1,
        valueSelTang: -1,
        soCaTH: soBuoi,
        ngayBD: formatStringDate3(ngayBD),
        ngayKT: formatStringDate3(ngayKT),
      };

      setErrCaTH({
        ...errCaTH,
        valueSelMonHoc: "",
        valueSelPhongMay: "",
        valueSelToaNha: "",
        valueSelTang: "",
      });
    }
  };
  //
  const handleChangeSelectPhongMay = (e) => {
    let value = e.target.value;
    objCaThucHanh.current = {
      ...objCaThucHanh.current,
      valueSelPhongMay: value,
    };
    if (value == -1) {
      setErrCaTH({
        ...errCaTH,
        valueSelPhongMay: "Hãy chọn phòng máy!",
      });
    } else {
      setErrCaTH({
        ...errCaTH,
        valueSelPhongMay: "",
        valueSelTang: "",
        valueSelToaNha: "",
      });
    }
  };
  //
  const handleChangeSelectTang = (e) => {
    let value = e.target.value;
    objCaThucHanh.current = {
      ...objCaThucHanh.current,
      valueSelTang: value,
      valueSelPhongMay: -1,
    };
    if (value == -1) {
      setErrCaTH({
        ...errCaTH,
        valueSelTang: "Hãy chọn tầng!",
      });
    } else {
      setErrCaTH({
        ...errCaTH,
        valueSelTang: "",
        valueSelToaNha: "",
      });
    }
  };
  //
  const handleChangeSelectToaNha = (e) => {
    let value = e.target.value;
    objCaThucHanh.current = {
      ...objCaThucHanh.current,
      valueSelToaNha: value,
      valueSelTang: -1,
      valueSelPhongMay: -1,
    };
    if (value == -1) {
      setErrCaTH({
        ...errCaTH,
        valueSelToaNha: "Hãy chọn tòa nhà!",
      });
    } else {
      setErrCaTH({
        ...errCaTH,
        valueSelToaNha: "",
      });
    }
  };

  // render
  //
  const renderChangeSelectBuoiTH = () => {
    let { valueSelBuoiTH } = objCaThucHanh.current;
    if (valueSelBuoiTH != -1) {
      return (
        <>
          <option selected={valueSelBuoiTH == 1 ? 1 : 0} value={1}>
            Sáng
          </option>
          <option selected={valueSelBuoiTH == 2 ? 1 : 0} value={2}>
            Chiều
          </option>
          <option selected={valueSelBuoiTH == 3 ? 1 : 0} value={3}>
            Tối
          </option>
        </>
      );
    }
    return (
      <>
        <option selected={valueSelBuoiTH == -1 ? 1 : 0} value={-1}>
          Tất cả
        </option>
        <option selected={valueSelBuoiTH == 1 ? 1 : 0} value={1}>
          Sáng
        </option>
        <option selected={valueSelBuoiTH == 2 ? 1 : 0} value={2}>
          Chiều
        </option>
        <option selected={valueSelBuoiTH == 3 ? 1 : 0} value={3}>
          Tối
        </option>
      </>
    );
  };
  //
  const renderSelectGiaoVien = () => {
    let { valueSelGiaoVien } = objCaThucHanh.current;
    return arrGiaoVien.map((item, index) => {
      return (
        <option
          key={index}
          selected={valueSelGiaoVien == item.maGiaoVien ? 1 : 0}
          value={item.maGiaoVien}
        >
          {item.maGiaoVien} - {item.hoTen}
        </option>
      );
    });
  };
  //
  const renderSelectMonHoc = () => {
    let { valueSelMonHoc } = objCaThucHanh.current;
    return arrMonHoc.map((item, index) => {
      return (
        <option
          key={index}
          selected={valueSelMonHoc == item.maMon ? 1 : 0}
          value={item.maMon}
        >
          {item.maMon} - {item.tenMon}
        </option>
      );
    });
  };
  //
  const renderThongTinMonHoc = () => {
    let { valueSelMonHoc } = objCaThucHanh.current;
    if (valueSelMonHoc == -1) {
      return (
        <div className="text-center col-10" style={{ fontSize: "25px" }}>
          ...
        </div>
      );
    }
    return (
      <>
        {/* so CaThuc Hanh */}
        <div className="mb-3 col-10">
          <label htmlFor="soCaTH" className="form-label">
            Số ca thực hành
            <small id="helpId" className="form-text text-muted mx-2">
              *
            </small>
          </label>
          <input
            type="text"
            className="form-control"
            name="soCaTH"
            id="soCaTH"
            value={objCaThucHanh.current.soCaTH}
            aria-describedby="helpId"
            disabled
          />
        </div>
        {/* Ngay BD */}
        <div className="mb-3 col-10">
          <label htmlFor="ngayBD1" className="form-label">
            Ngày bắt đầu
            <small className="form-text text-muted mx-2">*</small>
          </label>
          <input
            type="text"
            className="form-control"
            name="ngayBD1"
            id="ngayBD1"
            value={objCaThucHanh.current.ngayBD}
            disabled
          />
        </div>
        {/* Ngay KT */}
        <div className="mb-3 col-10">
          <label htmlFor="ngayKT" className="form-label">
            Ngày kết thúc
            <small className="form-text text-muted mx-2">*</small>
          </label>
          <input
            type="text"
            className="form-control"
            name="ngayKT"
            id="ngayKT"
            value={objCaThucHanh.current.ngayKT}
            disabled
          />
        </div>
      </>
    );
  };
  const renderThongtinPM_inMonHoc = () => {
    if (arrPhanMemByMonHoc.length === 0) {
      return (
        <div className="text-center col-10" style={{ fontSize: "25px" }}>
          ...
        </div>
      );
    }
    return (
      <>
        <div className="mb-3 col-10">
          <label htmlFor="soPhanMem" className="form-label">
            Danh sách phần mềm cần thiết
            <small id="errSoPhanMem" className="form-text  mx-2 text-muted">
              *
            </small>
          </label>
          <div
            className="over_flow_auto"
            style={{
              height: "160px",
              paddingLeft: "10px",
              paddingBottom: "15px",
            }}
          >
            <ul>
              {arrPhanMemByMonHoc.map((item, index) => {
                return <li>{item.tenPhanMem}</li>;
              })}
            </ul>
          </div>
        </div>
      </>
    );
  };
  //
  const renderSelectPhongMay = () => {
    let { valueSelToaNha, valueSelTang, valueSelPhongMay } =
      objCaThucHanh.current;
    if (valueSelToaNha == -1) {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha khong co giatri
        return arrPhongByMonHoc.map((item, index) => {
          return (
            <option
              key={index}
              selected={valueSelPhongMay == item.maPhong ? 1 : 0}
              value={item.maPhong}
            >
              {item.tenPhong} - {item.tang.tenTang} -{" "}
              {item.tang.toaNha.tenToaNha}
            </option>
          );
        });
      } else {
        // select tang co gia tri
        // toa nha khong co giatri
        return arrPhongByMonHoc.map((item, index) => {
          if (item.tang.maTang == valueSelTang) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong} - {item.tang.toaNha.tenToaNha}
              </option>
            );
          }
          return <></>;
        });
      }
    } else {
      if (valueSelTang == -1) {
        // select tang khong co gia tri
        // toa nha co giatri
        return arrPhongByMonHoc.map((item, index) => {
          if (item.tang.toaNha.maToaNha == valueSelToaNha) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong} - {item.tang.tenTang}
              </option>
            );
          }
          return <></>;
        });
      } else {
        // select tang co gia tri
        // toa nha co giatri
        return arrPhongMay.map((item, index) => {
          if (
            item.tang.maTang == valueSelTang &&
            item.tang.toaNha.maToaNha == valueSelToaNha
          ) {
            return (
              <option
                key={index}
                selected={valueSelPhongMay == item.maPhong ? 1 : 0}
                value={item.maPhong}
              >
                {item.tenPhong}
              </option>
            );
          }
          return <></>;
        });
      }
    }
  };
  //
  const renderSelectTang = () => {
    let { valueSelToaNha, valueSelTang } = objCaThucHanh.current;

    return arrTang?.map((item, index) => {
      if (valueSelToaNha == -1) {
        return (
          <option key={index} value={item.maTang}>
            {item.tenTang} - {item.toaNha.tenToaNha}
          </option>
        );
      } else {
        if (item.toaNha.maToaNha == valueSelToaNha) {
          if (item.maTang == valueSelTang) {
            return (
              <option key={index} selected value={item.maTang}>
                {item.tenTang}
              </option>
            );
          }
          return (
            <option key={index} value={item.maTang}>
              {item.tenTang}
            </option>
          );
        } else return <></>;
      }
    });
  };
  //
  const renderSelctToaNha = () => {
    let { valueSelToaNha } = objCaThucHanh.current;

    return arrToaNha?.map((item, index) => {
      if (item.maToaNha == valueSelToaNha) {
        return (
          <option key={index} selected value={item.maToaNha}>
            {item.tenToaNha}
          </option>
        );
      }
      return (
        <option key={index} value={item.maToaNha}>
          {item.tenToaNha}
        </option>
      );
    });
  };

  // Mảng quản lý data navtab
  let arrLinkNavTab = [
    { name: "Phân công lịch thực hành", link: "/phan-cong/lich-thuc-hanh" },
  ];
  //
  return (
    <>
      <div className="container " style={{ height: "100vh" }}>
        <div className="d-flex flex-column justify-content-between h-100">
          <div style={{ height: "80vh" }}>
            {/*  */}
            <div style={{ height: "8vh" }}>
              <NavTab itemLink={{ arrLinkNavTab, chucNang: "Tạo mới" }} />
            </div>
            {/*  */}
            <div
              className="bg-white rounded p-4 px-5"
              style={{ height: "82vh" }}
            >
              {/* Form add */}
              <form
                onSubmit={handleSubmit}
                className="d-flex h-100 justify-content-between flex-column"
              >
                <div className="">
                  <h2 className="mx-3 mb-3 ">Tạo mới lịch thực hành</h2>
                  <div className="row">
                    {/* left */}
                    <div className="col-md-4">
                      {/* MOn hoc */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelMonHoc" className="form-label">
                          Môn học
                          <small className="form-text text-danger mx-2">
                            *{errCaTH.valueSelMonHoc}
                          </small>
                        </label>
                        <select
                          className="form-select "
                          name="valSelMonHoc"
                          id="valSelMonHoc"
                          onChange={handleChangeSelectMonHoc}
                        >
                          <option value={-1}>Tất cả</option>
                          {renderSelectMonHoc()}
                        </select>
                      </div>
                      {renderThongTinMonHoc()}

                      {/*  */}
                    </div>
                    {/* center */}
                    <div className="col-md-4">
                      {/* Giáo viên */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelGiaovien" className="form-label">
                          Giảng viên dạy
                          <small className="form-text text-danger mx-2">
                            *{errCaTH.valueSelGiaoVien}
                          </small>
                        </label>
                        <select
                          className="form-select "
                          name="valSelGiaovien"
                          id="valSelGiaovien"
                          onChange={handleChangeSelectGiaoVien}
                        >
                          <option value={-1}>Tất cả</option>
                          {renderSelectGiaoVien()}
                        </select>
                      </div>
                      {/* Buổi TH */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelBuoiTH" className="form-label">
                          Buổi thực hành
                          <small className="form-text text-danger mx-2">
                            *{errCaTH.valueSelBuoiTH}
                          </small>
                        </label>
                        <select
                          className="form-select "
                          name="valSelBuoiTH"
                          id="valSelBuoiTH"
                          onChange={handleChangeSelectBuoiTH}
                        >
                          {renderChangeSelectBuoiTH()}
                        </select>
                      </div>
                      {/* Phần mềm caanfn thiết */}

                      {renderThongtinPM_inMonHoc()}
                      {/*  */}
                    </div>
                    {/* right */}
                    <div className="col-md-4">
                      {/* tòa nhà */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelToaNha" className="form-label">
                          Chọn tòa nhà
                          <span className="text-danger mx-2">
                            *{errCaTH.valueSelToaNha}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="valSelToaNha"
                          id="valSelToaNha"
                          onChange={handleChangeSelectToaNha}
                        >
                          <option value={-1}>Tất cả</option>
                          {renderSelctToaNha()}
                        </select>
                      </div>
                      {/* tầng */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelTang" className="form-label">
                          Chọn tầng
                          <span className="text-danger mx-2">
                            *{errCaTH.valueSelTang}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="valSelTang"
                          id="valSelTang"
                          onChange={handleChangeSelectTang}
                        >
                          <option value={-1}>Tất cả</option>
                          {renderSelectTang()}
                        </select>
                      </div>
                      {/* phòng */}
                      <div className="mb-3 col-10">
                        <label htmlFor="valSelPhongMay" className="form-label">
                          Chọn phòng máy
                          <span className="text-danger mx-2">
                            *{errCaTH.valueSelPhongMay}
                          </span>
                        </label>
                        <select
                          className="form-select  "
                          name="valSelPhongMay"
                          id="valSelPhongMay"
                          onChange={handleChangeSelectPhongMay}
                        >
                          <option value={-1}>Tất cả</option>
                          {renderSelectPhongMay()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* footer - form */}
                <div className="">
                  <button type="reset" className="btn btn-danger mx-3">
                    Khôi phục
                  </button>
                  <button type="submit" className="btn btn-success mx-3">
                    Tạo mới
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/*  */}
          <Footer />
        </div>
      </div>
    </>
  );
}

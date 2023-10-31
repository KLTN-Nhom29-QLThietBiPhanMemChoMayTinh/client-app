import React from "react";
import {
  FaInstagram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN, getStoreJSON } from "../../util/config";
import { formatNameByQuyen } from "../../util/formatString";

export default function PageBrand() {
  const navigate = useNavigate();

  // render

  const renderBtnStart = () => {
    let userStore = getStoreJSON(USER_LOGIN);

     if (Object.keys(userStore).length === 0) {
        // TH Store khong co data
        return (
          <a
            className=" btn btn-light p-4 fs-3 px-5 fw-bold "
            href={"/login"}
            style={{ borderRadius: "30px" }}
          >
            Bắt đầu!
          </a>
        );
      } else {
        return (
          <a
            className=" btn btn-light p-4 fs-3 px-5 fw-bold "
            href={"/home"}
            style={{ borderRadius: "30px" }}
          >
            Bắt đầu - {formatNameByQuyen({name : userStore.name, tenQuyen: userStore.quyen.tenQuyen})}
          </a>
          );
      }
    
  };

  return (
    <div>
      <div>
        <nav className="navbar navbar-dropdown navbar-expand-lg fixed-top  ">
          <div
            className="container p-3 opacity_bg_white "
            style={{ borderRadius: "30px" }}
          >
            <span className="navbar-logo mb-1">
              <a href="#header10-1m">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_IUH.png/800px-Logo_IUH.png"
                  alt="Mobirise Website Builder"
                  style={{ height: "3rem" }}
                />
              </a>
            </span>
            <a
              className="navbar-brand h5 fw-bolder m-0 me-3"
              href="#header10-1m"
            >
              Application
            </a>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li
                  className="nav-item px-2 link1"
                  style={{ fontWeight: "600" }}
                >
                  <a
                    className="nav-link active"
                    href="#header10-1m"
                    aria-current="page"
                  >
                    Home <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li
                  className="nav-item px-2 link1"
                  style={{ fontWeight: "600" }}
                >
                  <a className="nav-link active" href="#people03-1u">
                    About
                  </a>
                </li>
                <li
                  className="nav-item px-2 link1"
                  style={{ fontWeight: "600" }}
                >
                  <a className="nav-link active" href="#contacts02-1n">
                    Contacts
                  </a>
                </li>
              </ul>
              <div className="d-flex my-2 my-lg-0">
                <button
                  className="btn btn-success my-2 my-sm-0"
                  type="button"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <section
        data-bs-version="5.1"
        className=" mbr-fullscreen class_home"
        id="header10-1m"
      >
        <div className="container-fluid">
          <div className="row justify-content-md-center text-center">
            <div className="content-wrap col-12 col-md-6 ">
              <div
                className="d-flex flex-column justify-content-center"
                style={{ height: "100vh" }}
              >
                <h1 className="mbr-section-title mbr-fonts-style text-white mb-4 display-5">
                  <strong>
                    Hệ thống quản lý thiết bị phòng công nghệ thông tin trường
                    DHCN
                  </strong>
                </h1>
                <p className="text-white mb-4 display-7">
                  Hê thống giúp người dùng quản lý phòng máy và phân công giảng
                  dạy cho giáo viên
                </p>
                <div className="mbr-section-btn">{renderBtnStart()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="people03-1u" style={{ backgroundColor: "#edefeb" }}>
        <div className="container-fluid pt-3">
          <div className="p-5 text-center">
            <strong style={{ fontSize: "50px", fontWeight: 800 }}>
              Meet the creators
            </strong>
          </div>
          <div className="container" style={{ backgroundColor: "#edefeb" }}>
            <div className="row">
              <div className=" col-12 col-md-6 col-lg-4 ">
                <div className="item px-2">
                  <div className="item-img mb-3">
                    <img
                      src="https://i.pravatar.cc/?u=46"
                      alt="Mobirise Website Builder"
                      // width={'500px'}
                      className="w-100 rounded"
                      data-slide-to={2}
                      data-bs-slide-to={2}
                    />
                  </div>
                  <div className="item-content align-left">
                    <h5 className=" mb-3 ">Promotion</h5>
                    <h6 className="mb-3 h1">
                      <strong>
                        Customer service is very important, customer support.
                      </strong>
                    </h6>
                    <p className="mt-3 ">22 may, 18 min</p>
                  </div>
                </div>
              </div>
              <div className=" col-12 col-md-6 col-lg-4 ">
                <div className="item px-2">
                  <div className="item-img mb-3">
                    <img
                      src="https://i.pravatar.cc/?u=42"
                      alt="Mobirise Website Builder"
                      className="w-100 rounded"
                      data-slide-to={2}
                      data-bs-slide-to={2}
                    />
                  </div>
                  <div className="item-content align-left">
                    <h5 className=" mb-3 ">Branding</h5>
                    <h6 className="mb-3 h1">
                      <strong>
                        Customer service is very important, customer support.
                      </strong>
                    </h6>
                    <p className="mt-3 ">28 may, 11 min</p>
                  </div>
                </div>
              </div>
              <div className=" col-12 col-md-6 col-lg-4 ">
                <div className="item px-2">
                  <div className="item-img mb-3">
                    <img
                      src="https://i.pravatar.cc/?u=20"
                      alt="Mobirise Website Builder"
                      className="w-100 rounded"
                      data-slide-to={2}
                      data-bs-slide-to={2}
                    />
                  </div>
                  <div className="item-content align-left">
                    <h5 className=" mb-3 ">Branding</h5>
                    <h6 className="mb-3 h1">
                      <strong>
                        Customer service is very important, customer support.
                      </strong>
                    </h6>
                    <p className="mt-3 ">12 may, 22 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section
        id="contacts02-1n"
        style={{ backgroundColor: "#edefeb" }}
        className="py-4"
      >
        <div className="container-fluid">
          <div className="p-5 text-center">
            <strong style={{ fontSize: "50px", fontWeight: 800 }}>
              Contacts
            </strong>
          </div>
          <div
            className="container pb-5"
            style={{ backgroundColor: "#edefeb" }}
          >
            <div className="row justify-content-center mt-4">
              <div className=" col-12 col-md-6 px-3 ">
                <div
                  className="card borderRadius20 p-5"
                  style={{ height: "98%" }}
                >
                  <div className="card-wrapper">
                    <div className="text-wrapper">
                      <h5 className="cardTitle1 mb-2 ">
                        <strong>Contact Us</strong>
                      </h5>
                      <ul className="mbr-ul1">
                        <li className="mbr-text1">
                          Phone:
                          <a href="tel:+12345678910" className=" text-a1">
                            +12345678910
                          </a>
                        </li>
                        <li className="mbr-text1">
                          WhatsApp:
                          <a href="tel:+12345678910" className="text-a1">
                            0 (800) 123 45 67
                          </a>
                        </li>
                        <li className="mbr-text1">
                          Email:
                          <a href="mailto:info@site.com" className="text-a1">
                            info@site.com
                          </a>
                        </li>
                        <li className="mbr-text1">
                          Address: 350 5th Ave, New York, NY 10118
                        </li>
                        <li className="mbr-text1">
                          Working hours: 9:00AM - 6:00PM
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 px-3 ">
                <div className="google-map ">
                  <iframe
                    className="borderRadius20  w-100"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13965.071372091228!2d106.68703928078371!3d10.825417388742796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1698230442166!5m2!1svi!2s"
                    height={360}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-5"
        style={{ backgroundColor: "#fff" }}
        id="social02-1s"
      >
        <div className="container-fluid">
          <div className="p-5 text-center">
            <strong style={{ fontSize: "50px", fontWeight: 800 }}>
              Follow us
            </strong>
          </div>
          <div className="container bg-white pb-4">
            <div className="row">
              {/* item */}
              <div className="item col-12 col-md-6 col-lg-4 mb-4">
                <div className="row d-flex align-items-center">
                  <FaInstagram size={50} color="#198754" className="col-3" />
                  <div className="col-7">
                    <h4 className="card-title mbr-fonts-style mb-1 display-7">
                      <strong>Instagram</strong>
                    </h4>
                    <h5 className="card-text mbr-fonts-style display-7">
                      Very happy customer.
                    </h5>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="item col-12 col-md-6 col-lg-4 mb-4">
                <div className="row d-flex align-items-center">
                  <FaTwitch size={50} color="#198754" className="col-3" />
                  <div className="col-7">
                    <h4 className="card-title mbr-fonts-style mb-1 display-7">
                      <strong>Twitch</strong>
                    </h4>
                    <h5 className="card-text mbr-fonts-style display-7">
                      Very happy customer.
                    </h5>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="item col-12 col-md-6 col-lg-4 mb-4">
                <div className="row d-flex align-items-center">
                  <FaTwitter size={50} color="#198754" className="col-3" />
                  <div className="col-7">
                    <h4 className="card-title mbr-fonts-style mb-1 display-7">
                      <strong>Twitter</strong>
                    </h4>
                    <h5 className="card-text mbr-fonts-style display-7">
                      Very happy customer.
                    </h5>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="item col-12 col-md-6 col-lg-4 mb-4">
                <div className="row d-flex align-items-center">
                  <FaYoutube size={50} color="#198754" className="col-3" />
                  <div className="col-7">
                    <h4 className="card-title mbr-fonts-style mb-1 display-7">
                      <strong>Youtube</strong>
                    </h4>
                    <h5 className="card-text mbr-fonts-style display-7">
                      Very happy customer.
                    </h5>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="item col-12 col-md-6 col-lg-4 mb-4">
                <div className="row d-flex align-items-center">
                  <FaTiktok size={50} color="#198754" className="col-3" />
                  <div className="col-7">
                    <h4 className="card-title mbr-fonts-style mb-1 display-7">
                      <strong>Tiktok</strong>
                    </h4>
                    <h5 className="card-text mbr-fonts-style display-7">
                      Very happy customer.
                    </h5>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="item col-12 col-md-6 col-lg-4 mb-4">
                <div className="row d-flex align-items-center">
                  <FaFacebook size={50} color="#198754" className="col-3" />
                  <div className="col-7">
                    <h4 className="card-title mbr-fonts-style mb-1 display-7">
                      <strong>Facebook</strong>
                    </h4>
                    <h5 className="card-text mbr-fonts-style display-7">
                      Very happy customer.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="footer04-1t">
        <div className="container-fluid" style={{ backgroundColor: "#198754" }}>
          <div className=" text-center text-white">
            <div className="col-12">
              <p className=" mb-0 p-4 " style={{ fontSize: "25px" }}>
                © Copyright 2023 - Nguyễn văn Hoàng -- Phạm lê Thành
              </p>
            </div>
          </div>
        </div>
      </section>
      <input name="animation" type="hidden" />
    </div>
  );
}

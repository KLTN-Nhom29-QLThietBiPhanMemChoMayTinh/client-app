import React from "react";
import ComponentThongKe from "./ComponentThongKe";

export default function PageThongKe() {
  return (
    <div className="w-100  " style={{ height: "100vh", margin: "0px" }}>
      <div className="row h-100 bg-white rounded ">
        {/* btn Thong ke */}
        <div className="col-3  h-100 border-end">
          <div className="p-3 d-flex flex-column">
            <button type="button" className="btn btn-primary mt-2">
              Button
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Button
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Button
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Button
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Button
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Button
            </button>
            <button type="button" className="btn btn-outline-primary mt-2">
              Button
            </button>
          </div>
        </div>

        {/* Thong tin */}
        <div className="col-9  h-100">
          <div className="d-flex flex-column bd-highlight h-100">
            <div className="p-2 flex-shrink-1 bd-highlight">
              {/* top */}
              <div class="d-flex bd-highlight border rounded">
                {/* left */}
                <div
                  class="p-2 w-100 bd-highlight"
                  style={{ fontSize: "15px" }}
                >
                  <div className="col-3">
                    <label htmlFor="SelA" className="form-label">
                      City
                    </label>
                    <select className="form-select p-1 py-1" name="SelA" id="SelA">
                      <option selected>Select one</option>
                      <option value>New Delhi</option>
                      <option value>Istanbul</option>
                      <option value>Jakarta</option>
                    </select>
                  </div>
                </div>
                {/* right */}
                <div class="p-2 flex-shrink-1 bd-highlight ">
                  <button type="button" className="btn btn-primary ">
                    Xuất file
                  </button>
                </div>
              </div>
            </div>
            {/* body */}
            <div className="p-2 h-100 bd-highlight bg-danger ">
                <ComponentThongKe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

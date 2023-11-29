import React from 'react'
import ComponentThongKe from '../ComponentThongKe'

export default function ThongKeToaNha() {
  return (
    <>
      <div className="d-flex flex-column bd-highlight">
            <div className="p-2 flex-shrink-1 bd-highlight" >
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
            <div className="p-2 bd-highlight  ">
                <ComponentThongKe />
            </div>
          </div>
    </>
  )
}

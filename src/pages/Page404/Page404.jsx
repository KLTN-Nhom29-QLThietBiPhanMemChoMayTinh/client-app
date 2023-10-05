//rafcp
import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

const Page404 = props => {
  return (
    <>
      <h4 className="mt-5">Không tìm thấy!!! Quay lại <NavLink to="/detail-khu-vuc/1">trang chủ</NavLink>.</h4>
    </>
  )
}

Page404.propTypes = {

}

export default Page404

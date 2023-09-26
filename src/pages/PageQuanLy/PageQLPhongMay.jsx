import React from 'react'
import PropTypes from 'prop-types'
import NavTab from '../../components/common/NavTab/NavTab'

const PageQLPhongMay = props => {
  return (
    <div className='container'>
      <NavTab itemLink={
        {name:'Quản lý phòng máy', chucNang:'Danh sách'}
        } />
    </div>
  )
}

PageQLPhongMay.propTypes = {

}

export default PageQLPhongMay

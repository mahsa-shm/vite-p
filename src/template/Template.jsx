import React from 'react'

const Template = ({title,children,id}) => {
  return (
    <>
      <div className="container">
        <div className="header">
          <h3>{title}</h3>

          <div className="circles">
            <section></section>
            <section></section>
            <section></section>
          </div>
        </div>
        <div id={id} className="main-div">
            {children}
        </div>
      </div>
    </>
  )
}

export default Template
import React from 'react'

function PaginationComp({ totalPages, setPagination, pagination }) {
  const handleChange = (e) => {
    if(e.target.value!=0 || e.target.value!=totalPages.totalPages|| e.target.value!==""){
      setPagination(prev => ({ ...prev, page: e.target.value }))
    }
  }

  const handleClick = (str) => {
    if (str === "next") {
      setPagination(prev => ({ ...prev, page: Number(prev.page) + 1 }))
    } else if (str === "prev") {
      setPagination(prev => ({ ...prev, page: Number(prev.page) - 1 }))
    }else if (str === "last"){
      setPagination(prev => ({ ...prev, page: totalPages.totalPages}))
    }
  }

  const handleOptionChange = (e) => {
    setPagination(prev => ({ ...prev, limit: Number(e.target.value)}))
  }
  return (
    <div className="container-fluid">
      <nav aria-label="Page navigation example">
        <ul className="pagination paginationul">
          <li className="page-item"><button className="page-link border-0 btn btn-dark rounded-0" disabled={pagination.page === 1 || pagination.page === 0} onClick={() => handleClick("prev")}>Previous</button></li>
          <li className="page-item"><button className="page-link border-0 btn btn-dark rounded-0">{pagination.page}</button></li>
          <li className="page-item"><button className="page-link border-0 btn btn-dark rounded-0" disabled={pagination.page === totalPages.totalPages} onClick={() => handleClick("next")}>Next</button></li>
          <li className="page-item"><button className="page-link border-0 btn btn-dark rounded-0" disabled={pagination.page === totalPages.totalPages} onClick={() => handleClick("last")}>Last Page</button></li>

          <li className="page-item mt-1"><input type="number" placeholder="jump to page" value={pagination.page} onChange={handleChange} min="1" max={totalPages.totalPages} style={{ width: "80px", marginLeft: "20px" }} /></li>
          <li className="page-item">
            <select className="form-select mx-2" aria-label="No of places" onChange={handleOptionChange}>
              <option value="10">view 10 </option>
              <option value="20">view 20</option>
              <option value="30">view 30</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default React.memo(PaginationComp)
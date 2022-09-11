import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HeritageListContext } from '../context/heritageListContext'
import BackToTop from './BackToTop';
import PaginationComp from './PaginationComp';


function ListInfo() {
  const list = useContext(HeritageListContext);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [totalPages, setTotalPages] = useState({ totalPages: 0, skip: 0 });
  const [data, setData] = useState();
  useEffect(() => {
    setData(list.slice(totalPages.skip, totalPages.skip + pagination.limit));
    setTotalPages({ totalPages: Math.floor(list.length / pagination.limit), skip: (pagination.page - 1) * pagination.limit })
  }, [list, pagination.limit, pagination.page, totalPages.skip]);
 
  return (
    <div>
      <div className="row">
        {data && (
          data.map(item => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={item.id}>
              <div className="card mb-4 bg-dark text-white">
                <img src={item?.mainImg} className="card-img-top" alt="location-img" width="400px" height="200px" />
                <div className="card-body">
                  <h5 className="card-title">{item?.descTitleTxt}</h5>
                  <p className="card-text">{`Location: ${item?.locationArr[0]}`} <img className="img-fluid" src={`https://whc.unesco.org${item.locationArr[1]}`} alt="" width="50px" height="20px" /></p>
                  <Link to={`/${item?.id}`}><button className="btn btn-light text-dark">View Details</button></Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
        <PaginationComp totalPages={totalPages} pagination={pagination} setPagination={setPagination} />
        <BackToTop />
    </div>
  )
}

export default ListInfo
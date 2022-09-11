import React from 'react'

function BackToTop() {
      
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
   
    return (
        <div>
            <button onClick={scrollToTop} className="btn btn-primary" style={{marginBottom:"10px"}} >
                Back to Top
            </button>
        </div>
    )
}

export default BackToTop
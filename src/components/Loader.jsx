import React from 'react'

function Loader({ loaderTittle, message }) {
    return (
        <>
            <div className="container mt-5" style={{ height: "100vh" }}>
                {/* <div className="row justify-content-center h-100 align-items-center"> </div>*/}
                    {/* <div className="spinner-border text-primary " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> */}
                <div className='h-100 mt-5'>
                <div class="d-flex justify-content-center">
                        <div class="spinner-border mt-5" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <div className="w-auto mt- ms-4 text-center">
                            {loaderTittle && <h2>{ loaderTittle }</h2>}
                            {message && <h4>{ message }</h4>}
                        </div>
                    </div>
                    </div>
                </div>
            
        </>
    )
}

export default Loader
  // <div className="container" style={{ height: "100vh" }}>
  //           <div className="row justify-content-center mt-5">
  //             <div class="spinner-border text-primary mt-3" role="status">          
  //               <span class="visually-hidden">Loading...</span>            
  //           </div>          
  //           <div className="d-flex justify-content-center ">              
  //             <div className="w-auto mt-4 ms-4 text-center">                
  //               <h2>Uploading....</h2>                
  //               <h4>Takes few seconds</h4>                
  //             </div>            
  //           </div> 
  //           </div>                             
  //       </div> 

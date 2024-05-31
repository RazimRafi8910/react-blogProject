import React from 'react'

function Loader({ loaderTittle, message }) {
    return (
        <>
            <div className="container" style={{ height: "100vh" }}>
                <div className="row justify-content-center h-75 align-items-center">
                    <div class="spinner-border text-primary align-items-center" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <div className="w-auto mt-4 ms-4 text-center">
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

import React from 'react'

function ImagePreview({imageUrl}) {
  return (
      <>
          <div className='container'>
              <p className='m-0 my-2'>Image Preview</p>
              <div>
              <img src={imageUrl} className='img-thumbnail'/>
              </div>
              <p className='text-danger'>Currently there is no option for image update ( under devoploment )</p>
          </div>
      </>
  )
}

export default ImagePreview
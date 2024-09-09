import React from 'react'
import './footer.css'
const Footerr = () => {
  return (
    <>
      <footer className='footer'>
            <div className="image_option">
                <img src="../../../src/pic/logo_big.png" alt="" />
                <span>Shoopi</span>
            </div>
            <div >
                <ul className="elements">
                    <li className="element"> Company</li>
                    <li className="element">Carrer</li>
                    <li className='element'>Offices</li>
                    <li className="element">About Us</li>
                 </ul>
            </div>
            <div className="social-media-image">
                <img src="../../../src/pic/instagram_icon.png" alt="" />
                <img src="../../../src/pic/pintester_icon.png" alt="" />
                <img src="../../../src/pic/whatsapp_icon.png" alt="" />
            </div>
            <div className="copy">

            </div>
      </footer>
    </>
  )
}

export default Footerr

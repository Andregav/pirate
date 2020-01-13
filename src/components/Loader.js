import React from 'react';
import logo from './../media/fred.png';

class Loader extends React.Component {
    render() {
        return (
            <div>
             <section>
               <div className="loader">
                  <img src={logo} className="loader__logo" alt="logo" />
                  <p className="loader__text-upper">YO HO HO HO<br/>PIRATE!</p>
                  <p className="loader__text-ower">WELCOME ABOARD!!!</p>
                  
               </div>
             </section>
           </div>
        );
    }
}

export default Loader;
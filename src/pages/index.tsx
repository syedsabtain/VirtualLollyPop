import React from 'react'
import {Link} from 'gatsby'
import Lolly from '../components/Lolly'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default()=>{
  
    return(

        <div className='container mt-5 text-center mb-5'>
            <Header></Header>
            <div className='index-title'>Welcome to Virtual LollyPop</div>
            <div className='col-md-6 mb-5 mx-auto'>
                <h3 className='sugar'>because we all know someone
                    who deserves some sugar.</h3>
            </div>
            <div className="row d-flex justify-content-center text-center">
                <div className='col-md-12 mx-auto mt-5'>
                    <div className='col-md-12 mx-auto'>

                        <span className='lollysize'>
                            <Lolly top={"#70cbdb"} middle={"#43d6c5"} bottom={"#deaa43"}></Lolly>
                        </span>
                        <Lolly top={"#db7070"} middle={"#d66843"} bottom={"#df7d49"}></Lolly>
                        <Lolly top={"#70dbb2"} middle={"#43d68a"} bottom={"#49dfdc"}></Lolly>
                        <Lolly  top={"#dbd470"}  middle={"#d6cc43"} bottom={"#db7070"}></Lolly>
                    </div>

                </div>

            </div>
            <div className='row d-flex justify-content-center mt-5 mb-5'>
                <div className='col-md-8 mt-5 mb-5'>
                    <Link to='CreateLolly' className='btn btn-outline-danger btndesign'>Make A New Lolly To Send A
                    Friend</Link>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
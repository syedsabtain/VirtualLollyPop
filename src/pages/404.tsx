import { Link } from 'gatsby'
import React from 'react'
import Footer from '../components/Footer'

export default()=>{

    return(
        <div className='container text-center mt-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-6 mt-5'>
                    <h1 className='text-white index-title'>404 Page Not Found</h1>
                    <Link className='btn btn-outline-danger btndesign mt-5' to='/'>Go Back To Home</Link>
                </div>
            </div>
            <div className='fixed-bottom'>
            <Footer></Footer>
            </div>
        </div>
    )

}
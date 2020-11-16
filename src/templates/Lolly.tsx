import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Lolly from '../components/Lolly'
import {Link} from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default({pageContext})=>{

    interface Lollydata{
        bottomcolor:string,
        from: string,
        link: string,
        message: string,
        middlecolor: string,
        to: string,
        topcolor: string,
    }
    
    let[values,setValues] = useState<Lollydata>()

    useEffect(()=>{
            if(pageContext){
                setValues(pageContext?.data?.data)
            }
    },[])
   
    return(
       <>
       {pageContext ? (
            <div className='container mt-5 mb-5'>
                <Header></Header>
                <div className='row d-flex justify-content-center mt-4'>
                    <div className='col-md-4 mt-5 d-flex justify-content-center mb-5'>
                        <span>
                            <Lolly top={values?.topcolor} middle={values?.middlecolor} bottom={values?.bottomcolor}></Lolly>

                        </span>
                    </div>

                    <div className='col-md-4 mt-5 divtag'>
                        <div>
                            <h5>Your lolly is freezing.<br></br> Share it with this link</h5>
                            <h6>https://virtuallolly-syedsabtain.netlify.app/VirtualLolly/{values?.link}</h6>

                            <div className=' mt-5 mb-5'>
                                <h3 className='mb-4'>{values?.to}</h3>
                                <h5>{values?.message}</h5>
                                <h3 className='mt-4'>-----{values?.from}</h3>
                            </div>



                            <h6>{values?.from} made this virtual lollipop for you. You can
                                <Link to='/CreateLolly'> make your own</Link> to send to a friend who deserve some sugary
                                treat which won't rot their teeth...</h6>

                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
       ) : (
        <div className='container text-center mt-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-md-4 mt-5'>
                    <div className="spinner-border text-danger mt-5 spinnerdesign " role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
       )}
       </>
    )
}



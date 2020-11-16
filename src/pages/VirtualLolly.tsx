import React,{useEffect} from 'react'
import {Router} from '@reach/router'
import Lolly from '../templates/Lolly'
import {gql,useQuery} from '@apollo/client'
import { useState } from 'react'



export default()=>{
    interface Lollydataa{
        data:[{
            data:{
                bottomcolor:string,
                from: string,
                link: string,
                message:string,
                middlecolor: string,
                to: string,
                topcolor: string,
            },
            ref:{}
        }]

    }
    const ALL_DATA = gql`

    {
        Data{
          allData
        }
      }`
      let[lollydata,setLollydata]= useState<Lollydataa>()
    const {loading,data,error} = useQuery(ALL_DATA)

      useEffect(()=>{
        if(loading){

        }else{

            const value =   JSON.parse(data?.Data[0]?.allData)
        
            setLollydata(value)
        }
    },[loading,data])
    
    return(
      <>
            {loading ? (
                <div className='container text-center mt-5'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-md-4 mt-5'>
                            <div className="spinner-border text-danger mt-5 spinnerdesign" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Router basepath='/VirtualLolly' >
                    {lollydata?.data.map((value,key)=>{
                       
                        return( <Lolly key={key} pageContext={{data:value}} path={`/${value?.data?.link}`}></Lolly>)

                    })}
                </Router>
           )}
        </>
    )
}
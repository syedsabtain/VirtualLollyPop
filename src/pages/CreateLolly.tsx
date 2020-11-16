import React, { useState } from 'react'
import Lolly from '../components/Lolly'
import {useForm} from 'react-hook-form'
import {gql, useMutation} from '@apollo/client'
import shortid  from 'shortid'
import {navigate} from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'




export default()=>{
    const ALL_DATA = gql`

{
    Data{
      allData
    }
  }

`
const ADD_LOLLY= gql`
mutation addLolly($topcolor:String!,$bottomcolor:String!,$middlecolor:String!,$to:String!,$from:String!,$message:String!,$link:String!){
    addLolly(input:{
      topcolor:$topcolor,
      bottomcolor:$bottomcolor,
      middlecolor:$middlecolor,
      to:$to,
      from:$from,
      message:$message,
      link:$link
    }){
      allData
    }
  }
`

    const {register,errors,handleSubmit,reset} = useForm()
    const [addLolly]  = useMutation(ADD_LOLLY)
    let[lollycolor,setLollycolor] = useState({
        top:'#d52358',
        middle:'#e95946',
        bottom:'#deaa43'
    })
    const handlecolorChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      let {name,value} = e.target;

      setLollycolor(prevstate=>({
          ...prevstate,
          [name]:value
      }))


    }
    
    const HandleSubmit=(data)=>{

        let linkk = shortid.generate()
        addLolly({
            variables:{
                    topcolor:lollycolor.top,
                    bottomcolor:lollycolor.bottom,
                    middlecolor:lollycolor.middle,
                    to:data.to,
                    from:data.from,
                    message:data.body,
                    link:linkk
                   
            },
            refetchQueries:[{query:ALL_DATA}],
        })
      navigate(`/VirtualLolly/${linkk}`)


        
        reset()
    }
   

    return(
        <div className='container mt-5'>
          <Header></Header>
          <div className='row d-flex justify-content-center mt-4'>
            <div className='col-md-6 mt-5 d-flex justify-content-center'>
              <span>
                <Lolly top={lollycolor.top} middle={lollycolor.middle} bottom={lollycolor.bottom}></Lolly>
              </span><span>
                <div className='mt-5  '> <input className='colortag ' type="color" value={lollycolor.top} name="top"
                    id="" onChange={handlecolorChange} /></div>
                <br />
                <div className='mt-5'> <input className='colortag' type="color" value={lollycolor.middle} name="middle"
                    onChange={handlecolorChange} /></div>
                <br />
                <div className='mt-5'> <input className='colortag' type="color" value={lollycolor.bottom} name="bottom"
                    onChange={handlecolorChange} /></div>
              </span>
            </div>

            <div className='col-md-6 mt-5 divtag shadow-lg'>
              <form onSubmit={handleSubmit(HandleSubmit)}>
                <div className="form-group">
                  <label htmlFor="totag" className='inputtag'>To</label>
                  <input type="text" className="form-control" id="totag" placeholder="A Lolly For..." name='to'
                    ref={register({required:true})} />
                  {errors.to && errors.to.type ==='required' && (
                  <h6 className='mt-3'> *This Field is Required</h6>
                  )}
                </div>


                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1 " className='inputtag'>Say Somthing Nice</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""}
                    name='body' ref={register({required:true})} />
                  {errors.body && errors.body.type ==='required' && (
                                  <h6 className='mt-3'> *This Field is Required</h6>
                              )}
                            </div>
                            <div className="form-group">
                            <label htmlFor="fromtag" className='inputtag'>From</label>
                            <input type="text" className="form-control" name='from' id="fromtag"
                             placeholder="From Your Friend"    ref={register({required:true})}/>
                             {errors.from && errors.from.type ==='required' && (
                                  <h6 className='mt-3 mb-5'> *This Field is Required</h6>
                              )}
                        </div>
                        <button className='btn btn-outline-danger btndesign'>Freeze it and Get a Link</button>
                        
                     </form>
                     </div>
                     <div className='mt-5'><Footer></Footer></div>
            </div>
            
        </div>
    )
}
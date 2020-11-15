import React, { ChangeEvent, useEffect, useState } from 'react'
import Lolly from '../components/Lolly'
import {useForm} from 'react-hook-form'
import {useQuery,gql, useMutation} from '@apollo/client'
import shortid  from 'shortid'

const ALL_DATA = gql`

{
    Data{
      allData
    }
  }

`
const ADD_LOLLY= gql`
mutation addLolly($topcolor:String!,$bottomcolor:String!,$middlecolor:String!,$to:String!,$from:String!
    ,$message:String!,$link:String!){
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


export default()=>{

    const {register,errors,handleSubmit,reset} = useForm()
    const {loading,data,error} = useQuery(ALL_DATA)
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
    const handleshow =()=>{
        console.log(lollycolor,'greate')
    }
    const HandleSubmit=(data)=>{


        addLolly({
            variables:{
                    topcolor:lollycolor.top,
                    bottomcolor:lollycolor.bottom,
                    middlecolor:lollycolor.middle,
                    to:data[0],
                    from:data[2],
                    message:data[1],
                    link:
            }
        })
        console.log(data,'submit')
        reset()
    }
    useEffect(()=>{
        if(loading){

        }else{

            const value =   JSON.parse(data?.Data[0]?.allData)
            // console.log(data?.Data[0]?.allData)
            console.log(value,'fa')
        }
    },[])

    return(
        <div className='container mt-5'>
            <div className='row d-flex justify-content-center mt-4'>
                <div className='col-md-4 mt-5 d-flex justify-content-center'>
                    <span><Lolly top={lollycolor.top} middle={lollycolor.middle} bottom={lollycolor.bottom}></Lolly>
             </span><span>
                 <button className='btn btn-outline-danger' onClick={handleshow}>Show</button>
                <div className='mt-5'> <input className='colortag' type="color" value={lollycolor.top} name="top" id="" onChange={handlecolorChange}/></div>
                 <br/>
                 <div className='mt-5'> <input className='colortag'   type="color" value={lollycolor.middle} name="middle"  onChange={handlecolorChange}/></div>
                 <br/>
                 <div className='mt-5'> <input className='colortag'  type="color"  value={lollycolor.bottom} name="bottom" onChange={handlecolorChange}/></div>
             </span>
                </div>
             
                <div className='col-md-4 mt-5'>
                    <form onSubmit={handleSubmit(HandleSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">To</label>
                            <input type="text" className="form-control" id=""
                              placeholder="A Lolly For..." name='to' ref={register({required:true})} />
                        </div>
                        
                        
                        <div className="form-group">
                            <label htmlFor="exampleFormControlTextarea1">Say Somthing Nice</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3}
                                defaultValue={""} name='body' ref={register({required:true})}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">From</label>
                            <input type="text" className="form-control" name='from' id=""
                             placeholder="From Your Friend"    ref={register({required:true})}/>
                        </div>
                        <button className='btn btn-outline-danger'>Get Link</button>
                        
                     </form>
                     </div>
            </div>
        </div>
    )
}
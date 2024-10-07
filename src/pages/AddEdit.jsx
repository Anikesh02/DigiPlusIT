import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../firebase'
import { toast } from 'react-toastify';


const initialState = {
    simNumber: "",
    activationDate: "",
    contact: "",
    status: ""
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data,setData] = useState({});
  const {simNumber, activationDate, contact, status} = state;

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(()=>{
    fireDb.child("clients").on("value", (snapshot) => {
      if(snapshot.val()!==null){
        setData({...snapshot.val()});
      } else{
        setData({});
      }
    })

    return () => {
      setData({});
    }
  }, [id])

  useEffect(()=>{
    if(id){
      setState ({...data[id]})
    } else{
      setState({...initialState})
    }

    return () => {
      setState({...initialState})
    }
  }, [id, data])

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    if(name> 12){
      toast.error("Card Number must be of 12 Digits")
    }
    setState({...state, [name]: value})
  };
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!simNumber || !activationDate || !contact || !status){
      toast.error("Please fill all the details in input field")
    } else{
      if(!id){
        fireDb.child("clients").push(state, (err)=>{
          if(err){
            toast.error(err);
          }else{
            toast.success("Sim Card Added Successfully");
          }
        })
      }else {
        fireDb.child(`clients/${id}`).set(state, (err)=>{
          if(err){
            toast.error(err);
          }else{
            toast.success("Sim Card Updated Successfully");
          }
        })
      }
      
      setTimeout(()=>navigate("/"), 500);
    }
  };

  return (
    <div style={{marginTop: "100px"}}>
      <form style={{margin:"auto", padding:"15px", maxWidth:"400px", alignContent:"center"}} onSubmit={handleSubmit}>
        <label htmlFor="handleInputChangeForSimData">Sim Card Number</label>
        <input type="number" id='simNumber' name='simNumber' placeholder='Your Sim Card Number..' value={simNumber || ""} onChange={handleInputChange} />

        <label htmlFor="activationDate">Activation Date</label>
        <input type="date" id='activationDate' name='activationDate' placeholder='Your Sim Activation Date...' value={activationDate || ""} onChange={handleInputChange} />

        <label htmlFor="contact">Contact</label>
        <input type="number" id='contact' name='contact' placeholder='Your Contact No. ...' value={contact || ""} onChange={handleInputChange} />

        <label htmlFor="name">Status</label>
        <input type="text" id='status' name='status' placeholder='Your Status...' value={status || ""} onChange={handleInputChange} />

        <input type="submit" value={id ? "Update" : "Activate Sim"}/>
      </form>
       
    </div>
  )
}

export default AddEdit
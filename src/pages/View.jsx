import React,{useState,useEffect} from 'react'
import fireDb from '../firebase';
import { useParams,Link } from 'react-router-dom';
import './View.css'

const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    fireDb.child(`clients/${id}`).get().then((snapshot)=>{
        if(snapshot.exists()){
          setUser({...snapshot.val()})
        } else{
          setUser({});
        }
    })

  }, [id])

  console.log("user", user);
  return (
    <div style={{marginTop: "150px"}}>
        <div className="card">
          <div className="card-header">
            <p>User Contact Detail</p>
          </div>
          <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Sim Number: </strong>
            <span>{user.simNumber}</span>
            <br />
            <br />
            <strong>Activation Date: </strong>
            <span>{user.activationDate}</span>
            <br />
            <br />
            <strong>Contact: </strong>
            <span>{user.contact}</span>
            <br />
            <br />
            <Link to={"/"}>
              <button className='btn btn-edit'>Go Back</button>
            </Link>
          </div>
        </div>
        
    </div>
  )
}

export default View
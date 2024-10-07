import React, { useState, useEffect } from 'react';
import fireDb from '../firebase';
import { Link } from 'react-router-dom';
import './Home.css';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child("clients").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    })

    return () => {
      setData({});
    }
  }, [])

  const onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact ?")) {
      fireDb.child(`clients/${id}`).remove((err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.success("Contact Deleted Successfully");
        }
      })
    }
  }

  const handleChange = (e) => {
    setSort(true);
    fireDb.child("clients").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
      let sortedData = [];
      snapshot.forEach((snap) => {
        sortedData.push(snap.val())
      })
      setSortedData(sortedData);
    })
  };
  const handleReset = () => {
    setSort(false);
    fireDb.child("clients").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    })
   };

  const filterData = (value) => {
    fireDb.child("clients").orderByChild("status").equalTo(value).on("value", (snapshot)=>{
      if(snapshot.val()){
        const data = snapshot.val();
        setData(data);
      }
    })
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <label>Sort By:</label>
      <select name="colValue" className="dropdown" onChange={handleChange}>
        <option>Please Select</option>
        <option value="simNumber">Sim Card Number</option>
        <option value="contact">Contact</option>
        <option value="status">Status</option>
        <option value="activationDate">activationDate</option>
      </select>
      <button className='btn btn-reset' onClick={handleReset}>Reset</button>
      <br />
      <label>Status: </label>
      <button className='btn btn-active' onClick={() => filterData("Active")}>Active</button>
      <button className='btn btn-inactive' onClick={() => filterData("Inactive")}>Inactive</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Sim Number</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Activation Date</th>
            {!sort && (<th style={{ textAlign: "center" }}>Action</th>)}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{data[id].simNumber}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].status}</td>
                  <td>{data[id].activationDate}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button className="btn btn-delete" onClick={() => onDelete(id)}>Deactivate</button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
  {sort && (
    <tbody>
      {sortedData.map((item, index) => {
        return (
          <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td>{item.simNumber}</td>
          <td>{item.contact}</td>
          <td>{item.status}</td>
          <td>{item.activationDate}</td>
          </tr>
        )
      })}
      
    </tbody>
  )}
      </table>
      {/* <label>Sort By:</label>
      <select name="colValue" className="dropdown" onChange={handleChange}>
        <option>Please Select</option>
        <option value="simNumber">Sim Card Number</option>
        <option value="contact">Contact</option>
        <option value="status">Status</option>
        <option value="activationDate">activationDate</option>
      </select>
      <button className='btn btn-reset' onClick={handleReset}>Reset</button>
      <br />
      <label>Status: </label>
      <button className='btn btn-active' onClick={() => filterData("Active")}>Active</button>
      <button className='btn btn-inactive' onClick={() => filterData("Inactive")}>Inactive</button> */}
    </div>
  )
}

export default Home
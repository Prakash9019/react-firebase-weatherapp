// ActiveUsers.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { db, auth, storage } from "./config/firebase";
import "react-datepicker/dist/react-datepicker.css";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function ActiveUsers() {
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDelete=async (user)=>{
    const movieDoc = doc(db, "Users", user.id);
     await updateDoc(movieDoc, { status : false });
     window.location.reload();
  }
  const handleAdd=async (user)=>{
    const movieDoc = doc(db, "Users", user.id);
    await updateDoc(movieDoc, { status : true });
    window.location.reload();
  }

  useEffect(() => {
        
  const fetchData = async () => {
    const info = collection(db, "Users");
    console.log(info);
    try {
      const data = await getDocs(info);
      console.log(data);
      const filteredData = data.docs.map((doc) => {
        const Dats={
        ...doc.data(),id: doc.id,
      }
      Dats.addeddate=new Date(Dats.date);
      return Dats;
    });
    // console.log("hellllooooooo")
      console.log(filteredData);
      setActiveUsers(filteredData);
    } catch (err) {
      console.error(err);
    }
     }

    fetchData();
  }, []);

  
  useEffect(() => {
    console.log(selectedDate);
        console.log("function is caledddddddddddd.....")
    const fetchData = async () => {
      const info = collection(db, "Users");
    //  console.log(info);
      try {
    
        const data = await getDocs(info);
      //  console.log(data);
        const filteredData = data.docs.map((doc) => {
          const Dats={
          ...doc.data(),id: doc.id,
        }
        Dats.addeddate=new Date(Dats.date);
      //  console.log(Dats.addeddate);
        return Dats;
      });
     
      if (selectedDate) {
         console.log("hellllooooooo");
        const newDate= filteredData.map(data =>{
          if(data.addeddate.toDateString() == selectedDate.toDateString()){
            return data;
          }
        })
        
        console.log(newDate);
          setActiveUsers(newDate);
      }

        if (sortByDate) {
          // console.log()
          filteredData.sort((a, b) => a.addeddate - b.addeddate);
          console.log("the sorted data ");
          console.log(filteredData);
          setActiveUsers(filteredData);
        }
       
      } catch (err) {
        console.error(err);
      }
       }
  
      fetchData();
    }, [sortByDate, selectedDate]);

  return (
    <div className='acontainer'>
       <div>
        <label htmlFor="sortOption">Sort By Date:</label>
        <select id="sortOption" value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
          <option value={false}>None</option>
          <option value={true}>Sort By Date</option>
        </select>
      </div>
      <div>
        <label htmlFor="datePicker">Filter By Date:</label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>
      <h1 style={{textAlign:'center'}}>Active Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Added Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeUsers.map(user => (
            //  {if(user){
              user && (
              <tr key={user.id}>
              <td>{user.Username}</td>
              <td>{user.date}</td>
              <td><input
             type="checkbox"
             checked={user.status} /></td>
              <td style={ {display: "flex", justifyItems: "space-evenly"}}>
                <button className="hello" onClick={() => handleDelete(user)}>Delete</button>
                <button className="hello" onClick={() => handleAdd(user)}>Add</button>
              </td>
            </tr>)
            //  }}
     ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveUsers;

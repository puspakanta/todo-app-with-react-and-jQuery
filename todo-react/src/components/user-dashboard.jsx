import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies('userid');
    let navigate = useNavigate();

    const [appointments, setAppointments] = useState([{Id:0, Title:'', Description:'', Date:Date(), UserId:''}]);

    const [editAppointment, setEditAppointment] = useState([{Id:0, Title:'', Date:Date(),Description:'', UserId:''}]);

    const formik = useFormik({
        initialValues: {
            Id: 0,
            Title: '',
            Description:'',
            Date:'',
            UserId: cookies['userid']
         },
         onSubmit: appointment => {
             axios.post('http://127.0.0.1:3300/add-task', appointment)
             .then(()=>{
                alert('Task Added Successfully..');
                window.location.reload();
             })
         }
    })

    const editFormik = useFormik({
        initialValues : {
             id: editAppointment[0].Id,
             Title: editAppointment[0].Title,
             Description: editAppointment[0].Description,
             Date: '',
             UserId: editAppointment[0].UserId
        },
        onSubmit : (appointment)=> {
            axios.put(`http://127.0.0.1:3300/edit-task/${appointment.id}`,appointment)
            .then(()=>{
                alert('Updated Successfully..');
                window.location.reload();
            })
            
        },
        enableReinitialize : true
    });
    
   

    function LoadAppointments(){
         axios.get(`http://127.0.0.1:3300/get-appointments/${cookies['userid']}`)
         .then(response=>{
             setAppointments(response.data);
         })
    }

    useEffect(()=>{
        LoadAppointments();
    },[]);

    function handleSingout(){
        removeCookie('userid');
        navigate('/');
    }

    function handleRemoveClick(id){
        axios.delete(`http://127.0.0.1:3300/remove-task/${id}`)
        .then(()=>{
            alert('Task Removed');
        });
        window.location.reload();
    }

    function handleEditClick(id){
        axios.get(`http://127.0.0.1:3300/appointments/${id}`)
        .then(response=>{
           
            setEditAppointment(response.data);
            
        })
    }

    return(
        <div className="row pt-4">
            <div className="col-7">
                <button data-bs-target="#AddTask" data-bs-toggle="modal" style={{marginLeft:'250px', marginTop:'300px'}} className="bi bi-calendar btn btn-warning"> Add Appointment </button>
                <div className="modal fade" id="AddTask">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={formik.handleSubmit}>
                            <div className="modal-header">
                                <h2>Add New Appointment</h2>
                                <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                               
                                <dl>
                                    <dt>Appointment Id</dt>
                                    <dd><input type="number" className="form-control" name="Id" onChange={formik.handleChange} /></dd>
                                    <dt>Title</dt>
                                    <dd><input type="text" name="Title"  onChange={formik.handleChange} className="form-control" /></dd>
                                    <dt>Description</dt>
                                    <dd>
                                        <textarea className="form-control" name="Description"  onChange={formik.handleChange} rows="4" cols="40"></textarea>
                                    </dd>
                                    <dt>Date</dt>
                                    <dd>
                                        <input type="date" className="form-control" name="Date"  onChange={formik.handleChange} />
                                    </dd>
                                </dl>
                            </div>
                            <div className="modal-footer">
                                <button data-bs-dismiss="modal" className="bi bi-calendar-date btn btn-info"> Add Task </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-5">
                <h3> {cookies['userid']} - Dashboard  <button onClick={handleSingout} className="btn btn-danger">Signout</button> </h3>
                <div className="mt-4">
                    {       
                        appointments.map(appointment=>
                            <div key={appointment.Id} className="alert alert-success alert-dismissible">
                                <button onClick={()=> {handleRemoveClick(appointment.Id)}} data-bs-dismiss="alert" className="btn btn-close"></button>
                                <h2 className="alert-title">{appointment.Title}</h2>
                                <p className="alert-text">{appointment.Description}</p>
                                <p>
                                    {appointment.Date}
                                </p>
                                <button onClick={()=> {handleEditClick(appointment.Id)}} data-bs-target="#EditTask" data-bs-toggle="modal" className="btn btn-warning bi bi-pen-fill"> Edit Task </button>
                                <div className="modal fade" id="EditTask">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <form onSubmit={editFormik.handleSubmit}>
                                                <div className="modal-header">
                                                    <h2>Edit Task</h2>
                                                    <button type="button" className="btn btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <dl>
                                                        <dt>Appointment</dt>
                                                        <dd><input type="number" onChange={editFormik.handleChange} name="id" value={editFormik.values.id} /></dd>
                                                        <dt>Title</dt>
                                                        <dd><input type="text" onChange={editFormik.handleChange} name="Title" value={editFormik.values.Title} /></dd>
                                                        <dt>Description</dt>
                                                        <dd>
                                                            <textarea onChange={editFormik.handleChange} name="Description" value={editFormik.values.Description}>  </textarea>
                                                        </dd>
                                                    </dl>
                                                    <button type="submit" className="bi bi-floppy-fill btn btn-success"> Save </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
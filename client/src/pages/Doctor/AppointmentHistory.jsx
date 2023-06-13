// import React, {useEffect, useState} from 'react';
// import {hideLoading, showLoading} from '../../redux/alertSlice';
// import axios from 'axios';
// import {Table} from 'antd';
// import moment from 'moment';
// import toast from 'react-hot-toast';
// import Main from '../../layouts/Main';
// import {useDispatch, useSelector} from 'react-redux';
// import {useNavigate, useParams} from 'react-router-dom';
// import {
//   Avatar,
//   Button,
//   Card,
//   Col,
//   Descriptions,
//   Row,
//   Space,
//   Typography,
// } from 'antd';

// import {NavLink} from 'react-router-dom';

// function DoctorHistoryAppointments () {
//   const [appointments, setAppointments] = useState ([]);
//   const [pending, setPending] = useState ([]);
//   const dispatch = useDispatch ();
//   const {user} = useSelector (state => state.user);
//   const [doctor, setDoctor] = useState (null);
//   const idVal = '6332d5898231d41a72504a14';

//   //   const getDoctorData = async () => {
//   //   try {
//   //     dispatch (showLoading ());
//   //     const response = await axios.post (
//   //       '/api/doctor/get-doctor-info-by-user-id',
//   //       {
//   //         userId: user._id,
//   //       },

//   //     );
//   //     // dispatch (hideLoading ());

//   //     if (response.data.success) {
//   //       setDoctor(response.data.data);
//   //     }
//   //   } catch (error) {
//   //     console.log (error);
//   //   }
//   // };

<<<<<<< HEAD
//   const getAppointmentsData = async () => {
//     try {
//       dispatch (showLoading ());
//       const response = await axios.post (
//         '/api/doctor/get-doctor-info-by-user-id',
//         {
//           userId: user._id,
//         }
//       );
//       // dispatch (hideLoading ());
=======
  const getAppointmentsData = async () => {
    try {
      dispatch (showLoading ());
      const response = await axios.post (
        'https://fuentes-clinic.onrender.com/api/doctor/get-doctor-info-by-user-id',
        {
          userId: user._id,
        }
      );
      // dispatch (hideLoading ());
>>>>>>> johno/Reco(charts,-create-acc,-at-ID-sa-heading-nalang)

//       if (response.data.success) {
//         setDoctor (response.data.data);
//         try {
//           dispatch (showLoading ());

<<<<<<< HEAD
//           const response1 = await axios.post (
//             '/api/doctor/get-history-appointments-by-doctor-id',
//             {
//               doctorId: response.data.data._id,
//             }
//           );
//           dispatch (hideLoading ());
//           if (response1.data.success) {
//             setAppointments (response1.data.data);
//           }
//         } catch (error) {
//           dispatch (hideLoading ());
//         }
//       }
//     } catch (error) {
//       console.log (error);
//     }
//   };
=======
          const response1 = await axios.post (
            'https://fuentes-clinic.onrender.com/api/doctor/get-history-appointments-by-doctor-id',
            {
              doctorId: response.data.data._id,
            }
          );
          dispatch (hideLoading ());
          if (response1.data.success) {
            setAppointments (response1.data.data);
          }
        } catch (error) {
          dispatch (hideLoading ());
        }
      }
    } catch (error) {
      console.log (error);
    }
  };
>>>>>>> johno/Reco(charts,-create-acc,-at-ID-sa-heading-nalang)

//   useEffect (() => {
//     // getDoctorData();
//     getAppointmentsData ();
//   }, []);

<<<<<<< HEAD
//   const changeAppointmentStatus = async (record, status) => {
//     try {
//       dispatch (showLoading ());
//       const response = await axios.post (
//         '/api/doctor/change-appointment-status',
//         {appointmentId: record._id, status: status},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem ('token')}`,
//           },
//         }
//       );
//       dispatch (hideLoading ());
//       if (response.data.success) {
//         toast.success (response.data.message);
//         getAppointmentsData ();
//       }
//     } catch (error) {
//       toast.error ('Error changing doctor status');
//       dispatch (hideLoading ());
//     }
//   };
=======
  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch (showLoading ());
      const response = await axios.post (
        'https://fuentes-clinic.onrender.com/api/doctor/change-appointment-status',
        {appointmentId: record._id, status: status},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem ('token')}`,
          },
        }
      );
      dispatch (hideLoading ());
      if (response.data.success) {
        toast.success (response.data.message);
        getAppointmentsData ();
      }
    } catch (error) {
      toast.error ('Error changing doctor status');
      dispatch (hideLoading ());
    }
  };
>>>>>>> johno/Reco(charts,-create-acc,-at-ID-sa-heading-nalang)

//   const columns = [
//     {
//       title: 'Date & Time',
//       dataIndex: 'createdAt',
//       render: (text, record) => (
//         <span>
//           {moment (record.date).format ('DD/MM/YYYY')} {' : ' + record.time}
//         </span>
//       ),
//     },
//     {
//       title: 'Patient',
//       dataIndex: 'name',
//       //req.body.userInfo.name
//       render: (text, record) => <span>{record.userInfo.name}</span>,
//     },
//     {
//       title: 'Phone',
//       dataIndex: 'phone',
//       render: (text, record) => <span>{record.userInfo.phone}</span>,
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       render: (text, record) => (
//         <div>
//           {record.status === 'approved' &&
//             <span>
//               Accepted
//             </span>}
//           {record.status === 'pending' &&
//             <span>
//               Pending
//             </span>}
//           {record.status === 'completed' &&
//             <span>
//               Completed
//             </span>}
//           {record.status === 'rejected' &&
//             <span>
//               Cancelled
//             </span>}
//           {record.status === 'absent' &&
//             <span>
//               Absent
//             </span>}
//         </div>
//       ),
//     },

//     {
//       title: 'Actions',
//       dataIndex: 'actions',
//       width: 100,
//       render: (text, record) => (
//         <div className="ant-employed">
//           {record.status === 'approved' &&
//             <div className="action-item">
//               <NavLink to={`/doctor/appointments/${record._id}`}>
//                 <a>Edit</a>
//               </NavLink>
//             </div>}

//           {record.status === 'completed' &&
//             <div className="action-item">
//               <NavLink to={`/doctor/appointments/${record._id}`}>
//                 <button className="link-button">View</button>
//               </NavLink>
//             </div>}
//           {record.status === 'pending' &&
//             <div className="action-item">
//               <NavLink to={`/doctor/appointments/${record._id}`}>
//                 <button className="link-button">View</button>
//               </NavLink>
//               <button
//                 className="link-button px-2"
//                 onClick={() => changeAppointmentStatus (record, 'approved')}
//               >
//                 Accept
//               </button>
//               <button
//                 className="link-button"
//                 onClick={() => changeAppointmentStatus (record, 'rejected')}
//               >
//                 Cancel
//               </button>
//             </div>}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Main>
//       <h1 className="page-title">Appointment History</h1>
//       <hr />
//       <Table columns={columns} dataSource={appointments} />
//     </Main>
//   );
// }

// export default DoctorHistoryAppointments;

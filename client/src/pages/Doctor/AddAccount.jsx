import React from 'react';
import {Form, Row, Col} from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useDispatch, useSelector} from 'react-redux';
import {showLoading, hideLoading} from '../../redux/alertSlice';
import Main from '../../layouts/Main';

import {CreateAdminForm, CreateDoctorForm, DoctorForm} from '../../components';

function AddAccount () {
  const {user} = useSelector (state => state.user);
  const [doctor] = Form.useForm ();
  const [admin] = Form.useForm ();

  const dispatch = useDispatch ();

  const onAdminFinish = async values => {
    try {
      dispatch (showLoading ());
      const response = await axios.post ('https://fuentes-clinic.onrender.com/api/admin/register-admin', values);
      dispatch (hideLoading ());
      if (response.data.success) {
        toast.success (response.data.message);
        admin.resetFields ();
      } else {
        toast.error (response.data.message);
      }
    } catch (error) {
      dispatch (hideLoading ());
      toast.error ('Something went wrong:', error);
    }
  };

  const onDoctorFinish = async values => {
    try {
      dispatch (showLoading ());
      const response = await axios.post ('https://fuentes-clinic.onrender.com/api/admin/register-doctor', values);
      dispatch (hideLoading ());
      if (response.data.success) {
        toast.success (response.data.message);
        // Activate();
        doctor.resetFields ();
      } else {
        toast.error (response.data.message);
      }
    } catch (error) {
      dispatch (hideLoading ());
      toast.error ('Something went wrong:', error);
    }
  };

  // const onFinish = async (values) => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.post(
  //       "/api/user/apply-doctor-account",
  //       {
  //         ...values,
  //         userId: user._id,
  //         timings: [
  //           dayjs(values.timings[0]).format("HH:00"),
  //           dayjs(values.timings[1]).format("HH:00"),
  //         ],
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);

  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     toast.error("Something went wrong:", error);
  //   }
  // };

  return (
    <Main>
      <Row gutter={[24, 0]} justify="space-between" align="start">
        <Col
          // xs={{ span: 24, offset: 0 }}
          // lg={{ span: 7, offset: 0 }}
          md={{span: 12}}
          // xs="24" xl={24}
        >
          <CreateAdminForm form={admin} onFinish={onAdminFinish} />
        </Col>
        <Col
          // xs={{ span: 24, offset: 0 }}
          // lg={{ span: 7, offset: 0 }}
          md={{span: 12}}
        >
          <CreateDoctorForm form={doctor} onFinish={onDoctorFinish} />
          {/* <DoctorForm onFinish={onFinish} /> */}
        </Col>
      </Row>
    </Main>
  );
}

export default AddAccount;

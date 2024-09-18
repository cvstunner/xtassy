import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useState, useEffect } from 'react';
import PageNotFound from '../../pages/PageNotFound';

export default function Privileges({ privilege }) {
  const [status, setStatus] = useState(false);
  const [auth, setAuth] = useAuth();

  const isAdmin = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin`);
    if (res.data.status) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  }
  const isLowPrivileged = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin/2`);
    if (res.data.status) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  }

  const isMediumPrivileged = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin/1`);
    if (res.data.status) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  }

  const isHighPrivileged = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin/0`);
    if (res.data.status) {
      setStatus(true);
    }
    else {
      setStatus(false);
    }
  }

  useEffect(() => {
    if (auth?.token) {
      if (privilege === 0) {
        isHighPrivileged();
      }
      else if (privilege === 1) {
        isMediumPrivileged();
      }
      else if (privilege === 2) {
        isAdmin();
      }
    }
  }, [auth?.token]);

  return status ? <Outlet /> : <PageNotFound />;
}

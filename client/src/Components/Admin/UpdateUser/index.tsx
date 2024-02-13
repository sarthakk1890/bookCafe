import React, { Fragment, useEffect, useState } from "react";
import './style.scss'
import SideBar from "../Sidebar";
import { BsPersonFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { useGetUserDetailsAdminQuery } from "../../../redux/api/userAPI";
import { useParams } from "react-router-dom";
import Loader from "../../Layout/Loader";

const UpdateUser: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetUserDetailsAdminQuery(id || "");

  const user = data?.user;

  useEffect(() => {
    refetch();
  }, [refetch, id]);

  useEffect(() => {
    setName(user?.name || "");
    setRole(user?.role || "user");
  }, [user, data])

  const [name, setName] = useState<string>(user?.name || "");
  const [role, setRole] = useState<string>(user?.role || "user");

  const updateUserSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("role", role);
    // Dispatch your updateUser action
  };

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Fragment>
      <div className="updateUser dashboard">
        <SideBar />
        <main className="updateUserContainer">
          <form className="updateUserForm" onSubmit={updateUserSubmitHandler}>
            <h1>Update User</h1>

            <div>
              <BsPersonFill />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <MdVerified />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button id="updateUserBtn" type="submit">
              Update
            </button>

          </form>
        </main>
      </div>
    </Fragment>
  );
};

export default UpdateUser;

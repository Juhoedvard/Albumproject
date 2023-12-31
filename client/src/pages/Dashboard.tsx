import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, TextInput } from 'flowbite-react';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useForm, SubmitHandler} from "react-hook-form";
import type { NewPassword } from "./CredentialsPages/NewPasswordPage";
import { changePassword } from "../Features/user";
const Dashboard = () => {

    const {isAuthenticated, user, userLoading} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
      } = useForm<NewPassword>()

      const onSubmit: SubmitHandler<NewPassword> = (data) => {
        dispatch(changePassword({password: data.password, email:  user.email}))
        setShowPassword(!showPassword)
        navigate("/login")
    }
    if(!isAuthenticated && !userLoading && user === null){
        return <Navigate to="/login"/>
    }
    else {
        return(
            <div>
                {userLoading || user === null ? (
                        <LoadingSpinner loadingText="Loading dashboard..."/>
                ):
                (
                <main className="flex gap-4 min-h-screen pt-20 justify-center">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-2xl">Dashboard</h1>
                        </div>
                        <>
                        {!showPassword ?(
                            <>
                                <div className="flex justify-between gap-2 pt-4">
                                <dt>Fistname : </dt>
                                {!edit ? <dd> {user.first_name}</dd> :   <TextInput placeholder={user.first_name} id="small" sizing="sm" type="text"/>}
                                </div>
                                <div className="flex justify-between  border-t gap-2 pt-4">
                                <dt>Lastname : </dt>
                                {!edit ? <dd> {user.last_name}</dd> :   <TextInput placeholder={user.last_name} id="small" sizing="sm" type="text"/>}
                                </div>
                                <div className="flex justify-between border-t gap-2  pt-4">
                                <dt>Email : </dt>
                                {!edit ? <dd> {user.email}</dd> :   <TextInput placeholder={user.email} id="small" sizing="sm"  type="email"/>}
                                </div>
                                <div className="flex justify-between border-t  pt-4">

                                </div>
                                <div className="flex gap-2">
                                    <Button color="light" className="text-white hover:text-black"  onClick={() =>setEdit(!edit)}>{!edit ? 'Edit' : 'Cancel'}</Button>
                                    <Button color="light" className="text-white hover:text-black" onClick={() => setShowPassword(!showPassword)} >Change password</Button>
                                </div>
                            </> ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center justify-center gap-3">
                                    <div className="flex flex-col gap-3 pt-4 ">
                                       <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password: </label>
                                       <input {...register("password", {required:true, minLength: 6})} type="password" id="password"  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                                    </div>
                                    <div className="flex flex-col gap-3 pt-4 ">
                                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-white dark:text-white">Confirm password: </label>
                                        <input {...register("confirm_password", {required:true, minLength: 6})} type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                                    </div>
                                    <div className="flex gap-2 pt-4">
                                        <Button color="light" className="text-white hover:text-black" onClick={() => setShowPassword(!showPassword)}>Cancel</Button>
                                        <Button color="light" className="text-white hover:text-black" type="submit">Change password</Button>
                                    </div>
                                </form>
                            )}
                        </>
                     </div>
                </main>
                )}
            </div>
        )
    }

}
export default Dashboard;
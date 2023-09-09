
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, TextInput } from 'flowbite-react';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { useForm, SubmitHandler} from "react-hook-form";
import type { NewPassword } from "./CredentialsPages/NewPasswordPage";
import { changePassword } from "../Features/user";
const Dashboard = () => {

    const {isAuthenticated, user, loading} = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<NewPassword>()

      const onSubmit: SubmitHandler<NewPassword> = (data) => {
        dispatch(changePassword({password: data.password, email:  user.email}))
        setShowPassword(!showPassword)
        navigate("/login")
    }
    if(!isAuthenticated && !loading && user === null){
        return <Navigate to="/login"/>
    }
    else {
        return(
            <div>
                {loading || user === null ? (
                        <LoadingSpinner/>
                ):
                (
                <main className="flex gap-4 items-center justify-center">
                    <div className="flex flex-col w-2/3 min-h-screen justify-center items-center gap-4">
                        <div>
                            <h1 className="text-2xl">Dashboard</h1>
                        </div>
                        <br></br>
                        <>
                        {!showPassword ?(
                            <>
                                <div className="flex justify-between w-1/3 pt-4">
                                <dt>Fistname : </dt>
                                {!edit ? <dd> {user.first_name}</dd> :   <TextInput placeholder={user.first_name} id="small" sizing="sm" type="text"/>}
                                </div>
                                <div className="flex justify-between w-1/3 border-t  pt-4">
                                <dt>Lastname : </dt>
                                {!edit ? <dd> {user.last_name}</dd> :   <TextInput placeholder={user.last_name} id="small" sizing="sm" type="text"/>}
                                </div>
                                <div className="flex justify-between w-1/3 border-t  pt-4">
                                <dt>Email : </dt>
                                {!edit ? <dd> {user.email}</dd> :   <TextInput placeholder={user.email} id="small" sizing="sm"  type="email"/>}
                                </div>
                                <div className="flex justify-between w-1/3 border-t  pt-4">

                                </div>
                                <div className="flex gap-2 ">
                                    <Button color="light" className="text-white"  onClick={() =>setEdit(!edit)}>{!edit ? 'Edit' : 'Cancel'}</Button>
                                    <Button color="light" className="text-white" onClick={() => setShowPassword(!showPassword)} >Change password</Button>
                                </div>
                            </> ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center justify-center gap-3">
                                    <div className="flex flex-col gap-3 pt-4 w-1/2">
                                       <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-white">Password: </label>
                                       <input {...register("password", {required:true, minLength: 6})} type="password" id="password"  className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                                    </div>
                                    <div className="flex flex-col gap-3 pt-4 w-1/2">
                                        <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-white dark:text-white">Confirm password: </label>
                                        <input {...register("confirm_password", {required:true, minLength: 6})} type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                                    </div>
                                    <div className="flex gap-2 w-1/2">
                                        <Button color="light" className="text-white" onClick={() => setShowPassword(!showPassword)}>Cancel</Button>
                                        <Button color="light" className="text-white" type="submit">Change password</Button>
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
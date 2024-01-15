import React from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import  { registerUser } from "../../Features/user";
import type { RegisterUser } from "../../Features/user";
import { useAppSelector, useAppDispatch } from "../../store";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";


const RegisterPage = () => {

    const { registered, userLoading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
      } = useForm<RegisterUser>()

    const onSubmit: SubmitHandler<RegisterUser> = (data) => {
        dispatch(registerUser({...data}));
        return <Navigate to="/login"/>
      }
    if(registered) {
        return <Navigate to="/login" />
    }

    return(
        <main className="flex flex-col justify-center items-center gap-4 py-5">
            <br></br>
            <h1 className="text-2xl">Register for an Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 ">
                <div className="relative z-0 w-full mb-6 group">
                    <label  htmlFor="floating_firstname" className="block mb-2 text-sm font-medium text-white-900 ">First name</label>
                    <input {...register("first_name", {required:true})} type="text"  id="floating_firstname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder=" " required />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label  htmlFor="floating_lastname" className="block mb-2 text-sm font-medium text-white-900 ">Last name</label>
                    <input {...register("last_name", {required: true})} type="text"  id="floating_lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder=" " required />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label  htmlFor="floating_email" className="block mb-2 text-sm font-medium text-white-900">Email</label>
                    <input {...register("email", {required: true})} type="email"  id="floating_email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder=" " required />
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <label  htmlFor="floating_password" className="block mb-2 text-sm font-medium text-white-900">Password</label>
                    <input {...register("password", {required: true})} type="password" id="floating_password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder=" " required />
                </div>
                {userLoading ? (
                    <LoadingSpinner loadingText=""/>
                ): (
                    <div className="flex justify-center">
                        <button type="submit" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Register</button>
                    </div>
                )}
            </form>
        </main>
    )
}
export default RegisterPage;
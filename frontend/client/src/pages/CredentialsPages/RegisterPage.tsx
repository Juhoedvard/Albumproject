import React from "react";
import { useForm, SubmitHandler} from "react-hook-form";
import  { registerUser } from "../../Features/user";
import type { RegisterUser } from "../../Features/user";
import { useAppSelector, useAppDispatch } from "../../store";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";


const RegisterPage = () => {

    const { registered, loading } = useAppSelector((state) => state.user);
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
        <main className="flex flex-col justify-center items-center gap-4 py-5 ">
            <br></br>
            <h1 className="text-2xl">Register for an Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 ">
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("first_name", {required:true})} type="text"  id="floating_firstname" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label  htmlFor="floating_firstname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("last_name", {required: true})} type="text"  id="floating_lastName" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label  htmlFor="floating_lastname" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("email", {required: true})} type="email"  id="floating_email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label  htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input {...register("password", {required: true})} type="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required />
                    <label  htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                {loading ? (
                    <LoadingSpinner/>
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
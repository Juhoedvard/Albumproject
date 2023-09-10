import React from "react";
import { Button } from "flowbite-react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { changeForgottenPassword } from "../../Features/user"
import { useForm, SubmitHandler} from "react-hook-form";

import { useEffect } from "react"
import { useAppDispatch} from "../../store"

export type NewPassword = {
    password: string;
    confirm_password: string;
}
const NewPasswordPage = () => {


    const navigate = useNavigate()
    const time = parseInt(window.localStorage.getItem("passwordResetTime") || '0')
    if(!time){
        navigate("/login")
    }
    const now = new Date()
    const diff = now.getTime() - (time)

    useEffect(() => {
        if(diff > 900000){
            navigate("/login")
        }
    })


    const dispatch = useAppDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<NewPassword>()

    const { token } = useParams<string>()

    const onSubmit: SubmitHandler<NewPassword> = (data) => {

        if(token && diff < 900000 && data.password === data.confirm_password ){
            dispatch(changeForgottenPassword({password: data.password, token: token}))
            navigate("/login")
        }
        else{

        }


    }
    return(
        <main className="flex flex-col justify-center items-center gap-4 py-5 ">
        <br></br>
            <h1 className="text-2xl font-medium">Reset your password with email: </h1>
            <br></br>
            <form className="flex flex-col w-1/3 gap-2" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password: </label>
                    <input {...register("password", {required:true, minLength: 6})} type="password" id="password"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                </div>
                <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password: </label>
                    <input {...register("confirm_password", {required:true, minLength: 6})} type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                </div>
                <div>
                    <Button color="light" type="submit">Submit </Button>
                </div>

            </form>
        </main>
    )
}

export default NewPasswordPage
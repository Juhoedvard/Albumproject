import React from "react";
import { Button } from "flowbite-react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { sendPasswordEmail } from "../../Features/user"

const ResetPasswordPage = () => {

    const dispatch = useDispatch<AppDispatch>()
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(sendPasswordEmail(email))
        navigate("/")

    }

    return (
        <main className="flex flex-col justify-center items-center gap-4 py-5 ">
        <br></br>
            <h1 className="text-2xl font-medium">Reset your password with email: </h1>
            <br></br>
            <form className="flex flex-col w-1/3 gap-2" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email: </label>
                    <input type="email" id="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
                </div>
                <div className="flex gap-2">
                    <Button color="dark" type="submit">Send email</Button>
                    <Link to={'/'}><Button color="dark" type="button"> Cancel</Button></Link>
                </div>

            </form>
        </main>
    )

}

export default ResetPasswordPage
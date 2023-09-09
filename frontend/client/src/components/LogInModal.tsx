import { Modal } from "flowbite-react"
import { useEffect } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Link } from "react-router-dom"
import { LoginUser, resetRegistered, loginUser } from "../Features/user"
import { useAppDispatch, useAppSelector } from "../store"
import LoadingSpinner from "./LoadingSpinner"




const LogInModal = ({openModal, setOpenModal} : {openModal: undefined | string, setOpenModal: Function,}) => {

    const dispatch = useAppDispatch()
    const {isAuthenticated, loading, registered} = useAppSelector((state) => state.user)
    const {
        register,
        handleSubmit,
      } = useForm<LoginUser>()

    useEffect(() => {
        dispatch(resetRegistered())
    }, [registered])

    const onSubmit: SubmitHandler<LoginUser> = (data) => {
        dispatch(loginUser({...data}))

    }
    if(isAuthenticated){
         return setOpenModal(undefined)
        }


    return(

    <Modal  dismissible show={openModal === 'dismissible'}  size={'md'}  onClose={() => setOpenModal(true)}>
    <Modal.Header className='bg-' > <h1 className="text-2xl">Log in to you account</h1></Modal.Header>
      <Modal.Body >
      <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black  dark:text-white">Your email</label>
                    <input  {...register("email", {required:true})}type="email" id="email" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Your password</label>
                    <input  {...register("password", {required:true})} type="password" id="password" className="bg-gray-50 border text-black border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-black-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-black-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"/>
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-black dark:text-gray-300">Remember me</label>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => setOpenModal(undefined)}type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                    <button type="submit" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium  focus:outline-none text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Sign in</button>
                </div>
        </form>

      </Modal.Body>
      <Modal.Footer >
      {loading ? (
                  <LoadingSpinner/>
                    ): (
                <div>
                    <div>
                        <span className=" text-sm text-black">Don't have a account yet? <Link to={'/register'} className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">Sign up</Link></span>
                    </div>
                    <div>
                        <span className=" text-sm text-black">Forgotten pasword? <Link to={'/reset-password'} className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline">Reset password</Link></span>
                    </div>
                </div>
                 )}
      </Modal.Footer>
    </Modal>

)

}

export default LogInModal
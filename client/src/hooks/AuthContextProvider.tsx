import React from "react";
import {  useState} from "react";
import {  useAppSelector } from "../store";
import { Outlet, useNavigate} from "react-router-dom";
import LogInModal from "../components/LogInModal";
import { Button } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";




export default  function  Auth() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return isAuthenticated;
}


export const ProtectedRoutes = () => {

    const {isAuthenticated, userLoading } = useAppSelector((state) => state.user);
    const [openModal, setOpenModal] = useState<string |undefined>()
    const navigate = useNavigate()

   if(userLoading) {
    return(
      <div className="flex w-full h-screen justify-center">
        <LoadingSpinner loadingText="Loading..."/>
      </div>
    )
   }

    return (
    isAuthenticated ? <Outlet /> :
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <h1 className="text-2xl">Page requires authentication if you are already logged in wait few seconds </h1>
        <br></br>
        <div className="flex gap-4">
          <Button color='dark' onClick={() => navigate(-1)}>
            Return
          </Button>
          <Button color='dark'  type="button" onClick={() => setOpenModal('dismissible')}>
              Log in
          </Button>

        </div>
      </div>

      <LogInModal openModal={openModal}
                  setOpenModal={setOpenModal}/>

    </div>)
}
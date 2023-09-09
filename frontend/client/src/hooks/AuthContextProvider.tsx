import { createContext, useState} from "react";
import { useAppSelector } from "../store";
import { Outlet, useNavigate} from "react-router-dom";
import LogInModal from "../components/LogInModal";
import { Button } from "flowbite-react";


interface AuthContextProps {
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
});

export default function Auth() {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return isAuthenticated;
}


export const ProtectedRoutes = () => {
    const isAuth = Auth()
    const [openModal, setOpenModal] = useState<string |undefined>()
    const navigate = useNavigate()
    return( isAuth ? <Outlet /> :
    <div className="flex h-screen w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2">
        <h1 className="text-2xl">Page requires authentication</h1>
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
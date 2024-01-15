import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../Features/user";
import {  useAppDispatch, useAppSelector } from "../store";
import { Dropdown, Spinner } from "flowbite-react";
import { HiLogout, HiViewGrid, } from 'react-icons/hi';
import {BiPhotoAlbum} from 'react-icons/bi'
import {MdPhotoAlbum} from 'react-icons/md'
import { DropdownItem } from "flowbite-react/lib/esm/components/Dropdown/DropdownItem";
import { useSearch } from "../hooks/SearchContextProvider";
import { useState } from "react";
import LogInModal from "./LogInModal";


const NavBar = () => {

    const dispatch = useAppDispatch()
    const {user, userLoading } = useAppSelector((state) => state.user);

    const {searchTerm, setSearchTerm} = useSearch()
    const [openModal, setOpenModal] = useState<string |undefined>()

    const showModal = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(!openModal){
               e.preventDefault()
               setOpenModal('dismissible')
        }

    }
    return(
            <nav className= "sticky bg-black top-0 z-30 border-gray-400 dark:bg-gray-900 text-white border-b px-4 ">
                <div className="w-full flex justify-between p-4">
                    <Link to="/">
                        <h2 className="font-bold text-xl lg:text-4xl pr-4">Albumproject</h2>
                    </Link>
                    <div className="md:w-2/3 md:px-4">
                        <input type="text" id="search-navbar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="truncate p-2 w-full pl-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a album..."/>
                    </div>
                    <div>
                    {userLoading ? <div className="flex md:order-3"> <Spinner/> </div> :  <div className="flex items-center justify-center md:order-3 pl-4">
                        {user ?
                            <Dropdown color={'bg-neutral-700'}  label={user.first_name}>
                                  <Dropdown.Header>
                                    <span className="block text-sm ">
                                        {user.first_name} {user.last_name}
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        {user.email}
                                    </span>
                                    </Dropdown.Header>
                                    <DropdownItem icon={HiViewGrid} as= {Link} to={'/dashboard'} >Dashboard</DropdownItem>
                                    <DropdownItem icon={BiPhotoAlbum} as= {Link} to={'/create-album'} >Create a album</DropdownItem>
                                    <DropdownItem icon={MdPhotoAlbum} as ={Link} to={`/myalbums/${user.id}`}>My albums</DropdownItem>
                                    <Dropdown.Divider />
                                    <DropdownItem icon={HiLogout} onClick={() => dispatch(logoutUser())}>
                                        Sign out
                                    </DropdownItem>
                            </Dropdown>
                        :
                            <button onClick={(e) => showModal(e)} className="flex flex-col justify-center items-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                       <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className=" font-medium">Login</span>
                            </button>
                         }
                        </div>}
                        {openModal === 'dismissible' &&   <LogInModal setOpenModal={setOpenModal}
                                        openModal={openModal}
                                        />}
                            </div>
                    </div>
                </nav> 
        )

    }
export default NavBar;
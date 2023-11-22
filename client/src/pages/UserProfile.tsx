import React from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { useEffect} from "react"
import {  getProfile } from "../Features/user"
import LoadingSpinner from "../components/LoadingSpinner"
import AlbumComponent from "../components/AlbumComponent"
import { Album } from "../Features/album"


const UserProfile = () => {

    const dispatch = useAppDispatch()
    const {id } = useParams()
    const {userprofile, loading} = useAppSelector((state) => state.user)

    useEffect(() => {
        if(id){
         dispatch(getProfile(id))
         }
        }, [id])

    return(
        <div className="flex flex-col">
            <div className="flex flex-col items-center px-4">
                {loading ? <LoadingSpinner loadingText="Loading profile"/> : userprofile  &&
                <div>
                 <div>
                      <h1 className="text-3xl font-bold">{userprofile.first_name} {userprofile.last_name}</h1>
                 </div>
                 <br></br>
                <div className="flex flex-col gap-4">
                            <dt>Description: </dt>
                            <dd className="pl-3 pb-4 text-sm">{userprofile.descripton ?  userprofile.description : "User has no description"}</dd>
                </div>
                </div>}
            </div>
            <div className="flex items-center justify-center px-4">
                <div className="w-full border-b py-4 lg:border-none"></div>
            </div>
            <div className="grid items-center justify-center  ">
             <div className="">
                <h1 className="font-extrabold text-5xl italic m-10">
                    Albums
                </h1>
                <br></br>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 ">{loading ?
                    <LoadingSpinner loadingText="Loading albums..."/>
                : userprofile?.useralbums.map((album : Album, index: string) => {
                        return(
                            <div key={index}>
                                <AlbumComponent
                                    album = {album}
                                />
                            </div>
                        )
                    })
            } </div>
            </div>
        </div>
        </div>
    )
}


export default UserProfile
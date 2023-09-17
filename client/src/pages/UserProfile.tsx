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
        <div className="flex">
            <br></br>
            <div className="flex flex-col h-1/3  items-center my-6 w-1/3 border-b">
                {loading ? <LoadingSpinner loadingText="Loading profile"/> : userprofile  &&
                <div>
                 <div>
                      <h1 className="text-3xl font-bold">{userprofile.first_name} {userprofile.last_name}</h1>
                 </div>
                 <br></br>
                <div className="flex flex-col h-2/3 gap-4 ">
                            <dt>Description: </dt>
                           <dd> {userprofile.description}</dd>

                </div>
                </div>}
            </div>
            <div className=" min-h-screen border-r"></div>
            <div className="grid h-2/3 w-full mx-10 items-center justify-center ">
             <div className="maw-w-4xl w-full">
                <h1 className="font-extrabold text-5xl italic m-10">
                    Albums
                </h1>
                <br></br>
                <div className="grid grid-cols-2 md:grid-cols-3 m-10 gap-10 w-2/3 ">{loading ?
                    <LoadingSpinner loadingText="Loading albums..."/>
                :
                    userprofile?.useralbums.map((album : Album, index: string) => {
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
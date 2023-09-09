
import {  useAppSelector } from "../store";
import  { Album} from "../Features/album";
import AlbumComponent from "../components/AlbumComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlbums from "../components/ErrorAlbums";
import { useSearch } from "../hooks/SearchContextProvider";
import useDebounce from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomePage = () => {

    const {albums, loading} = useAppSelector((state) => state.albums)
    const { searchTerm } = useSearch();
    const debouncedSearch = useDebounce(searchTerm, 300)
    const [searchResults, setSearchResults] = useState<Album[] | null>([]);


    useEffect(() => {

        if(debouncedSearch === ''){
            setSearchResults(albums)
        }
        else{
             const searchedAlbums = albums.filter((album) => {
                return( album.title.toLowerCase().startsWith(debouncedSearch.toLowerCase())   )


        })
        if(searchedAlbums.length < 1 ){
            setTimeout(() => {
                toast.info('No results from search')
            }, 1000)
        }
        else{
             setSearchResults(searchedAlbums)
        }
        }
    }, [debouncedSearch, albums])

    if(albums.length < 1 && !loading){
        return(
                <ErrorAlbums/>
        )
    }
    return(
        <div className="grid h-full w-full ">
            <br></br>
            {!loading && <h1 className="font-extrabold text-5xl italic m-10">
                Albums
            </h1>}
            <br></br>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-10 m-10 ">{loading ?
                <LoadingSpinner/>
             :
                searchResults?.map((album : Album, index) => {
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
    )
}
export default HomePage;
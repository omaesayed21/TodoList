import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../config/axios.config"
import type {  AxiosRequestConfig } from "axios"

interface  IuseAuthenticatedQuery {
    queryKey: string[],
    url : string
    config? : AxiosRequestConfig

}

const useAuthenticatedQuery =  ( {url , config , queryKey }: IuseAuthenticatedQuery) => {
    return useQuery({

        queryKey,
        queryFn :async () =>{
    
       const {data} =  await axiosInstance.get(url , config)
        return data
         
       } 
       })
}

export default useAuthenticatedQuery
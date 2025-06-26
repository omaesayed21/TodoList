import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Componets/ui/Button";
import Input from "../Componets/ui/input";
import InputErrorMessage from "./ErorrMassge";
import { RegisterForm } from "../Componets/ui/data";
import  {yupResolver} from "@hookform/resolvers/yup";
import {  registerSchema } from "./Valdition";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../Interface";


interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);


  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ 
    resolver: yupResolver(registerSchema),
    });


    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        setIsLoading(true);
    
    
    try {
   const {status} =  await axiosInstance.post('/auth/local/register', data);
        console.log('Registration successful');   

      if(status === 200){
        toast.success('You will navigate to login page after 4 seconds !' ,{
          position: 'top-center',
          duration: 4000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          }
        });
        
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>
      console.log(errorObj.response?.data?.error?.message);
          toast.error(`${errorObj.response?.data?.error?.message}` , {
            position: 'top-center',
            duration: 4000,});   

    }finally{
      setIsLoading(false);
    }
    
    
      };
    // console.log(errors);

    const registerForm = RegisterForm.map(({ name, placeholder, type, Validation }) => (
        <div key={name}>
            <Input
                type={type}
                placeholder={placeholder}
                {...register(name, Validation)}
            />
            {errors[name] && <InputErrorMessage msg={errors[name].message} />}
        </div>
    ));

    return (
        <div className="max-w-md mx-auto">
            <h1 className="mb-3 text-3xl font-semibold text-center">Register Now !</h1>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {registerForm}
                <Button isLoading={isLoading} fullWidth   type="submit">
             
      Try Now           
                </Button>
            </form>
        </div>
    );
};
export default RegisterPage;
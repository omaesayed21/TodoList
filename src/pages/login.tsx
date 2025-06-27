import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Componets/ui/Button";
import { LoginForm } from "../Componets/ui/data";
import Input from "../Componets/ui/input";
import InputErrorMessage from "./ErorrMassge";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema } from "./Valdition";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../Interface";

const LoginPage = () => {
    interface IFormInput {
        identifier: string;
        password: string;
    }
    
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm<IFormInput>({
        resolver: yupResolver(LoginSchema),
    });

    // Render Login Form
    const renderLoginForm = LoginForm.map(({ name, placeholder, type, Validation } , index ) => (
        <div key={index}>
            <Input
                type={type}
                placeholder={placeholder}
                {...register(name, Validation)}
            />
            {errors[name] && <InputErrorMessage msg={errors[name].message} />}
        </div>
    ))

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        setIsLoading(true);
        
        try {
            const { status, data: resData } = await axiosInstance.post('/auth/local', data);
            console.log('Login response:', resData);
            
            if (status === 200) {
                const userData = {
                    ...resData.user,
                    jwt: resData.jwt 
                };
                
                localStorage.setItem('loggedInUser', JSON.stringify(userData));
                
                toast.success('You will navigate to home page after 2 seconds!', {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                    }
                });
                
                setTimeout(() => {
                    location.replace('/');
                }, 2000);
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            toast.error(`${errorObj.response?.data?.error?.message}`, {
                position: 'top-center',
                duration: 4000,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="max-w-md mx-auto">
                <h1 className="mb-3 text-3xl font-semibold text-center">Login Now!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {renderLoginForm}
                    <Button fullWidth isLoading={isLoading} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
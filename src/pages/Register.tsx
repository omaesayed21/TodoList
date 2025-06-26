import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../Componets/ui/Button";
import Input from "../Componets/ui/input";
import InputErrorMessage from "./ErorrMassge";
import { RegisterForm } from "../Componets/ui/data";
import  {yupResolver} from "@hookform/resolvers/yup";
import {  registerSchema } from "./Valdition";


interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ 
      resolver: yupResolver(registerSchema),
    });
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };
    console.log(errors);

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
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
};

export default RegisterPage;
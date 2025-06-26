import type { Ilogininput, IRegisterinput } from "../../../Interface";

export const RegisterForm   : IRegisterinput[] = [
{
   name : "username",
   placeholder : "Username",
   type : "text",
   Validation : {
      required : true,
      minLength : 5,
   } 
},
{
   name : "email",
   placeholder : "Email",
   type : "email",
   Validation : {
      required : true,
      pattern : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
   } 
},
{
   name : "password",
   placeholder : "Password",
   type : "password",
   Validation : {
      required : true,
      minLength : 8,
   }
}
]


export const LoginForm   : Ilogininput[] = [
{
   name : "identifier",
   placeholder : "Email",
   type : "email",
   Validation : {
      required : true,
      pattern : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
   } 
},
{
   name : "password",
   placeholder : "Password",
   type : "password",
   Validation : {
      required : true,
      minLength : 8,
   }
}
]
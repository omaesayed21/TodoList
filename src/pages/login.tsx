import Input from "../Componets/ui/input";

const LoginPage = () => {
    return (
        <>
<div className="  max-w-md mx-auto">
    <h1 className=" mb-3 text-3xl font-semibold text-center"> Login Now !</h1>
    <form action="" className="space-y-4">
        <div >        <Input type="email" placeholder="Email" />
</div>
<div>        <Input type="password" placeholder="Password" />
</div>
    </form>
</div>
        </>
    );

}

export default LoginPage
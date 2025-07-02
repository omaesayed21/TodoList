import { Button } from "@headlessui/react";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";

const ProfilePage = () => {
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;
 
    const { data, isLoading, error } = useAuthenticatedQuery({
        url: "/users/me?populate=todos",
        config: { headers: { Authorization: `Bearer ${userData.jwt}` } },
        queryKey: ["user-profile"]
    });
    


    console.log(data);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Error loading profile</div>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-4">
            <div className=" flex items-center justify-between"> 
            <h2 className="text-3xl font-bold mb-6 text-center">👤 Your Profile</h2>
            <Button
                className="bg-indigo-600 text-white p-2 rounded-md cursor-pointer mb-6" >
                    Edit Profile
                </Button>
                </div>            
            <div>
                <p>
                    <strong>Name:</strong> {data?.username || userData?.username}
                </p>
                <p>
                    <strong>Email:</strong> {data?.email || userData?.email}
                </p>
                <p>
                    <strong>ID:</strong> {data?.id || userData?.id}
                </p>
           <p>
                    <strong>Total Todos:</strong> {data?.todos?.length || 0}
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;
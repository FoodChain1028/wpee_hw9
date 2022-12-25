// 輸入名字
import AppTitle from "../components/Title";
import LogIn from "../components/Login";
import { useChat } from "./hooks/useChat";

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();
    const handleLogin = (name) => {
        // Can be enhanced by authenticated login
        if (!name){
            displayStatus({
                type: "error",
                msg: "Missing user name",
            });
        }
        else {
            setSignedIn(true);
        }
    }

    return ( 
        <>
            <AppTitle name={me}/>
            <LogIn me={me} setName={setMe} onLogin={handleLogin} />
        </>
    );
}

export default SignIn;

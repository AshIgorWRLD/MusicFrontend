import {useHistory} from "react-router-dom";
import MyButton from "../UI/buttons/MyButton";

const UserItem = (props) => {
    const router = useHistory()
    return (
        <div className="post">
            <div className="post_content">
                <strong>{props.user.id}. Name:{props.user.name}</strong>
                <div>
                    Login:{props.user.login} Password:{props.user.password}
                </div>
            </div>
            <div className="post_btns">
                <MyButton onClick={()=> props.openEditModal(props.user.id)}>
                    Edit
                </MyButton>
                <MyButton onClick={()=> router.push(`/users/${props.user.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.user.id)}>
                    Remove
                </MyButton>
            </div>
        </div>
    );
};

export default UserItem;
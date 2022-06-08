import React, {useState} from 'react';
import classes from "./MyInput.module.css";

const MyInputWithVariants = React.forwardRef((props, ref) => {

    return (
        <div style={{width: 400}}>
            <form ref={ref} className={classes.myInput} {...props}>
                <select>
                    {props.content.map((user) =>
                        <option
                            value={user.id}>{user.name}
                        </option>)}
                </select>
            </form>
        </div>
    );
});

export default MyInputWithVariants;
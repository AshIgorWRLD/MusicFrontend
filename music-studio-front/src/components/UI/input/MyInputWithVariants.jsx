import React, {useState} from 'react';
import classes from "./MyInput.module.css";
import {useEffect} from "react";

const MyInputWithVariants = React.forwardRef((props, ref) => {

    const [value, setValue] = useState('');

    useEffect(() => {
        if(props.value) {
            setValue(props.value)
        }
    }, [props.value])


    return (
        <div style={{width: 400}}>
            <form ref={ref} className={classes.myInput} {...props}>
                <select>
                    {props.content.map((user) =>
                        <option selected={value === user.id}
                            value={user.id}>{user.name}
                        </option>)}
                </select>
            </form>
        </div>
    );
});

export default MyInputWithVariants;
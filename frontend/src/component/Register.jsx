import React from "react";
import { useNavigate } from "react-router-dom";
import {useFormik} from "formik"
import { useRegisterMutation } from "../services/auth";
function Register(){


    var [register]=useRegisterMutation();
    var navigate = useNavigate();
    var rform= useFormik({
        initialValues:{
            name:"",
            email:"",
            password:"",
            role:""
        },
        onSubmit:(values)=>{
            register(values).then(() => {
                navigate("/login");
            })
        }
    })

    return(
        <div>
            <h1>Sign up</h1>
            <form onSubmit={rform.handleSubmit}>
                Name:<input type="type" {...rform.getFieldProps("name")}/><br/>
                Email:<input type="email" {...rform.getFieldProps("email")}/><br/>
                Password:<input type="password" {...rform.getFieldProps("password")}/><br/>
                {/* Role:<input type="radio" value="r" {...rform.getFieldProps("role")}/>Buyer
                     <input type="radio" value="r" {...rform.getFieldProps("role")}/>Vendor<br/> */}

                Role:
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="buyer"
                            onChange={rform.handleChange}
                        />
                        Buyer
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="vendor"
                            onChange={rform.handleChange}
                        />
                        Vendor
                    </label>
                    <br/>

                <button type="submit">Register</button>

            </form>
        </div>
    )
}

export default Register;
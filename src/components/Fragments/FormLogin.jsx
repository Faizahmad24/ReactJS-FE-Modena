import InputForm from "../Elements/Input/Index"
import Button from "../Elements/Button"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { useState, useRef } from "react"
import { login } from "../../Services/auth.service";
import { useNavigate } from "react-router-dom"
import { Toast } from 'primereact/toast';

    const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    `;

    const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    `;
    const StyledCheckbox = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid #000; // Sesuaikan dengan warna atau gaya yang diinginkan
    transition: background 0.3s;

    ${HiddenCheckbox}:checked + & {
        background: #000; // Sesuaikan dengan warna atau gaya yang diinginkan ketika dicentang
        border: 2px solid #fff; // Sesuaikan dengan warna atau gaya yang diinginkan ketika dicentang
    }
    `;

    const CircleCheckbox = ({ checked, onChange }) => (
        <CheckboxContainer>
        <HiddenCheckbox checked={checked} onChange={onChange} />
        <StyledCheckbox />
        </CheckboxContainer>
    );
const FormLogin = () => {
    const [isChecked, setChecked] = useState(false);
    const navigate = useNavigate()
    const [loginFailed, setLoginFailed] = useState("");
    const handleCheckboxChange = () => {
        setChecked(!isChecked);
    };

    const toast = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault()

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }

        
        if (data.email === "") {
            const showWarn = () => {
                toast.current.show({severity:'warn', summary: 'Warning', detail:'Email must be filled', life: 3000});
            }
            return showWarn()
        }

        if (data.password === "") {
            const showWarn = () => {
                toast.current.show({severity:'warn', summary: 'Warning', detail:'Password must be filled', life: 3000});
            }
            return showWarn()
        }

        login(data, (status, res) => {
            if (status) {
                localStorage.setItem('email', res.user.email)
            navigate('/dashboard')
            } else {
                const showError = () => {
                    toast.current.show({severity:'error', summary: 'Error', detail:res, life: 3000});
                }
                setLoginFailed(showError)
        }
    })
    }
    return (
        <div className='w-1/2 flex justify-center min-h-screen'>
                <div className="mt-20 px-20 w-full">
                    <div className="flex font-bold mb-5">
                        <img className='w-14 h-14' src="../public/images/B.png" alt="" />
                        <p className='py-4 text-lg'>B2b Portal</p>
                    </div>
                    <div className="mb-8">
                        <h1 className='text-2xl font-bold'>Login to your account</h1>
                    </div>
                        <form onSubmit={handleLogin}>
                            <InputForm 
                            label="Email Account"
                            type="email" 
                            placeholder="Email Account" 
                            name="email" />

                            <InputForm
                            label="Password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            />

                            <div className="flex justify-between">
                                <div className="mb-8">
                                    <CircleCheckbox checked={isChecked} onChange={handleCheckboxChange} />
                                    <label className="font-bold text-sm">Remember Me</label>
                                    
                                </div>
                                <Link to='/' className="text-green-500">Forgot Password?</Link>
                            </div>                            

                            <Toast ref={toast} />
                            <Button type="submit" classname="bg-green-500 text-white mb-4">Login</Button>
                            <div className="flex justify-between mt-4 w-full mb-5">
                                <div className="w-2/5">
                                    <Button classname='bg-white border text-black flex justify-center'><img className="w-5 h-5 mr-2" src="../public/images/search.png" alt="" /> Google</Button>
                                </div>
                                <div className="w-2/5">
                                    <Button classname='bg-white border text-black flex justify-center'><img className="w-5 h-5 mr-2" src="../public/images/facebook.png" alt="" /> Facebook</Button>
                                </div>
                            </div>
                            <span className="text-sm">Don't have an account? <Link to='/register' className="text-green-600">Get Started</Link></span>
                            {loginFailed && <p className="text-red-500 text-center">{loginFailed}</p>}
                        </form>
                </div>
            </div> 
    )
}

export default FormLogin
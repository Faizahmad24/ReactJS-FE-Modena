import Button from "../Elements/Button"
import InputForm from "../Elements/Input/Index"
import { Link } from 'react-router-dom'
import { register } from "../../Services/register.service";
import { Steps } from 'primereact/steps';
// import register from "../../Services/auth.service"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Toast } from 'primereact/toast';

const FormRegister = () => {
    const items = [
        {
            label: 'User Info'
        },
        {
            label: 'Company'
        },
        {
            label: 'Package'
        }
    ];
    const navigate = useNavigate()
    const [registerFailed, setRegisterFailed] = useState("");
    const toast = useRef(null);
    const handleRegister = (e) => {
        e.preventDefault()

        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
            password_confirmation: e.target.confirmNewPassword.value,
            phone: e.target.phone.value,
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

          if (data.password.length < 6) {
            const showWarn = () => {
                toast.current.show({severity:'warn', summary: 'Warning', detail:'Password must be at least 6 digits', life: 3000});
            }
            return showWarn()
          }

          if (data.password_confirmation === "") {
            const showWarn = () => {
                toast.current.show({severity:'warn', summary: 'Warning', detail:'Password Confirmation must be filled', life: 3000});
            }
            return showWarn()
          }

          if (data.phone === "") {
            const showWarn = () => {
                toast.current.show({severity:'warn', summary: 'Warning', detail:'Phone must be filled', life: 3000});
            }
            return showWarn()
          }

          register(data, (status, res) => {
              if (status) {
                navigate('/')
                } else {
                    const showWarn = () => {
                        toast.current.show({severity:'warn', summary: 'Warning', detail:res, life: 3000});
                    }
                    setRegisterFailed(showWarn())
            }
        })
    }
    return(
        <>
            <div className='w-1/2 flex justify-center min-h-screen'>
                <div className="px-20 w-full">
                    <div className="flex justify-center font-bold mb-5">
                        <p className='py-4 text-lg'>Registration</p>
                    </div>
                    <div className="card mb-5">
                        <Steps model={items} />
                    </div>
                    <div className="mb-5">
                        <h1 className='text-xl bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent'>User Info</h1>
                    </div>
                        <form onSubmit={handleRegister}>
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

                            <InputForm
                            label="Confirmation Password"
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmNewPassword"
                            />

                            <InputForm
                            label="Mobile Number"
                            type="text"
                            placeholder="Type Your Number Here"
                            name="phone"
                            />
                            
                            <Toast ref={toast} />
                            <Button type="submit" classname="bg-green-500 text-white">Continue</Button>
                            <div className="flex justify-center mt-4">
                                    <Link className="font-bold text-sm text-center text-green-600" to="/">Back</Link>
                            </div>
                            {registerFailed && <p className="text-red-500 text-center">{registerFailed}</p>}
                        </form>
                </div>
            </div> 
        </>
        
    )
}
export default FormRegister
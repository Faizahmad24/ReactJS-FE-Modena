import { Password } from "primereact/password"
import { useState } from "react"
const Input = (props) => {
    const {type, placeholder, name, onChange, value} = props
    return (
                <InputType type={type} placeholder={placeholder} name={name} onChange={onChange} value={value}></InputType>
            )
}

const InputType = ({type,  placeholder, name, onChange, value}) => {
    const [value1, setValue1] = useState('')
    if (type === 'password') {
        return (
            <Password id={name} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className="px-3 py-2 border mb-5 shadow-md rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 peer" inputStyle={{ width:'100%' }} value={value1} onChange={(e) => setValue1(e.target.value)} toggleMask />
        )
    } else {
        return (
            <input id={name} type={type} placeholder={placeholder} name={name} value={value}
            onChange={onChange} 
            className="px-3 py-2 border mb-5 shadow-md rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 peer"></input>
        )
    }
}

export default Input
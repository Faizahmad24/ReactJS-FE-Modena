const Label = (props) => {
    const {htmlFor, children} = props
    return (
        <label className="font-bold text-sm block mb-2" htmlFor={htmlFor} >{children}</label>
    )
}

export default Label
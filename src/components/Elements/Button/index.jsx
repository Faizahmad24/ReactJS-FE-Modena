const Button = (props) => {
    const {children = "...", classname = "bg-green-500", onClick= () => {}, type = "button"} = props
    return (
        <div className="flex justify-center">
            <button className={`rounded-lg ${classname} w-full p-2`}
            type={type}
            onClick={onClick}
            >
            {children}
            </button>
        </div>
    )
}
export default Button
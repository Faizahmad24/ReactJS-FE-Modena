import "primereact/resources/themes/lara-light-indigo/theme.css";
const AuthLayout = (props) => {
    const {children} = props

    const backgroundImageStyle = {
        backgroundImage: 'url(../public/images/Login.png)',
        height: '100vh', // Sesuaikan dengan tinggi yang diinginkan
      };
    return (
        <div className="flex">
            {/* <div className='w-1/2 flex justify-center min-h-screen'>
                <div className="py-20 px-20 w-full">
                <div className="flex justify-center font-bold mb-5">
                    <p className='py-4 text-lg'>Registration</p>
                </div>
                <div className="card mb-5">
                    <Steps model={items} />
                </div>
                <div className="mb-5">
                    <h1 className='text-xl bg-gradient-to-r from-green-400 to-teal-600 bg-clip-text text-transparent'>User Info</h1>
                </div>
                    {children}
                </div>
            </div> */}
            {children}
            <div style={backgroundImageStyle} className='w-1/2 max-h-full min-h-screen bg-center bg-cover'>
            </div>
        </div> 
    )
}

export default AuthLayout
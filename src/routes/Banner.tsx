
const Banner = () => {
    return (
        <div
            className='bg-[url("https://i.ibb.co/V0hBhY26/bookstore-author-event.jpg")] 
                       bg-cover bg-center bg-no-repeat 
                       w-full min-h-screen flex items-center justify-center text-white text-center px-4'
        >
            <div className="bg-black bg-opacity-60 p-6 rounded-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome</h1>
                <p className="text-lg md:text-xl">To the Library Management System</p>
            </div>
        </div>
    );
};

export default Banner;

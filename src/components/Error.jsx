
const Error = ({ children }) => {
    return (
        <div className="bg-red-500 text-white w-full text-center p-3 uppercase mb-3 font-semibold rounded-md shadow-md transition-all">
            {children}
        </div>
    );
}

export default Error;


import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
  return (
    <section className="bg-cyan-50 h-screen overflow-hidden relative">
        <div className="flex justify-center items-center h-screen ">
          <div>
            <p className="capitalize text-5xl font-semibold text-primary hover:unauthorized-text p-2 ">
              Unauthorized
            </p>
            <button onClick={()=>{navigate('/login')}} className="mt-2 hover:unauthorized-btn py-2 text-[14px] uppercase bg-slate-50 text-gray-800 font-medium border border-primary rounded-md px-2">login</button>
          </div>
        </div>
    </section>
  )
}

export default Unauthorized
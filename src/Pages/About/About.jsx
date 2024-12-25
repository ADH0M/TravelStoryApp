import { GrHome } from "react-icons/gr"


const About = () => {
  return (
    <section className="w-full z-40 h-[400vh]">
        <div className="h-[45vh] w-full overflow-hidden bg-signup-bg-img bg-cover bg-center rounded-none relative flex">
            <span className="absolute inset-0 bg-black bg-opacity-20 z-40 flex justify-center items-center"></span>
            <nav className="">
                <span>
                    <GrHome/>
                    Home
                </span>
                <span>About us</span>
            </nav>
        </div>
    </section>
  )
}

export default About
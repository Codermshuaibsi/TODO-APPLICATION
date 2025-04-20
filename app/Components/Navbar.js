import Image from "next/image"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="navbar-brand px-5 ">
            <Image className="mx-5" src="/Logo.png" width={100} height={40} alt="Todo" />
        </div>
    </nav>
  )
}

export default Navbar
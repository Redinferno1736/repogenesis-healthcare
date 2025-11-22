import Image from "next/image";
import Main from "./Main/page";
import Footer from "./Footer/page";
import Navbar from "./Navbar/page";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Main/>
      <Footer/>
    </div>
  );
}

import Navigation from "./Navigation";
import Footer from "./Footer";
import Head from "next/head";


const Layout = props => {

  return (
    <div>

      {props.children}

    </div>
  )
}

export default Layout;

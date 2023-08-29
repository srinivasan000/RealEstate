import React,{useState,useEffect} from "react";

// internal imports
import { Update1, Update2, Update3 } from "../component/Update/";
import { Header, Footer, Copyright } from "../component/";
const Update = () =>
{
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      setLoading(false);
    };
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="create-container">
      <Header />
      <Update1 title="Update Property" />
      <Update2 />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Update;

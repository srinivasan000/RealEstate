import React,{useState,useEffect} from "react";

// internal imports
import { Create1, Create2, Create3 } from "../component/Create/";
import { Header, Footer, Copyright } from "../component/";
const Create = () =>
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
      <Create1 title="Create Property" />
      <Create2 />
      <Footer />
      <Copyright />
    </div>
  );
};

export default Create;

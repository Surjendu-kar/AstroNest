import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomeCard from "../components/CustomeCard";

interface AstronautType {
  name: string;
  id: string;
  designation: string;
  name_limited: string;
  absolute_magnitude_h: number;
}

function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, []);

  if (!location.state) return null;
  const astronaut: AstronautType = location.state;
  // console.log("aa", location.state);

  return (
    <div>
      <CustomeCard astronaut={astronaut} />
    </div>
  );
}

export default Details;

import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./Home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ type }) => {

    const [list, setList] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomList = async () => {
            try {
                await axios.get(
                    `/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
                    headers: {
                        token: "Berear " + JSON.parse(localStorage.getItem("user")).accessToken,
                    }
                }
                ).then(res => setList(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        getRandomList();
    }, [genre, type]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} />
            {list.map((item, i) => (
                <List key={i} list={item} />
            ))}
        </div>
    );
};

export default Home;
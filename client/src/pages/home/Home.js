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
                        token: "Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWIwNDE1ODAyNTU3OTY4ZWFjODlhYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MjcxNjE0MiwiZXhwIjoxNjYzMTQ4MTQyfQ.hu401pMev3rUuQuMsSnUQmWbE2xh7d4S3FTntZM5-Bk"
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
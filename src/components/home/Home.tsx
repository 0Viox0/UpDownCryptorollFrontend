import { useContext, useEffect } from "react";
import {
    ApplicationContext,
    GameCoice,
} from "../../context/ApplicationContext";
import HomeBgGradient from "./homeComponents/HomeBgGradient";
import HomeHeading from "./homeComponents/HomeHeading";
import HomeCoins from "./homeComponents/HomeCoins";
import PlayNowButton from "./homeComponents/PlayNowButton";
import HomeCards from "./homeComponents/HomeCards";

const Home = () => {
    const { setCurrentGame } = useContext(ApplicationContext)!;

    useEffect(() => {
        setCurrentGame(GameCoice.None);
    }, []);

    return (
        <>
            <HomeBgGradient />
            <div className="flex 2xl:flex-row flex-col">
                <div className="2xl:w-[60%] w-full 2xl:mt-0 mt-[-90px] h-[80vh] relative">
                    <HomeHeading />
                    <HomeCoins />
                </div>
                <div className="2xl:w-[40%] w-full 2xl:h-[100vh] relative 2xl:mt-0 mt-[80px]">
                    <HomeCards />
                    <PlayNowButton />
                </div>
            </div>
        </>
    );
};

export default Home;

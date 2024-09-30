import { useContext } from "react";
import { ProfileContext } from "../../../context/ProfileContext";
import { ProfilePageType } from "../../../types/HelperTypes";
import ProfileScreen from "./infoScreenComponents/ProfileScreen";
import LanguageScreen from "./infoScreenComponents/LanguageScreen";
import HistoryScreen from "./infoScreenComponents/HistoryScreen";
import RewardsScreen from "./infoScreenComponents/RewardsScreen";

const ProfileInfoScreen = () => {
    const { currentProfilePage } = useContext(ProfileContext)!;

    const chooseScreenToRender = () => {
        switch (currentProfilePage) {
            case ProfilePageType.Profile:
                return <ProfileScreen />;
            case ProfilePageType.Language:
                return <LanguageScreen />;
            case ProfilePageType.History:
                return <HistoryScreen />;
            case ProfilePageType.Rewards:
                return <RewardsScreen />;
        }
    };

    return (
        <div
            className="w-full h-full lg:bg-[#151820] lg:border-[#999999] 
                       lg:border-[1px] rounded-[35px] lg:ml-[26px] ml-0 border-opacity-[70%]"
        >
            {chooseScreenToRender()}
        </div>
    );
};

export default ProfileInfoScreen;

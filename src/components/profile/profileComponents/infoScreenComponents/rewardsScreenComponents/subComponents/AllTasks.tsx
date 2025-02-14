import { useContext, useEffect, useState } from "react";
import {
    fetchPlayerInfo,
    fetchUserTasks,
} from "../../../../../../helperFunctions/fetchFunctions";
import { Task } from "../../../../../../types/Task";
import {
    tgLink,
    twitterLink,
    vkLink,
    landingPageUrl,
} from "../../../../../../constants";
import TaskCardLogicWrapper from "./TaskCardLogicWrapper";
import RewardToCollectPopup from "./RewardToCollectPopup";
import { ApplicationContext } from "../../../../../../context/ApplicationContext";
import LoadingIcon from "../../../../../common/LoadingIcon";
import { getCurrentUsername } from "../../../../../../helperFunctions/jwtTokenFuncions";
import { RewardTaskWithAdditionalInfo } from "../../../../../../types/RewardTaskWithAdditionalInfo";
import { useNavigate } from "react-router-dom";
import { ReferalLinkPopup } from "../../../../../../features/referralLink";

const AllTasks = () => {
    const [rewardInfo, setRewardInfo] =
        useState<RewardTaskWithAdditionalInfo>();

    const [displayClaimPopup, setDisplayClaimPopup] = useState(false);
    const [popupTaskReward, setPopupTaskReward] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const { setCurrentBalance } = useContext(ApplicationContext)!;

    const [displayReferralLinkPopup, setDisplayReferralLinkPopup] =
        useState(false);

    const updateUserTasks = () => {
        fetchUserTasks(getCurrentUsername()!).then((result) => {
            setRewardInfo(result);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        updateUserTasks();
    }, []);

    const collectReward = (task: Task) => {
        setDisplayClaimPopup(true);
        setPopupTaskReward(task.reward);
    };

    const claimButtonAction = () => {
        setDisplayClaimPopup(false);
        fetchPlayerInfo(getCurrentUsername()!).then((playerInfo) => {
            if (playerInfo) {
                setCurrentBalance(playerInfo.currentBalance);
            }
        });
        updateUserTasks();
    };

    return (
        <div
            className="flex flex-col min-[1450px]:space-y-[26px] 
                       space-y-[10px] items-center mt-[39px]"
        >
            {isLoading ? (
                <LoadingIcon width="40px" height="40px" borderWidth="8px" />
            ) : (
                rewardInfo && (
                    <>
                        <TaskCardLogicWrapper
                            task={rewardInfo.tasks[0]}
                            onClick={() => {
                                location.href = tgLink;
                            }}
                            updateUserTasks={updateUserTasks}
                            collectReward={collectReward}
                        />
                        <TaskCardLogicWrapper
                            task={rewardInfo.tasks[1]}
                            onClick={() => {
                                location.href = twitterLink;
                            }}
                            updateUserTasks={updateUserTasks}
                            collectReward={collectReward}
                        />
                        <TaskCardLogicWrapper
                            task={rewardInfo.tasks[2]}
                            onClick={() => {
                                location.href = vkLink;
                            }}
                            updateUserTasks={updateUserTasks}
                            collectReward={collectReward}
                        />
                        <TaskCardLogicWrapper
                            task={rewardInfo.tasks[3]}
                            onClick={() => setDisplayReferralLinkPopup(true)}
                            updateUserTasks={updateUserTasks}
                            collectReward={collectReward}
                            additionalInfo={rewardInfo.additionalInfo[0]}
                        />
                        <TaskCardLogicWrapper
                            task={rewardInfo.tasks[4]}
                            onClick={() => {
                                location.href = `${landingPageUrl}/whitepaper`;
                            }}
                            updateUserTasks={updateUserTasks}
                            collectReward={collectReward}
                        />
                        <TaskCardLogicWrapper
                            task={rewardInfo.tasks[5]}
                            onClick={() => {
                                navigate("/quiz");
                            }}
                            updateUserTasks={updateUserTasks}
                            collectReward={collectReward}
                        />
                    </>
                )
            )}
            <div
                className={`fixed ${displayReferralLinkPopup ? "z-[20]" : "z-[-20]"}`}
            >
                <ReferalLinkPopup
                    displayReferralLinkPopup={displayReferralLinkPopup}
                    handleOnCloseButtonClick={() =>
                        setDisplayReferralLinkPopup(false)
                    }
                />
            </div>
            ;
            <div
                className={`${displayClaimPopup ? "opacity-100 z-[20]" : "opacity-0 z-[-20]"}
                            transition-all duration-[0.2s] ease-in-out`}
            >
                <RewardToCollectPopup
                    reward={popupTaskReward}
                    claimButtonAction={claimButtonAction}
                />
            </div>
        </div>
    );
};

export default AllTasks;

import {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { ApplicationContext } from "../../../../context/ApplicationContext";
import { useTranslation } from "react-i18next";
import { assets } from "../../../../imagesImports/assets";
import {
    MainFormValidationMistakes,
    PredictionValue,
    TimeframeChoice,
} from "../../../../types/HelperTypes";
import { useTonAddress, useTonWallet } from "@tonconnect/ui-react";
import { validateFormValues } from "../../../../helperFunctions/validationFunctions";
import {
    fetchPlayerInfo,
    fetchCurrentUserMatch,
    postMatch,
} from "../../../../helperFunctions/fetchFunctions";
import BetErrors from "./errors/BetErrors";
import PredictionTimeframeErrors from "./errors/PredictionTimeframeErrors";
import PredictionValueErrors from "./errors/PredictionValueErrors";
import WaitForMatchToFinish from "./mainFormComponents/WaitForMatchToFinish";
import BetInputField from "./mainFormComponents/BetInputField";
import GuessButton from "./mainFormComponents/GuessButton";
import TimeChoiceCard from "./mainFormComponents/TimeChoiceCard";
import GradientText from "./common/GradientText";
import { Match } from "../../../../types/Match";
import CollectMatchRewardCard from "./mainFormComponents/CollectMatchRewardCard";

const GuessPriceForm = ({
    livePrice,
    currentTimeframeChoice,
    setCurrentTimeframeChoice,
    betValue,
    setBetValue,
    isCurrentlyInMatch,
    setIsCurrentlyInMatch,
    isLastMatchCollected,
    setIsLastMatchCollected,
}: {
    livePrice: number;
    currentTimeframeChoice: TimeframeChoice;
    setCurrentTimeframeChoice: Dispatch<SetStateAction<TimeframeChoice>>;
    betValue: string;
    setBetValue: Dispatch<SetStateAction<string>>;
    isCurrentlyInMatch: boolean;
    setIsCurrentlyInMatch: Dispatch<SetStateAction<boolean>>;
    isLastMatchCollected: boolean;
    setIsLastMatchCollected: Dispatch<SetStateAction<boolean>>;
}) => {
    const {
        currentBalance,
        setCurrentBalance,
        currentGame,
        setDisplayTonConnectPopup,
    } = useContext(ApplicationContext)!;

    const [predictionValue, setpredictionValue] = useState<PredictionValue>(
        PredictionValue.None,
    );
    const [validationErrors, setValidationErrors] = useState<
        MainFormValidationMistakes[]
    >([]);

    const { t } = useTranslation();
    const wallet = useTonWallet();
    const walletAddress = useTonAddress(false);

    const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

    const submitForm = async () => {
        if (wallet === null) {
            setDisplayTonConnectPopup(true);
            return;
        }

        const validErrors = validateFormValues(
            currentBalance,
            Number.parseFloat(betValue),
            currentTimeframeChoice,
            predictionValue,
        );

        setValidationErrors(validErrors);

        if (validErrors.length !== 1) {
            return;
        }

        console.log(
            "the form is valid!, sending post request for match with 15 seconds timeframe as a text",
        );

        await postMatch(
            walletAddress,
            currentGame,
            Number.parseFloat(betValue),
            currentTimeframeChoice,
            predictionValue,
        );

        fetchPlayerInfo(walletAddress).then((result) => {
            if (result) {
                setCurrentBalance(result.currentBalance);
                setIsLastMatchCollected(result.isLastMatchCollected);
            }
        });
        fetchCurrentUserMatch(walletAddress).then((result) => {
            setCurrentMatch(result);
            setIsCurrentlyInMatch(result?.id !== -1);
        });

        console.log("post request to create match has been sent");
    };

    useEffect(() => {
        if (wallet) {
            fetchPlayerInfo(walletAddress).then((result) => {
                if (result) {
                    setCurrentBalance(result.currentBalance);
                    setIsLastMatchCollected(result.isLastMatchCollected);
                }
            });
            fetchCurrentUserMatch(walletAddress).then((result) => {
                setCurrentMatch(result);
                setIsCurrentlyInMatch(result?.id !== -1);
            });
        }
    }, [wallet]);

    return (
        <div className="w-[100%] lg:h-[400px] h-[250px]">
            {isCurrentlyInMatch ? (
                <WaitForMatchToFinish
                    setCurrentMatch={setCurrentMatch}
                    setIsCurrentlyInMatch={setIsCurrentlyInMatch}
                    currentMatch={currentMatch}
                    livePrice={livePrice}
                />
            ) : !isLastMatchCollected ? (
                <CollectMatchRewardCard
                    setCurrentBalance={setCurrentBalance}
                    setIsLastMatchCollected={setIsLastMatchCollected}
                    setCurrentMatch={setCurrentMatch}
                    setIsCurrentlyInMatch={setIsCurrentlyInMatch}
                />
            ) : (
                ""
            )}
            <div className="p-[55px] space-y-[27px]">
                <div className="flex justify-between items-center relative">
                    <GradientText
                        text={t("iWantToBet")}
                        className="min-[1890px]:text-[40px] min-[1580px]:text-[30px] text-[40px]
                                   font-semibold min-[1720px]:block min-[1580px]:hidden block"
                    />
                    <GradientText
                        text={t("betMobileText")}
                        className="min-[1850px]:text-[40px] text-[30px] 
                                   font-semibold min-[1720px]:hidden min-[1580px]:block hidden"
                    />
                    <div className="relative">
                        <BetInputField
                            betValue={betValue}
                            setBetValue={setBetValue}
                        />
                        <BetErrors validationErrors={validationErrors} />
                    </div>
                    <GradientText
                        text={t("that")}
                        className="min-[1850px]:text-[40px] 
                                   min-[1580px]:text-[30px] text-[40px] font-semibold"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <GradientText
                        text={t("btcPricein")}
                        className="min-[1850px]:text-[40px] 
                                   min-[1580px]:text-[30px] text-[40px] 
                                   font-semibold flex-none"
                    />
                    <div className="relative min-[1620px]:scale-100 min-[1580px]:scale-[0.8] scale-100">
                        <TimeChoiceCard
                            currentTimeframeChoice={currentTimeframeChoice}
                            setCurrentTimeframeChoice={
                                setCurrentTimeframeChoice
                            }
                        />
                        <PredictionTimeframeErrors
                            validationErrors={validationErrors}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <GradientText
                        text={t("willGo")}
                        className="min-[1850px]:text-[40px] 
                                   min-[1580px]:text-[30px] text-[40px] 
                                   font-semibold flex-none"
                    />
                    <div className="relative">
                        <div
                            className="min-[1620px]:w-[347px] w-[auto] flex justify-between items-center
                                       min-[1620px]:scale-100 min-[1580px]:scale-[0.8] scale-100"
                        >
                            <GuessButton
                                up
                                predictionValue={predictionValue}
                                setpredictionValue={setpredictionValue}
                            />
                            <GuessButton
                                down
                                predictionValue={predictionValue}
                                setpredictionValue={setpredictionValue}
                                className="min-[1620px]:ml-0 ml-[19px]"
                            />
                        </div>
                        <PredictionValueErrors
                            validationErrors={validationErrors}
                        />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="w-[411px] h-[51px] bg-no-repeat bg-contain bg-center
                                   flex justify-center items-center hover:scale-[1.05] scale-[1]
                                   transition-all duration-[0.5] ease-in-out"
                        style={{
                            backgroundImage: `url(${assets.images.makePredictionBg})`,
                        }}
                        onClick={submitForm}
                    >
                        <GradientText
                            text={t("makePrediction")}
                            className="text-[25px] font-semibold"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GuessPriceForm;

import { fetchMatchHistory } from "../../../../../helperFunctions/fetchFunctions";
import { MatchHistoryItem } from "../../../../../types/MatchHistoryItem";
import { useEffect, useState } from "react";
import HistoryMatchRow from "./matchhistoryComponents/HistoryMatchRow";
import { useTranslation } from "react-i18next";
import HistoryMatchRowDesktop from "./matchhistoryComponents/HistoryMatchRowDesktop";
import LoadingIcon from "../../../../common/LoadingIcon";
import { getCurrentUsername } from "../../../../../helperFunctions/jwtTokenFuncions";

const ActualMatchHistory = () => {
    const [matches, setMatches] = useState<MatchHistoryItem[]>([]);
    const [offset, setOffset] = useState(0);
    const { t } = useTranslation();
    const [isEndOfHistory, setIsEndOfHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadMatches = async (offset: number) => {
        setIsLoading(true);
        fetchMatchHistory(getCurrentUsername()!, offset, 7).then((result) => {
            setMatches((prevMatches) => {
                if (prevMatches.length === prevMatches.length + result.length) {
                    setIsEndOfHistory(true);
                }

                setIsLoading(false);
                return [...prevMatches, ...result];
            });
        });
    };

    const loadMoreMatches = () => {
        setOffset((prevOffset) => prevOffset + 7);
    };

    useEffect(() => {
        loadMatches(offset);
    }, [offset]);

    return (
        <>
            <div
                className="grid grid-cols-5 gap-[6px] 2xl:gap-x-[20px]
                           lg:grid-cols-[60px_repeat(10,_1fr)] mx-[20px] mt-[34px] 
                           min-[1024px]:h-[300px] lg:hidden"
            >
                {matches.map((match) => (
                    <HistoryMatchRow match={match} key={match.id} />
                ))}
            </div>
            <div
                className="hidden grid-cols-5 gap-[6px] 2xl:gap-x-[20px]
                           lg:grid-cols-[60px_repeat(10,_1fr)] 
                           mx-[20px] mt-[34px] 
                           lg:grid w-[98%]"
            >
                {matches.map((match) => (
                    <HistoryMatchRowDesktop match={match} key={match.id} />
                ))}
            </div>
            {isLoading ? (
                <div className="w-full flex justify-center my-[22px]">
                    <LoadingIcon width="40px" height="40px" borderWidth="8px" />
                </div>
            ) : (
                <div className="w-full flex justify-center my-[22px]">
                    <button
                        className={`inline-block text-[1rem] px-[27px] py-[3px] active:scale-[1.1]
                                ${!isEndOfHistory && "buttonGrayGradient border-[1px] border-[#747474]"} 
                                rounded-[10px] upDownTextWhite font-semibold whitespace-nowrap`}
                        onClick={() => loadMoreMatches()}
                    >
                        {!isEndOfHistory ? t("loadMore") : t("endOfHistory")}
                    </button>
                </div>
            )}
        </>
    );
};

export default ActualMatchHistory;

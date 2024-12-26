import { useTranslation } from 'react-i18next';
import CheckmarkWithTextReward from './subComponents/CheckmarkWithTextReward';
import { useEffect, useRef, useState } from 'react';
import DailyRewardPopup from './subComponents/rewardTaskButtons/DailyRewardPopup';
import DailyRewardPopupDesktop from './subComponents/rewardTaskButtons/DailyRewardPopupDesktop';

const RewardsInfo = () => {
    const { t } = useTranslation();
    const [displayDailyRewardPopup, setDisplayDailyRewardPopup] =
        useState(false);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOnClick = (ev: Event) => {
            if (!divRef.current?.contains(ev.target as Node)) {
                setDisplayDailyRewardPopup(false);
            }
        };

        window.addEventListener('click', handleOnClick);
    }, []);

    return (
        <div className="flex flex-col items-start mt-[100px] space-y-[19px]">
            <div
                onClick={() => {
                    setDisplayDailyRewardPopup(true);
                }}
                className="hover:cursor-pointer inline-block relative"
                ref={divRef}
            >
                <CheckmarkWithTextReward text={t('dailyReward')} />
                <div
                    className={`absolute left-[70px] 2xl:bottom-[80px] bottom-[60px] lg:block hidden
                                 ${
                                     displayDailyRewardPopup
                                         ? 'opacity-100 z-[20]'
                                         : 'opacity-0 z-[-20]'
                                 }
                                transition-all duration-[0.2s] ease-in-out`}
                >
                    <DailyRewardPopupDesktop />
                </div>
            </div>
            <CheckmarkWithTextReward text={t('forCompletingTasks')} />
            <div className="lg:hidden block">
                <DailyRewardPopup
                    displayDailyRewardPopup={displayDailyRewardPopup}
                    setDisplayDailyRewardPopup={setDisplayDailyRewardPopup}
                />
            </div>
        </div>
    );
};

export default RewardsInfo;

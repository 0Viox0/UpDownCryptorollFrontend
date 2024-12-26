import { useTranslation } from 'react-i18next';
import DailyRewardCard from './DailyRewardCard';

const DailyRewardPopupDesktop = () => {
    const { t } = useTranslation();

    return (
        <div
            className="2xl:w-[720px] 2xl:h-[209px] w-[400px] h-[150px] UpDownDarkBlueBg 
                       border-[1px] border-[#999999] rounded-[35px]"
        >
            <div
                className="absolute w-[32px] rotate-[180deg] h-[32px] triangleDailRewardPopupOuter
                           left-[33px] bottom-[-31px] flex justify-center items-center"
            >
                <div className="triangleDailRewardPopupInner w-[30px] h-[30px]"></div>
            </div>
            <div className="text-[26px] text-[#a4a4a4] font-semibold text-center">
                {t('dailyReward')}
            </div>
            <div className="flex justify-start 2xl:px-[40px] px-[20px] 2xl:pt-[40px] pt-[10px]">
                <div className="flex justify-start space-x-[10px]">
                    <DailyRewardCard dayNumber={1} moneyReward={200} />
                    <DailyRewardCard dayNumber={2} moneyReward={260} />
                    <div className="2xl:block hidden">
                        <DailyRewardCard dayNumber={3} moneyReward={320} />
                    </div>
                    <div className="2xl:block hidden">
                        <DailyRewardCard dayNumber={4} moneyReward={380} />
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <div
                        className="2xl:text-[1.5rem] text-[1.2rem] font-semibold 
                                    text-center max-w-[255px] upDownTextWhite"
                    >
                        {t('andPlusEveryFollowing')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyRewardPopupDesktop;

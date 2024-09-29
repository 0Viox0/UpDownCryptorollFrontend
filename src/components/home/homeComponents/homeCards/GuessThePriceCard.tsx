import { useTranslation } from "react-i18next";
import { assets } from "../../../../imagesImports/assets";

const GuessThePriceCard = () => {
    const { t } = useTranslation();

    return (
        <div className="w-[303px] h-[357px] homeGradientBorder pt-[1px] px-[1px]">
            <div className="w-full h-full UpDownDarkBlueBg rounded-[51px]">
                <div className="text-[35px] text-[#a4a4a4] font-semibold text-center pt-[10px]">
                    {t("guessThePriceHomePageText")}
                </div>
                <img
                    src={assets.images.stockCardContent}
                    alt="stock"
                    className="ml-[31px]"
                />
            </div>
        </div>
    );
};

export default GuessThePriceCard;
import { createContext, Dispatch, SetStateAction } from 'react';

export const enum GameCoice {
    None,
    Btc,
    Eth,
    Ton,
}

export interface ApplicationContextInterface {
    currentGame: GameCoice;
    setCurrentGame: React.Dispatch<React.SetStateAction<GameCoice>>;
    displayLoginSignupPopup: boolean;
    setDisplayLoginSignupPopup: Dispatch<SetStateAction<boolean>>;
    currentBalance: number;
    setCurrentBalance: Dispatch<SetStateAction<number>>;
    isDarkMode: boolean;
}

export const ApplicationContext = createContext<
    ApplicationContextInterface | undefined
>({
    currentGame: GameCoice.None,
    setCurrentGame: () => {},
    displayLoginSignupPopup: false,
    setDisplayLoginSignupPopup: () => {},
    currentBalance: 0,
    setCurrentBalance: () => {},
    isDarkMode: true,
});

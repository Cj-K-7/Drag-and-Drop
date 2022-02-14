import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        textColor : string;
        hoverColor : string;
        highlightColor : string;
        bgColor : string;
        boardColor : string;
        cardColor : string;
    }
}
// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: {
        "01": string;
      };
      base: {
        white: string;
      };
      button: {
        bg: string;
      };
    };
  }
}

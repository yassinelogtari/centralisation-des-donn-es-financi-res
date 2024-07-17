export interface FrequenceSaisie {
    january: boolean;
    february: boolean;
    march: boolean;
    april: boolean;
    may: boolean;
    june: boolean;
    july: boolean;
    august: boolean;
    september: boolean;
    october: boolean;
    november: boolean;
    december: boolean;
  }
  
  export interface File {
    ref: number;
    name: string;
    details: string;
    displayPicture: string; 
    filename :string ;
    frequenceSaisie: FrequenceSaisie;
    userTypes:string
  }
  
  export interface User {
    id:number;
    email:string;
    username:string;
    mdp:string;
    role:string
    userType:string
  }
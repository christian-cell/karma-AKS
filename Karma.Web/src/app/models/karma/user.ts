export interface UserInfo {
    homeAccountId ? :  string;
    environment ? :    string;
    tenantId ? :       string;
    username ? :       string;
    localAccountId ? : string;
    name ? :           string;
    idTokenClaims ? :  IDTokenClaims;
    userRole ? :       string;
    idToken ? :        string; 
    accessToken ? :    string; 
    id_user ? :        string;
    professionalLoggedId ? : string;
    code?:                   string;  
    avatar?:                 string;   
}

export interface IDTokenClaims {
    aud ? :                string;
    iss ? :                string;
    iat ? :                number;
    nbf ? :                number;
    exp ? :                number;
    aio ? :                string;
    groups ? :             string[];
    roles ? :              string[];
    idp ? :                string;
    name ? :               string;
    nonce ? :              string;
    oid ? :                string;
    preferred_username ? : string;
    rh ? :                 string;
    sub ? :                string;
    tid ? :                string;
    uti ? :                string;
    ver ? :                string;
    wids ? :               string[];
}

/* export interface UserRes {
    id:               string;
    ojoId:            string;
    clinics:          string[];
    firstName:        string;
    lastName:         string;
    email:            string;
    documentNumber:   string;
    collegiateNumber: string;
    phoneNumber:      string;
    gender:           string;
    active:           boolean;
    role:             string;
    userCode?:        string;
    professionalClinics ? :       ProfessionalClinics[];
}

export interface ProfessionalClinics {
    clinic : { code : string , name : string , areaCode : string , areaName : string };
    collegiateNumber : string
} */
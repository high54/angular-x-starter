/**
 * Modèle de données pour un utilisateur.
 * Les propriétés sont toutes optionnel
 * @author Julien Bertacco 2019.
 */
export interface IUser {
    id?: string;
    username?: string;
    password?: string;
    rememberMe?: boolean;
    confirmedPassword?: string;
    firstName?: string;
    lastName?: string;
    civility?: string;
    givenName?: string;
    birthDate?: string;
    email?: string;
    token?: string;
    role?: string;
    createAt?: number;
    organization?: string;
    homePhone?: string;
    phoneNumber?: string;
    businessPhone?: string;
    skype?: string;
    linkedin?: string;
    twitter?: string;
    webSite?: string;
    street?: string;
    zipCode?: string;
    municipality?: string;
    country?: string;
    residence?: string;
    additionalInformation?: string;
    biography?: string;
    isActivated?: boolean;
    created?: Date;
    lastActive?: Date;
}

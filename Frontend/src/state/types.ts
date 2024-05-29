export type Id = {
  tableN: string;
  tableCd: string;
};

export type BuildInfo = {
  appVersion: string;
  appBuildDateTime: string;
  appName: string;
  appArtifactId: string;
};

export type CodeTableType = {
  id: Id;
  lastUpdtUserid: string;
  lastUpdtTs: string;
  tableN: string;
  tableE: string;
  tableCd: string;
};

export type AccountState = CodeTableType;
export type Application = CodeTableType;
export type Country = CodeTableType;
export type DashboardNotifyText = CodeTableType;
export type DashboardNotifyType = CodeTableType;
export type FunctionType = CodeTableType;
export type JurisCountry = CodeTableType;
export type JurisDiction = CodeTableType;
export type LandingFeatureMapping = {
  landingCaptions: CodeTableType[];
  landingFeatures1: CodeTableType[];
  landingFeatures2: CodeTableType[];
  landingPricing1: CodeTableType[];
  landingPricing2: CodeTableType[];
};

export type OrgType = CodeTableType;
export type OrganizationRelationship = CodeTableType;
export type OrganizationRole = CodeTableType;
export type Payees = CodeTableType;
export type PaymentOptionPayees = CodeTableType;
export type PaymentOptionsProgram = CodeTableType;
export type PaymentType = CodeTableType;
export type PinAnswerList = CodeTableType;
export type SecurityQuestion = CodeTableType;
export type Suffix = CodeTableType;
export type Title = CodeTableType;
export type Error = CodeTableType;

export type ORGANIZATION_ROLE_ID = {
  organizationRole: string;
  functionCd: string;
};
export type ORGANIZATION_ROLE_TYPE = {
  id: ORGANIZATION_ROLE_ID;
  enabledInd: string;
  visibleInd: string;
  createUserId: string;
  createTs: string;
  lastUpdtUserId: string;
  lastUpdtTs: string;
};

export type OrgRoleMapping = {
  AGENT: any;
  CONTRIBUTOR: any;
  NO_ROLE: any;
  OWNER: any;
  GUEST: any;
  NO_ORG: any;
  READER: any;
};

export type StaticProperty = {
  accountStatus: AccountState[];
  applications: Application[];
  buildInfo: BuildInfo;
  countries: Country[];
  dashboardNotifyText: DashboardNotifyText[];
  dashboardNotifyTypes: DashboardNotifyType[];
  errors: Error[];
  functionTypes: FunctionType[];
  jurisCountries: JurisCountry[];
  jurisdictions: JurisDiction[];
  landingFeatureMappings: LandingFeatureMapping;
  orgRelationshipRestrictions?: any;
  orgRoleMappings: OrgRoleMapping;
  orgTypes: OrgType[];
  organizationRelationship: OrganizationRelationship[];
  organizationRole: OrganizationRole[];
  payees: Payees[];
  paymentOptionPayees: PaymentOptionPayees[];
  paymentOptionsPrograms: PaymentOptionsProgram[];
  paymentTypes: PaymentType[];
  pinAnswerList: PinAnswerList[];
  securityQuestions: SecurityQuestion[];
  suffixes: Suffix[];
  titles: Title[];
  userid?: string;
};

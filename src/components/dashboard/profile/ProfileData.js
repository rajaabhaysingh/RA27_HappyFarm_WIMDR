import Placeholder from "../../../res/categoryScroll/placeholder.svg";

const ProfileData = {
  activeSessionId: "vgh2vc3_njUC5Ub87bt6_Bu-Urtv_B7V574c_c376v6r76",
  id: "b37463",
  plan: "free",
  prefLang: "en",
  dpUrl: null,
  fullName: null,
  email: null,
  emailVerified: 0,
  // emailVerified: 1,   verified
  // emailVerified: -1,  not verified
  // emailVerified: 0/null,  no email provided
  mobileCode: "+91",
  mobileNumber: "8879034671",
  // same as email for mobile
  mobileVerified: 1,
  address: [
    {
      addId: "3J3ENF9RE",
      name: "Suraj Kumar Prem",
      country: "India",
      state: "Andhra Pradesh",
      dist: "Chittoor",
      subDist: "Satyavedu",
      villageCity: "Sri City",
      address: "IIIT Boys Hostel, 517646",
      pin: "517646",
      contact: "+91 6394862356",
    },
    {
      addId: "3J3ENF9DS",
      name: "Raja Abhay Singh",
      country: "India",
      state: "Bihar",
      dist: "Bhagalpur",
      subDist: "Jagdishpur",
      villageCity: "Maheshpur",
      address: "Bounsi Road, 812002",
      pin: "812005",
      contact: "+91 6394862390",
    },
  ],
  // for new account/no id proof available
  idProof: null,

  // if id proof available
  // idProof: {
  //   // idProofStatus = {0: failed, 1: verified, -1: pending}
  //   idProofStatus: 0,
  //   idFileName: "DSHASGD873D_3NBQ76",
  //   idFileUrl: Placeholder,
  // },
};

export default ProfileData;

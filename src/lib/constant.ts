export const IdentityCardContract = "0x6E83054913aA6C616257Dae2e87BC44F9260EDc6"
export const GenderOptions = ["Male", "Female", "Other"];

export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "National Identity Card",
    "Passport",
    "Voter ID Card",
];

export const Doctors = [
    {
        image: "/assets/images/dr-cameron.png",
        name: "Leila Cameron",
    },
    {
        image: "/assets/images/dr-livingston.png",
        name: "David Livingston",
    },
    {
        image: "/assets/images/dr-peter.png",
        name: "Evan Peter",
    },
    {
        image: "/assets/images/dr-cruz.png",
        name: "Alyana Cruz",
    },
    {
        image: "/assets/images/dr-sharma.png",
        name: "Hardik Sharma",
    },
];

export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
};

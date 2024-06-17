import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getIDByAddress } from "@/lib/interact";

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const patientId = await getIDByAddress(userId);

    if (patientId) redirect(`/patients/${userId}/new-appointment`);

    return (
        <div className="flex min-h-screen text-white bg-black">
            <section className="remove-scrollbar container ml-10 pl-10">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">

                    <RegisterForm user={userId} />
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[390px]"
            />
        </div>
    );
};

export default Register;

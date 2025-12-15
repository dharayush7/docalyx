import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Main from "./main";
import { redirect } from "next/navigation";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (user) {
    return redirect("/");
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Main />
    </div>
  );
}

import Header from "@/components/custom/Header";
import { syncUser } from "@/lib/actions/users";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  if (user) await syncUser();

  return (
    <div>
      <Header />
    </div>
  );
}

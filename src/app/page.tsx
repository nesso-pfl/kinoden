import { Metadata } from "next";

export const metadata: Metadata = {
  title: "トップ | Kinoden Pfl",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      イベントスケジュールを表示したりする予定です
    </main>
  );
}

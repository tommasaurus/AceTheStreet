export default function BanksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto px-6 pl-[64px]">{children}</div>;
}

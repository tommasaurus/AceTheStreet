export default function M_and_I_Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-6 pl-[64px] pt-4">{children}</div>
  );
}

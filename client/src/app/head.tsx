export default function Head() {
  const base = process.env.KINDE_SITE_URL ?? "http://localhost:3000";
  return (
    <>
      <meta charSet="utf-8" />
      <link rel="canonical" href={base} />
    </>
  );
}

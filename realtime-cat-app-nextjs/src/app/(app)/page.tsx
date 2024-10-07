import "../globals.css";

export default function Home() {
  return (
    <div>{process.env.CHECK_ENV}</div>
  );
}

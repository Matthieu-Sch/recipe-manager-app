import Button from "../components/Button";

export default function Header() {
  return (
    <div className="bg-slate-800 py-4 px-10">
      <nav>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-white">Recipe Manager</div>
          </div>
          <div className="w-[25%] flex justify-between">
            <Button content="Identifiez-vous" />
            <Button content="Connectez-vous" />
          </div>
        </div>
      </nav>
    </div>
  );
}

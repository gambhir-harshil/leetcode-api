import { FaXmark } from "react-icons/fa6";

type MenuProps = {
  closeMenu: () => void;
};

export default function MobileMenu({ closeMenu }: MenuProps) {
  return (
    <div className="fixed z-10 top-0 right-0 w-full backdrop-blur p-5 lg:max-w-[400px] h-full">
      <FaXmark className="float-right text-2xl" onClick={() => closeMenu()} />

      <ul className="w-full text-center pt-[5rem] [&>*]:py-5 [&>*]:text-2xl [&>*]:font-bold">
        <li className="hover:font-extrabold">Home</li>
        <li className="hover:font-extrabold">Roadmap</li>
        <li className="hover:font-extrabold">Leaderboard</li>
      </ul>
    </div>
  );
}

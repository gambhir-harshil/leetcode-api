import BoxContainer from "../BoxContainer";

export default function HomePageLevel() {
  return (
    <div>
      <BoxContainer className="bg-[#8075ff] shadow-lg text-white">
        <p className="font-bold text-base">Level 23 awaits you...</p>
        <p className="text-[#ebe9ff]">
          Longest Common Prefix: This one should not be difficult for you Yash!
          34% of the participants have already solved this!
        </p>
        <button className="text-[#8075ff] bg-white px-4 py-2 rounded-md w-fit hover:bg-[#eae8ff] mt-2">
          Solve now
        </button>
      </BoxContainer>
    </div>
  );
}

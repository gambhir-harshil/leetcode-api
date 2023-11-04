import Image from "next/image";
import BoxContainer from "../BoxContainer";

type PostBoxProps = {
  img: string;
  title: string;
  author: string;
  date: string;
};

function PostBox({ img, title, author, date }: PostBoxProps) {
  return (
    <div className="p-3 bg-[#eaebff] rounded my-3 cursor-pointer hover:opacity-90">
      <div className="relative w-full h-[128px] mb-3">
        <Image
          src={`/imgs/${img}.png`}
          fill={true}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mPcUg8AAe0BNUeV1/kAAAAASUVORK5CYII="
          alt="blog post image 1"
        />
      </div>
      <p className="text-darkgray text-base font-bold">{title}</p>
      <p className="text-lightgray font-thin text-sm">
        by {author}, {date}
      </p>
    </div>
  );
}

export default function HomePageBlogWrapper() {
  return (
    <BoxContainer className="shadow-fill">
      <p className="text-darkgray text-base font-bold">
        Latest in the community 🗞️{" "}
      </p>
      <div>
        <PostBox
          img="postimg1"
          title="New developments in robotics industry will decide the new stack"
          author="Nedu"
          date="07th Sept 2023"
        />
        <PostBox
          img="postimg2"
          title="Why I have an AI girlfriend and you should have one too"
          author="Nico"
          date="05th Sept 2023"
        />
      </div>
    </BoxContainer>
  );
}

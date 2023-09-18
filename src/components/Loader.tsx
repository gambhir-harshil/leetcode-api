import ClipLoader from "react-spinners/ClipLoader";

type LoaderProps = {
  size?: number;
  color?: string;
};

export default function Loader({ size, color }: LoaderProps) {
  return <ClipLoader size={size} color={color} />;
}

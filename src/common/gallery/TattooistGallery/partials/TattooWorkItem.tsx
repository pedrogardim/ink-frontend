import type { TattooWork } from "@/types/tattoowork";

interface TattooWorkItemProps {
  tattooWork: TattooWork;
  selected?: boolean;
  onClick?: () => void;
}

const TattooWorkItem = ({ tattooWork, onClick }: TattooWorkItemProps) => {
  const { imageUrl } = tattooWork;
  return (
    <div
      onClick={onClick}
      className="aspect-square bg-base-300 bg-center bg-cover hover:brightness-75 transition cursor-pointer"
      style={{
        ...{ backgroundImage: `url(${imageUrl})` },
      }}
    ></div>
  );
};

export default TattooWorkItem;

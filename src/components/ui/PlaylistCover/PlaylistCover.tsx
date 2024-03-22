import { MusicIcon, StarIconSolid } from "../icons/flowbite";

interface PlaylistCoverProps {
  variant?: "music" | "star";
}

const PlaylistCover: React.FC<PlaylistCoverProps> = ({ variant = "music" }) => (
  <div className="bg-shark w-64 h-64 rounded-lg mb-2 mr-4">
    <div className="flex justify-center items-center h-full">
      {variant === "music" ? (
        <MusicIcon />
      ) : (
        <StarIconSolid size={"w-36 h-36"} />
      )}
    </div>
  </div>
);

export default PlaylistCover;

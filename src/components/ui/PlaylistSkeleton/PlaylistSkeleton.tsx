import PlaylistComponents from "../PlaylistComponents/PlaylistComponents";
import PlaylistCover from "../PlaylistCover/PlaylistCover";

const { Playlist, PlaylistHeader, PlaylistInfo, Type, Title, Artist } =
  PlaylistComponents;

const PlaylistSkeleton: React.FC = () => {
  return (
    <div
      role="status"
      className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
    >
      <Playlist>
        <PlaylistHeader>
          <PlaylistCover />
          <PlaylistInfo>
            <Type>
              <div className="h-6 bg-shark rounded-md w-24"></div>
            </Type>
            <Title>
              <div className="h-10 bg-shark rounded-lg w-96"></div>
            </Title>
            <Artist>
              <div className="h-8 bg-shark rounded-lg w-64"></div>
            </Artist>
            <div>
              <div className="h-2.5 bg-shark rounded-md w-80 mb-2"></div>
              <div className="h-2.5 bg-shark rounded-md w-96 mb-2"></div>
              <div className="h-2.5 bg-shark rounded-md w-72 mb-2"></div>
              <div className="h-2.5 bg-shark rounded-md w-48"></div>
            </div>
          </PlaylistInfo>
        </PlaylistHeader>
      </Playlist>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default PlaylistSkeleton;

import React from "react";

const PlaylistHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex gap-4 flex-col lg:flex-row">{children}</div>;

const PlaylistInfo: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-col gap-4">{children}</div>;

const Type: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="font-extrabold text-md text-silver-400 uppercase">
    {children}
  </div>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl font-black">{children}</h2>
);

const Artist: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-green font-medium text-2xl">{children}</div>
);

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-silver-400 w-full lg:w-96 overflow-hidden">
    <div
      className="line-clamp-4"
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  </div>
);

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className="table-fixed w-full text-sm mt-4">
    <thead>
      <tr className="text-left">
        <th className="w-4/5 lg:w-4/12 py-2">Song</th>
        <th className="w-3/12 py-2 hidden lg:table-cell">Artist</th>
        <th className="w-3/12 py-2 hidden lg:table-cell">Album</th>
        <th className="w-1/5 lg:w-1/12 py-2">Duration</th>
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

const SongCount: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="font-bold text-silver-400 text-sm py-4">{children}</div>
);

const Playlist: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="mt-4">
      {React.Children.map(children, (child) =>
        child ? React.cloneElement(child as React.ReactElement<any>, {}) : null
      )}
    </div>
  );
};

const PlaylistComponents = {
  Playlist,
  PlaylistHeader,
  PlaylistInfo,
  Type,
  Title,
  Artist,
  Description,
  Table,
  SongCount,
};

export default PlaylistComponents;

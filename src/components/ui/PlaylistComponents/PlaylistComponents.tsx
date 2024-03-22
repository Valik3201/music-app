import React from "react";

const PlaylistHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex gap-4 flex-col lg:flex-row">{children}</div>;

const PlaylistInfo: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-col gap-4">{children}</div>;

const Type: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-extrabold text-md text-silver-400 uppercase">{children}</p>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl font-black">{children}</h2>
);

const Artist: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-green font-medium text-2xl">{children}</p>
);

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-silver-400 w-96">{children}</p>
);

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <table className="table-fixed w-full text-sm mt-4">
    <thead>
      <tr className="text-left">
        <th className="w-4/12 py-2">Song</th>
        <th className="w-3/12 py-2">Artist</th>
        <th className="w-3/12 py-2">Album</th>
        <th className="w-1/12 py-2 text-center ">Duration</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-silver-900">{children}</tbody>
  </table>
);

const SongCount: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-bold text-silver-400 text-sm py-4">{children}</p>
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

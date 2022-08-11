CREATE TABLE Albums(
  AlbumId SERIAL PRIMARY KEY,
  Title VARCHAR(255) UNIQUE NOT NULL,
  CoverPhotoPath TEXT NOT NULL,
  TypeId INT NOT NULL,
  DateCreated DATE NOT NULL,
  Description TEXT NOT NULL
);


CREATE TABLE Contributors(
  ContributorId SERIAL PRIMARY KEY,
  ContributorName VARCHAR(255) NOT NULL,
  ContributorLink TEXT,
  UNIQUE(ContributorName,  ContributorLink)
);

CREATE TABLE Roles(
  RoleId SERIAL PRIMARY KEY,
  Role VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE AlbumsContributorsRoles(
  contributionId SERIAL PRIMARY KEY,
  AlbumId INT NOT NULL,
  ContributorId INT NOT NULL,
  RoleId INT NOT NULL,
  FOREIGN KEY(AlbumId) REFERENCES Albums(AlbumId),
  FOREIGN KEY(ContributorId) REFERENCES Contributors(ContributorId),
  FOREIGN KEY(RoleId) REFERENCES Roles(RoleId)
);

CREATE TABLE Booking(
  BookingId SERIAL PRIMARY KEY,
  ClientName VARCHAR(255) NOT NULL,
  ClientPhoneNumber VARCHAR(255) NOT NULL,
  ClientEmail VARCHAR(255) NOT NULL,
  SessionTypeId INT,
  BookingDate DATE NOT NULL,
  Note VARCHAR(500),
  Handled BOOLEAN DEFAULT FALSE
);

-- CREATE TABLE Cart(
--   ItemId SERIAL PRIMARY KEY,
--   ItemType VARCHAR(255) NOT NULL,
--   Price INT NOT NULL
-- )
-- CREATE TABLE AlbumTypes(
--   TypeId SERIAL PRIMARY KEY,
--   Type varchar(255) UNIQUE NOT NULL
-- );
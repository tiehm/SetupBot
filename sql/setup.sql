CREATE DATABASE setups;
USE setups;

CREATE TABLE setups (
  name VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  time VARCHAR(100) DEFAULT 'Unknown' NOT NULL,
  roles JSON NOT NULL,
  channelText JSON NOT NULL,
  channelVoice JSON NOT NULL,
  channelCategory JSON NOT NULL,
  totalItems INT NOT NULL
);

CREATE TABLE watch (
  name VARCHAR(100) NOT NULL,
  total INT NOT NULL DEFAULT 0,
  roles INT NOT NULL DEFAULT 0,
  channels INT NOT NULL DEFAULT 0,
  guilds INT NOT NULL DEFAULT 0
);

DROP DATABASE setups;
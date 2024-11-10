function createSounds(overwrite: any = {}) {
  return {
    settings: {
      preload: true,
      volume: 0.5,
      ...overwrite.settings,
    },
    players: {
      ...overwrite.players,
    },
  };
}

export { createSounds };

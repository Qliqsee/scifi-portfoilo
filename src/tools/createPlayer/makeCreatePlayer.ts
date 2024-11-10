// TODO: type

interface IMakeCreatePlayerArgs {
  Howl:any
}

function makeCreatePlayer ({ Howl }:IMakeCreatePlayerArgs) {
  return function createPlayer (settings:any) {
    const player = new Howl(settings);

    const play = player.play.bind(player);
    let lastPlay:any;

    player.play = function (...args:any) {
      if (lastPlay) {
        this.stop(lastPlay);
      }
      lastPlay = play(...args);
      return lastPlay;
    };

    return player;
  };
}

export { makeCreatePlayer };

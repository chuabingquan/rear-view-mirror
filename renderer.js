const {
  desktopCapturer,
  remote
} = require('electron');

const init = async () => {
  const sourceTypes = ['screen'];

  const userMediaProperties = {
    fetchWindowIcons: false,
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        minWidth: window.innerWidth,
        maxWidth: window.innerWidth,
        minHeight: window.innerHeight,
        maxHeight: window.innerHeight * 5,
      }
    },
  };

  try {
    let warningContainer = document.getElementById('warning-container');
    let panel = document.getElementById('panel');

    const sources = await desktopCapturer.getSources({
      types: sourceTypes
    });
    if (sources.length === 1) {
      warningContainer.classList.remove('hide');
      warningContainer.classList.add('flex')
      panel.classList.remove('flex');
      panel.classList.add('hide');
    } else {
      warningContainer.classList.add('hide');
      warningContainer.classList.remove('flex');
      panel.classList.remove('hide');
      panel.classList.add('flex');

      for (let i = 1; i < sources.length; i++) {
        const properties = userMediaProperties;
        properties.video.mandatory.chromeMediaSourceId = sources[i].id;

        const stream = await navigator.mediaDevices.getUserMedia(properties);

        handleStream(stream);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

const handleStream = (stream) => {
  const video = document.createElement("video");
  video.classList = ['stream'];
  video.srcObject = stream;
  document.getElementById('panel').appendChild(video);
  video.onloadedmetadata = e => video.play();
}

init();
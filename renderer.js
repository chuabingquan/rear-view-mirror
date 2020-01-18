const { desktopCapturer } = require('electron');

const init = async () => {
  console.log('running');
  const sourceTypes = ['window', 'screen'];
  const userMediaProperties = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 720,
        maxHeight: 720
      }
    },
  };

  try {
    const sources = await desktopCapturer.getSources({ types: sourceTypes });
    // for (const source of sources) {
    //   if (source.name === 'Electron') {
    //     const properties = userMediaProperties;
    //     properties.chromeMediaSourceId = source.id;

    //     const stream = await navigator.mediaDevices.getUserMedia(properties);

    //     handleStream(stream);
    //   }
    // }
    const properties = userMediaProperties;
    properties.chromeMediaSourceId = sources[0].id;

    const stream = await navigator.mediaDevices.getUserMedia(properties);

    handleStream(stream);
  } catch (err) {
    console.log(err);
  }
}

const handleStream = (stream) => {
  const video = document.getElementById('#video');
  video.srcObject = stream;
  video.onloadedmetadata = e => video.play();
}

init();
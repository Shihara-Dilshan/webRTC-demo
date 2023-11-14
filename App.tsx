import React, {useState} from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {mediaDevices, MediaStream, RTCView} from 'react-native-webrtc';

const App = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  const start = async () => {
    if (!localStream) {
      let localMediaStream: MediaStream;
      try {
        localMediaStream = await mediaDevices.getUserMedia({video: true});
        setLocalStream(localMediaStream);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stop = () => {
    localStream?.release();
    setLocalStream(null);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {localStream && (
        <RTCView streamURL={localStream.toURL()} style={{flex: 1}} />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          paddingHorizontal: 5,
        }}>
        <Button title="Start" onPress={start} />
        <Button title="Stop" onPress={stop} />
      </View>
    </SafeAreaView>
  );
};

export default App;

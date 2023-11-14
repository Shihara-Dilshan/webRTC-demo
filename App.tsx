import React, {useState} from 'react';
import {Button, SafeAreaView, View, StatusBar} from 'react-native';
import {mediaDevices, MediaStream, RTCView} from 'react-native-webrtc';

const App = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [clientStream, setClientStream] = useState<MediaStream | null>(null);

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
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        {localStream && (
          <RTCView streamURL={localStream.toURL()} style={{flex: 1}} />
        )}
        <View>
          <Button title="Start" onPress={start} />
          <Button title="Stop" onPress={stop} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;

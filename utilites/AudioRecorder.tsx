import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import Sound from 'react-native-nitro-sound';

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [audioPath, setAudioPath] = useState<string | null>(null);

  const permissionTake = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        return Object.values(grants).every(
          (val) => val === PermissionsAndroid.RESULTS.GRANTED,
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const onStartRecord = async () => {
    const ok = await permissionTake();
    if (!ok) return;
    setIsLoading(true);
    try {
      await Sound.startRecorder();
      Sound.addRecordBackListener((e) => {
        setRecordTime(Sound.mmssss(Math.floor(e.currentPosition)));
      });
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onStopRecord = async () => {
    setIsLoading(true);
    try {
      const result = await Sound.stopRecorder();
      Sound.removeRecordBackListener();
      setIsRecording(false);
      setAudioPath(result); // save file path for playback
      console.log('Recorded file:', result);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onPlay = async () => {
    if (!audioPath) return;
    try {
      await Sound.startPlayer(audioPath);
      Sound.addPlayBackListener((e) => {
        if (e.currentPosition >= e.duration) {
          Sound.stopPlayer();
          Sound.removePlayBackListener();
        }
        return;
      });
    } catch (err) {
      console.error('Playback failed:', err);
    }
  };

  return (
    <View>
      <Text>{recordTime}</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? onStopRecord : onStartRecord}
        disabled={isLoading}
      />
      {isLoading && <ActivityIndicator />}
      {audioPath && (
        <Button title="Play Recording" onPress={onPlay} />
      )}
    </View>
  );
};

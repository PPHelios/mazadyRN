import React from 'react';
import { View, Platform } from 'react-native';
import { launchCamera, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';

import useScreenSize from '@/helpers/useScreenSize';
import { ImageData } from '@/types/types';
import { Text } from './ui/text';
import { Button, ButtonIcon, ButtonText } from './ui/button';
import { Image } from 'react-native';
import { Camera } from 'lucide-react-native';
import { FormControl, FormControlLabel, FormControlLabelText } from './ui/form-control';
import Toast from 'react-native-toast-message';

const maxSize = 8 * 1024 * 1024; // 5 MB (maximum allowed size)
const minSize = 10 * 1024;

type Props = {
  images: ImageData[];
  setImages: (x: ImageData[]) => void;
  setError: (x: string) => void;
  loading: boolean;
  setPicsEdited?: (x: boolean) => void;
};
const ImagesUploader = ({ images, setImages, setError, loading }: Props) => {
  const { width, height } = useScreenSize();
  const factor = height / (width / 40); //65
  const SIZE = ((width / 100) * factor) / 3;
  const listWidth = width * 0.95;

  const openImagePicker = () => {
    launchImageLibrary(actions[1].options, (response) => {
      console.log({ response });
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        setError('');
        const acceptedPics: any[] = [];
        const assets = response.assets as ImageData[];
        const startIndex = images.length;
        const uniqueImages: ImageData[] = filterArray(images, assets);
        // console.log({uniqueImages});
        uniqueImages.map((file, index) => {
          const fileSize = file?.fileSize;
          if (fileSize && fileSize > maxSize) {
            // Toast.show({
            //   type: 'info',
            //   text1: t('formErrors.picMaxSizeExceededRemoved'),
            // });
            setError('picMaxSizeExceededRemoved');
            return;
          }
          if (fileSize && fileSize < minSize) {
            // Toast.show({
            //   type: 'info',
            //   text1: t('formErrors.picMinSizeExceededRemoved'),
            // });
            setError('picMinSizeExceededRemoved');
            return;
          }

          acceptedPics.push({
            ...file,
            key: index + startIndex,
          });
        });
        // console.log({acceptedPics});
        const filesLength = acceptedPics.length + images.length;
        if (filesLength > 15) {
          setError('picsMax 15');
          // Toast.show({
          //   type: 'error',
          //   text1: t('formErrors.picsMax', {val: 15}),
          // });
          return;
        } else if (filesLength < 3) {
          setError('picsMax 15');
          // Toast.show({
          //   type: 'error',
          //   text1: t('formErrors.picsMin', {val: 3}),
          // });
          return;
        } else {
          setImages([...acceptedPics, ...images] as ImageData[]);
        }
      }
    });
  };
  const openCamera = () => {
    launchCamera(actions[0].options, (response) => {
      console.log({ response });
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        setError('');
        const acceptedPics: any[] = [];
        const assets = response.assets as ImageData[];
        const startIndex = images.length;
        const uniqueImages: ImageData[] = filterArray(images, assets);
        // console.log({uniqueImages});
        uniqueImages.map((file, index) => {
          const fileSize = file?.fileSize;
          if (fileSize && fileSize > maxSize) {
            Toast.show({
              type: 'info',
              text1: 'picMaxSizeExceededRemoved',
            });
            setError('picMaxSizeExceededRemoved');
            return;
          }
          if (fileSize && fileSize < minSize) {
            Toast.show({
              type: 'info',
              text1: 'picMinSizeExceededRemoved',
            });
            setError('picMinSizeExceededRemoved');
            return;
          }

          acceptedPics.push({
            ...file,
            key: index + startIndex,
          });
        });
        // console.log({acceptedPics});
        const filesLength = acceptedPics.length + images.length;
        if (filesLength > 15) {
          setError('picsMax 15');
          Toast.show({
            type: 'error',
            text1: 'picsMax 15',
          });
          return;
        } else {
          setImages([...acceptedPics, ...images] as ImageData[]);
        }
      }
    });
  };
  return (
    <View className="w-full">
      <FormControl>
        <FormControlLabel className="mb-1">
          <FormControlLabelText>Pick item images</FormControlLabelText>
        </FormControlLabel>
      </FormControl>
      <View
        style={{ marginTop: 8, marginBottom: 80 }}
        className="flex-row justify-center items-center gap-4"
      >
        <Button className="w-[150] h-16" disabled={loading} onPress={openImagePicker}>
          <ButtonText>Pick images</ButtonText>
        </Button>
        <Button className="h-16" disabled={loading} onPress={openCamera}>
          <ButtonIcon as={Camera} />
        </Button>
      </View>
      <View style={{ flexWrap: 'wrap' }} className="flex-row justify-center items-center gap-2">
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image?.uri }} style={{ width: SIZE, height: SIZE }} />
        ))}
      </View>
    </View>
  );
};

// Your actions array
interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImageLibraryOptions;
}

const includeExtra = true;

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      // saveToPhotos: true,
      selectionLimit: 15,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 15,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      // saveToPhotos: true,
      formatAsMp4: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      formatAsMp4: true,
      includeExtra,
    },
  },
  {
    title: 'Select Image or Video\n(mixed)',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];

if (Platform.OS === 'ios') {
  actions.push({
    title: 'Take Image or Video\n(mixed)',
    type: 'capture',
    options: {
      // saveToPhotos: true,
      mediaType: 'mixed',
      includeExtra,
      presentationStyle: 'fullScreen',
    },
  });
}

const filterArray = (arr2: ImageData[], arr1: ImageData[]) => {
  if (arr2.length === 0) {
    return arr1;
  }
  return arr1.filter((obj) => {
    // Keep objects where the "id" is not present in objectsArray1
    return !arr2.some((o) => o.id === obj.id);
  });
};
export default ImagesUploader;

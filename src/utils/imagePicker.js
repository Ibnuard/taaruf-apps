import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = {
    mediaType: 'photo',
    quality: .8,
    includeBase64: true
}

const LaunchCamera = async () => {

    const result = await launchCamera(options);

    if (result) {
        return result?.assets[0]?.base64
    }
}

const LaunchGallery = async () => {

    const result = await launchImageLibrary(options);

    if (result) {
        return result?.assets[0]?.base64
    }
}

export { LaunchCamera, LaunchGallery }
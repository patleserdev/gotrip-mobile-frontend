import { TouchableOpacity } from 'react-native';
import { launchCamera, CameraOptions, CameraType } from 'react-native-image-picker';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import { ThemedText } from './ThemedText';
import ExpoCamera from './CameraExpo';



export default function AddFeatures(){


    const handleCamera=()=>{
            const options: CameraOptions = {
              mediaType: 'photo',
              cameraType: 'back', // Erreur ici
              saveToPhotos: true,
            };
          
            launchCamera(options, (response) => {
              if (response.didCancel) {
                console.log('L’utilisateur a annulé');
              } else if (response.errorCode) {
                console.error('Erreur:', response.errorMessage);
              } else {
                console.log('Image capturée:', response.assets?.[0]);
              }
            });
          };

    const handleGallery=()=>{

        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1, // ou 0 pour illimité
          };
        
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('L’utilisateur a annulé la sélection');
            } else if (response.errorCode) {
              console.error('Erreur:', response.errorMessage);
            } else {
              const image: Asset | undefined = response.assets?.[0];
              if (image) {
                console.log('Image sélectionnée :', image.uri);
                // Tu peux ensuite stocker l'URI ou l'afficher dans ton interface
              }
            }
          });;

    }

    return (


        <>
        <TouchableOpacity onPress={()=>handleCamera()}><ThemedText style={{color:"#000000"}}>Prendre une photo</ThemedText> </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleGallery()}><ThemedText style={{color:"#000000"}}>Ajouter une photo de la galerie</ThemedText></TouchableOpacity>

<ExpoCamera/>
        </>
    )
}
import { Image, StyleSheet, Platform, Button, TextInput, KeyboardAvoidingView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useFocusEffect } from 'expo-router';
import { Link } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const handleForgotPassword=()=>{ router.replace('/(tabs)/explore');}

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/gotrip-logo.jpg')}
          style={styles.logo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Mot de passe oublié !</ThemedText>
        
      </ThemedView>

      <ThemedView style={styles.welcomeContainer}>
        <ThemedText type="subtitle">Vous ne retrouver pas votre mot de passe ?</ThemedText>
        <ThemedText>
          Saisissez votre adresse mail, si celle-ci est valide , vous recevrez un lien de réinitialisation
        </ThemedText>

        <ThemedText>
         Votre adresse mail :
        </ThemedText>
        <KeyboardAvoidingView>
        <TextInput style={{borderWidth:1,borderColor:'#28A046',marginVertical:10  }}></TextInput>
      
      <ThemedView style={styles.buttonContainer}>
        <Button color="#28A046" onPress={()=>handleForgotPassword()} title="Demander la réinitialisation"/>
      </ThemedView>
      </KeyboardAvoidingView>
      </ThemedView>

      

       
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  welcomeContainer: {
    gap: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 20,
  },
  groupbuttonContainer: {
    gap: 8,
    marginTop:8,
    marginBottom: 8,
  },
  logo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

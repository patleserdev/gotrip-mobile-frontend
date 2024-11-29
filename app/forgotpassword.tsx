import { Image, StyleSheet, Platform, Button, TextInput, KeyboardAvoidingView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useFocusEffect } from 'expo-router';
import { Link } from '@react-navigation/native';
import Separator from '@/components/Separator';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const handleForgotPassword=()=>{ router.push('/');}

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
        <TextInput keyboardType="email-address" style={{borderWidth:1,borderColor:'#deb140',marginVertical:10  }}></TextInput>
      
        <ThemedView style={styles.groupbuttonContainer}>
      <ThemedView style={styles.buttonContainer}>
        <Button color="#deb140" onPress={()=>handleForgotPassword()} title="Demander la réinitialisation"/>
      </ThemedView>

      <Separator/>

      <ThemedView style={styles.buttonContainer}>
        <Button color="#28A046" onPress={()=>router.push('/')} title="Retour sur le site"/>
      </ThemedView>
      </ThemedView>

      </KeyboardAvoidingView>
      </ThemedView>

      
      

       
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
  },
  welcomeContainer: {
    paddingHorizontal: 32,
    gap: 8,
    marginBottom: 8,
    paddingBottom: 32,
  },
  buttonContainer: {
    gap: 8,
    marginBottom: 20,
  },
  groupbuttonContainer: {
    paddingHorizontal: 32,
    paddingVertical: 50,
    gap: 32,
  },
  logo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

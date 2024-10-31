import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const pickImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Actualiza aquí para usar el nuevo formato de respuesta
    }
  };

  const pickImageFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Actualiza aquí para usar el nuevo formato de respuesta
    }
  };

  const handleSubmit = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    Alert.alert('Éxito', 'Usuario registrado correctamente');
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        
        <TouchableOpacity onPress={pickImageGaleria}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Sharing.shareAsync(imageUri)} style={styles.button3}>
          <Text style={styles.buttontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={pickImageFoto}>
          <Text style={styles.buttontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
            value={username} 
            onChangeText={setUsername} 
          />

          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttontext}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' },
  subcontainer2: { marginTop: 25, marginBottom: 15 },
  subcontainer: { borderColor: '#294AEC', backgroundColor: '#1E1E1F', borderWidth: 2, alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: 50 },
  title: { fontSize: 20, fontFamily: 'Courier', fontWeight: '500', color: '#E0FFFF' },
  subtitle: { fontSize: 14, fontFamily: 'monospace', color: '#87CEFA' },
  image: { height: 180, width: 180, borderRadius: 5, marginBottom: 15, marginTop: 25, borderColor: '#294AEC', borderWidth: 3 },
  input: { padding: 5, height: 40, width: 200, borderRadius: 5, backgroundColor: '#FFFFFF', color: '#000000', marginTop: 5, marginBottom: 10, borderColor: '#5975FE', borderWidth: 2 },
  button: { height: 30, width: 90, backgroundColor: '#191970', borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  button2: { height: 30, width: 120, color:'#FFFFFF', backgroundColor: '#191970', borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  button3: { padding: 5, marginBottom: 10, height: 30, width: 90, backgroundColor: '#191970', borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  buttontext: { color: '#E0FFFF', fontSize: 12, justifyContent: 'center' }
});

export default App;
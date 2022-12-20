import { AppRegistry, Platform, UIManager } from 'react-native';
import { name as appName } from './app.json';
import HomeScreen from './src/screens/HomeScreen';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

AppRegistry.registerComponent(appName, () => HomeScreen);

import { NativeModules, Platform } from 'react-native';
export const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier;
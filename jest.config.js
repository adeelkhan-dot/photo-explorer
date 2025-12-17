module.exports = {
 preset: 'jest-expo',
 setupFiles: ['<rootDir>/jest.setup.js'],
 setupFilesAfterEnv: [],
 transformIgnorePatterns: [
   'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
 ],
 collectCoverageFrom: [
   'src/**/*.{ts,tsx}',
   '!src/**/*.d.ts',
   '!src/**/*.stories.{ts,tsx}',
 ],
 moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
 testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};






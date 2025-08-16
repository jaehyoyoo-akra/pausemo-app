module.exports = {
  project: {
    android: {
      packageName: 'com.akra.pausemo',
    },
  },
  dependencies: {
    'react-native-safe-area-context': {
      platforms: {
        android: {
          packageImportPath: 'import com.th3rdwave.safeareacontext.SafeAreaContextPackage;',
        },
      },
    },
  },
};

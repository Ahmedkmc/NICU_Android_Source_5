# Implementation Plan - Fix Gradle Resolution and Warnings

The goal is to resolve the `Failed to resolve: project :capacitor-android` error and clean up the `flatDir` deprecation warnings in the Gradle build files.

## User Review Required

> [!IMPORTANT]
> The error `Failed to resolve: project :capacitor-android` is caused by the missing `node_modules` directory in the project's parent folder. This directory contains the Capacitor Android library. You must run `npm install` in the web project root to restore these files.

## Proposed Changes

### Gradle Configuration Cleanup

#### [MODIFY] [app/build.gradle](file:///C:/Users/hp/Downloads/Compressed/NICU_Android_Source_5/android/app/build.gradle)
- Replace the `flatDir` repository with a more modern approach using `files()` for local libraries to eliminate the deprecation warning.
- Ensure the `:capacitor-android` dependency is correctly defined (it already is, but it depends on the missing files).

#### [MODIFY] [capacitor-cordova-android-plugins/build.gradle](file:///C:/Users/hp/Downloads/Compressed/NICU_Android_Source_5/android/capacitor-cordova-android-plugins/build.gradle)
- Replace the `flatDir` repository with `maven` local repository or `files()` to eliminate the deprecation warning.

## Verification Plan

### Automated Tests
- Run `./gradlew assembleDebug` to verify that the build succeeds once `node_modules` are restored.
- Run `gradle_sync` to verify that the `flatDir` warning is gone.

### Manual Verification
1. User must run `npm install` in the root directory: `C:/Users/hp/Downloads/Compressed/NICU_Android_Source_5/`.
2. User must run `npx cap sync android` to ensure all Capacitor dependencies are linked.
3. Sync the project in Android Studio.

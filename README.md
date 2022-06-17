# Home Grower

<p>Engineering project of students at Adam Mickiewicz University Faculty of Mathematics and Computer Science.</p>

### Our Jira:

<p>https://wikbos.atlassian.net/jira/software/projects/EN/boards/1/backlog</p>

### Authors

- Bosiacka Wiktoria
- Roszyk Aleks
- Wojciechowska Agata
- Rebelski Gabriel

## Windows environment configuration

### install Java

https://www.java.com/en/download/help/windows_manual_download.html

### Java in environment variables

Make sure, that you have JAVA_HOME in your environment variables

1. Search for "environment variables" (PL: "zmienne środowiskowe") in Windows menu and choose: "edit environment variables" (PL: "Edytuj zmienne środowiskowe systemu")
2. Find and click "environment variables..." (PL: "zmienne środowiskowe...") button
3. On "system variables" (PL: "Zmienne systemowe") find or add "**JAVA_HOME**" with appriopriet value (for example in my case: "C:\Program Files\Java\jre1.8.0_331")

### Android in environment variables

Make sure that u have Android Studio installed

in "user variables" (PL:"Zmienne użytkownika") from previous point ("Java in environment variables") find or add "**ANDROID_HOME**" with appriopret value (for example in my case: "C:\Users\MyUsername\AppData\Local\Android\Sdk")

### platform tools in environment variables

in "user variables" (PL:"Zmienne użytkownika") from previous points find or add "**PLATFORM_TOOLS**" with appriopriet value (for example in my case: "C:\Users\MyUsername\AppData\Local\Android\Sdk\platform-tools")

### other configurations

make sure that you have **npm** installed

go into folder of this project

#### Node & Watchman

> brew install node
>
> brew install watchman

#### get react native

> npm install --save react-native

#### get React Native Simple Toast

> npm install react-native-simple-toast

#### get React Native File System

> npm install react-native-fs

#### adb config

> adb reverse tcp:8081 tcp:8081

### running the project

Open folder of your project in terminal and type

> react-native run-android

---

## macOS environment configuration

### Node & Watchman

> brew install node
>
> brew install watchman

### Java Development Kit

> brew tap homebrew/cask-versions
>
> brew install --cask zulu11

### Android Studio

> Android Studio->Preferences->Appeareance & Behavior->System Settings->Android SDK

Choose & download 30 API SDK

### $HOME/.bash_profile file

It's hidden in your home folder, so you need to press cmd + shift + . to unhide it. Inside you need to type

> export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
>
> export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
>
> export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

### adb config

> adb reverse tcp:8081 tcp:8081

## macOS start up

### Load the config into your current shell

> source $HOME/.bash_profile

### get React Native Simple Toast

npm install react-native-simple-toast

### get React Native File System

npm install react-native-fs

### Open folder of your project in terminal and type

> react-native run-android

### Looking for devices

> adb devices

### Errors

In case of spawnSync ./gradlew EACCES you need to type

> chmod 755 android/gradlew

in your terminal

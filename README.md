# Home Grower

<p>Engineering project of students at Adam Mickiewicz University Faculty of Mathematics and Computer Science.</p>

### Our Jira: 
<p>https://wikbos.atlassian.net/jira/software/projects/EN/boards/1/backlog</p>

### miflora - Library for Xiaomi Mi plant sensor
<p>https://github.com/basnijholt/miflora</p>

### Authors
- Bosiacka Wiktoria
- Rebelski Gabriel
- Roszyk Aleks
- Wojciechowska Agata

## macOS environment configuration

### Node & Watchman
>brew install node
>
>brew install watchman

### Java Development Kit
>brew tap homebrew/cask-versions
>
>brew install --cask zulu11

### Android Studio
<p>In android studio:</p>
>Android Studio->Preferences->Appeareance & Behavior->System Settings->Android SDK
<p>Choose & download 30 API SDK</p>

### $HOME/.bash_profile file
<p>It's hidden in your home folder, so you need to press cmd + shift + . to unhide it. Inside you need to type</p>
>export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
>
>export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
>
>export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

### adb config
>adb reverse tcp:8081 tcp:8081


## macOS start up

### Load the config into your current shell
>source $HOME/.bash_profile

### Open folder of your project in terminal and type
>react-native run-android

### Looking for devices
>adb devices

### Errors
<p>In case of spawnSync ./gradlew EACCES you need to type</p>
>chmod 755 android/gradlew 
<p>in your terminal</p>


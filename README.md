"# Home Grower " 

Projekt inżynierski grupy studentów Uniwersytetu Adama Mickiewicza w Poznaniu, Wydziału Matematyki i Informatyki

Jira: https://wikbos.atlassian.net/jira/software/projects/EN/boards/1/backlog

biblioteka umożliwiająca łączność z urządzeniem: 
https://github.com/basnijholt/miflora

##macOS environment configuration

###Node & Watchman
>brew install node
>brew install watchman

###Java Development Kit
>brew tap homebrew/cask-versions
>brew install --cask zulu11

###Android Studio
>Android Studio->Preferences->Appeareance & Behavior->System Settings->Android SDK
>Choose & download 30 API SDK

###$HOME/.bash_profile file
It's hidden in your home folder, so you need to press cmd + shift + . to unhide it. Inside you need to type
>export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
>export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
>export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

###adb config
>adb reverse tcp:8081 tcp:8081


##macOS start up

###Load the config into your current shell
>source $HOME/.bash_profile

###Open folder of your project in terminal and type
>react-native run-android

###Looking for devices
>adb devices

###Errors
In case of spawnSync ./gradlew EACCES you need to type
>chmod 755 android/gradlew 
in your terminal
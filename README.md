# Home Grower

<p>Projekt inżynierski studentów wydziału Matematyki i Informatyki Uniwersytetu im. Adam Mickiewicza w Poznaniu</p>

## Autorzy

- [Bosiacka Wiktoria](https://github.com/wininen)
- [Rebelski Gabriel](https://github.com/gabrysiuu20)
- [Roszyk Aleks](https://github.com/MawirPL)
- [Wojciechowska Agata](https://github.com/agatiwi)

## O projekcie

- Projekt **Home Grower** to aplikacja do kontroli i analizy warunków środowiska roślin domowych.
- Projekt współpracuje z tanimi sensorami odczytującymi parametry gleby **HHCC Mi Flora** oraz **VegTrug Flower Care**.
- W realizowanym projekcie uwaga została skupiona na prawidłowym odczycie danych z urządzenia pomiarowego oraz na czytelnym ich zaprezentowaniu.
- Home Grower ma spełnić zapotrzebowanie użytkowników ceniących sobie życie swoich roślin, dostarczając jak najdokładniejsze dane w prostej i wygodnej formie.
- Projekt skierowany jest do osób indywidualnych, niezależnie od tego na jakim poziomie wiedzy dotyczącej roślin się one znajdują. Projekt ma przysłużyć się domownikom, którzy będą dbali o rośliny pod swoim dachem, odnotowywali ich zmiany, a następnie weryfikowali je przy pomocy aplikacji zsynchronizowanej z dowolną liczbą urządzeń pomiarowych.

## Wymagania niefunkcjonalne aby kontynuować pracę z projektem

- Urządzenie z Android 11+,
- Sensor Xiaomi Flower Care / VegTrug Grow Care Home (i inne warianty).

## Stack technologiczny projeku

- React Native 70.6,
- SQLite,
- Android SDK 30,
- Biblioteki do React Native wymienione w sekcji poniżej.

## Moduły aplikacji

- Panel pogody, która pobiera dane dzięki API serwisu [Open Weather](https://openweathermap.org).
- Panel moich roślin, w którym możemy dodawać oraz usuwać posiadane przez nas rośliny. Dla każdej rośliny wystarczy w nią kliknąć, aby wyświetlić jej odczyty na żywo lub wykresy.
- Panel czujników, który pokazuje połączone oraz dostępne w sieci Bluetooth sensory.
- Panel użytkownika, gdzie możliwe jest wygenerowanie unikalnego identyfikatora w postaci kodu QR.

---

## Konfifuracja środowisk:

<details>
  <summary>Windows</summary>

### 1. Zainstaluj [Javę](https://www.java.com/en/download/help/windows_manual_download.html)

### 2. Ustaw zmienne środowiskowe dla Javy

Upewnij się, że masz ustawioną JAVA_HOME w swoich zmiennych środowiskowych:

1. Wyszukaj **Zmienne środowiskowe** w menu Windowsa i wybierz **Edytuj zmienne środowiskowe systemu**.
2. Znajdź i kliknij przycisk **zmienne środowiskowe...**.
3. W **Zmienne systemowe** dodaj **JAVA_HOME** ze ściażką Javy (w naszym przypadku było to _C:\Program Files\Java\jre1.8.0_331_).

### 3. Zainstaluj Android Studio

Pobierz i zainstaluj [Android Studio](https://developer.android.com/studio/index.html). Podczas procesu instalacji upewnij się, że wszystkie poniższe checkboxy są zaznaczone:

- [x] Android SDK
- [x] Android SDK Platform
- [x] Android Virtual Device

### 4. Zainstaluj odpowiednie SDK

```
Android Studio->Preferences->Appeareance & Behavior->System Settings->Android SDK
```

W sekcji "SDK Platforms" wybierz SDK dla Androida 11 (30 API SDK). Jest to minimalna wersja wspierana przez naszą aplikację.

### 5. Ustaw zmienne środowiskowe dla Androida

1. Wyszukaj **"Zmienne środowiskowe"** w menu Windowsa i wybierz **"Edytuj zmienne środowiskowe systemu"**.
2. Znajdź i kliknij przycisk **"zmienne środowiskowe..."**.
3. W **"Zmienne systemowe"** dodaj:

- "**ANDROID_HOME**" (ścieżka w naszym przypadku: _C:\Users\MyUsername\AppData\Local\Android\Sdk_)
- "**PLATFORM_TOOLS**" (ścieżka w naszym przypadku: _C:\Users\MyUsername\AppData\Local\Android\Sdk\platform-tools_)

### 6. Upewnij się, że masz na systemie zainstalowany system zarządzania pakietami [Yarn](https://yarnpkg.com)

</details>
<details>
  <summary>macOS</summary>

Wzorując się na oficjalnej dokumentacji [React Native](https://reactnative.dev/docs/environment-setup) aby kontynuować pracę nad naszym projektem trzeba:

### 1. Zainstaluj Node & Watchman

Zespół Reacta zaleca instalację Node i Watchmana przy użyciu [HomeBrew](https://brew.sh) . Uruchom następujące polecenia w terminalu po zainstalowaniu [HomeBrew](https://brew.sh):

```
brew install node
brew install watchman
```

### 2. Zainstaluj Java Development Kit

Nasz pracujący na macOS członek zespołu zainstalował OpenJDK nazwane Azul Zulu.
W tym celu po zainstalowaniu na komputerze managera pakietów [HomeBrew](https://brew.sh) należy w konsoli wpisać:

```
brew tap homebrew/cask-versions
brew install --cask zulu11
```

### 3. Zainstaluj Android Studio

Pobierz i zainstaluj [Android Studio](https://developer.android.com/studio/index.html). Podczas procesu instalacji upewnij się, że wszystkie poniższe checkboxy są zaznaczone:

- [x] Android SDK
- [x] Android SDK Platform
- [x] Android Virtual Device

### 4. Zainstaluj odpowiednie SDK

```
Android Studio->Preferences->Appeareance & Behavior->System Settings->Android SDK
```

W sekcji "SDK Platforms" wybierz SDK dla Androida 11 (30 API SDK). Jest to minimalna wersja wspierana przez naszą aplikację.

### 5. Skonfiguruj zmienne środowiskowe ANDROID_HOME

React Native wymaga skonfigurowania pewnych zmiennych środowiskowych w celu budowania aplikacji z natywnym kodem.
Dodaj następujące wiersze do pliku konfiguracyjnego ~/.zprofile lub ~/.zshrc (jeśli używasz bash, to ~/.bash_profile lub ~/.bashrc):

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Po tym kroku w celu załadowania zmiennych środowiskowych przed każdym uruchomieniem aplikacji należy w konsoli wpisać

```
source ~/.zprofile
```

### 6. Upewnij się, że masz na systemie zainstalowany system zarządzania pakietami [Yarn](https://yarnpkg.com)


</details>

---

## Rozpoczęcie pracy nad projektem

W celu rozpoczęcia pracy nad projektem znajdując się w folderze **HomeGrowerMobileApp** wpisz w konsoli:

```
yarn
```

Dzięki temu wszystkie pakiety które są potrzebne do uruchomienia aplikacji zostaną zainstalowane w folderze **node_modules**.
Poniżej znajduje się lista używanych w projekcie pakietów. Ich edycja bądź aktualizacja możliwa jest w pliku **package.json** w folderze **HomeGrowerMobileApp**.

```typescript
  "dependencies": {
    "@ant-design/icons": "^4.8.0",
    "@babel/preset-env": "7.20.2",
    "@react-native-async-storage/async-storage": "^1.17.11",
    "@react-navigation/material-top-tabs": "^6.5.2",
    "@react-navigation/native": "^6.0.16",
    "@react-navigation/native-stack": "^6.9.4",
    "appcenter": "4.4.5",
    "appcenter-analytics": "4.4.5",
    "appcenter-crashes": "4.4.5",
    "axios": "^1.2.0",
    "buffer": "^6.0.3",
    "prettier": "2.8.3",
    "react": "18.1.0",
    "react-dom": "18.1.0",
    "react-native": "0.70.6",
    "react-native-background-actions": "^3.0.0",
    "react-native-ble-manager": "^8.4.4",
    "react-native-camera-kit": "^13.0.0",
    "react-native-chart-kit": "^6.12.0",
    "react-native-fs": "^2.20.0",
    "react-native-geolocation-service": "^5.3.1",
    "react-native-pager-view": "4.2.4",
    "react-native-paper": "^5.1.0",
    "react-native-qrcode-svg": "^6.1.2",
    "react-native-safe-area-context": "^4.4.1",
    "react-native-screens": "^3.18.2",
    "react-native-sqlite-storage": "^6.0.1",
    "react-native-svg": "12.5.0",
    "react-native-tab-view": "^3.3.4",
    "react-native-uuid": "^2.0.1",
    "react-native-vector-icons": "^9.2.0",
    "styled-components": "^5.3.6",
    "typescript": "4.9.4"
  },
```

## Wyszukanie telefonu w konsoli

Możesz sprawdzić czy twój komputer widzi używane przez ciebie urządzenie. Wystarczy wpisać w konsoli:

```
adb devices
```

Poprawnie podłączone urządzenie powinno się pokazać w konsoli jako:

```
List of devices attached
nazwa_mojego_urządzenia     device
```

W przypadku braku posiadania telefonu z systemem Android można użyć emulotora. W tym celu odsyłamy do dokumentacji [React Native](https://reactnative.dev/docs/environment-setup) oraz [Android Studio](https://developer.android.com/studio/run/emulator).
</br></br>

## Przygotowanie telefonu

Ważnym jest, aby w ustawieniach systemu Android włączyć ustawienia deweloperskie oraz zezwolić na instalację aplikacji spoza sklepu Google Play.
</br>
</br>

## Uruchomienie projektu

W celu uruchomienia projektu znajdując się w folderze **HomeGrowerMobileApp** wpisz w konsoli:

```
npx react-native run-android
```

Po tej komendzie powinno się uruchomić środowisko Metro do zarządzania developmentem aplikacji React Native oraz aplikacja na telefonie.

---

## Kontynuacja pracy nad projektem

Nasz projekt znajduje się pod licencją **GNU General Public License v3.0** dzięki czemu każdy może kontynuować pracę nad naszym projektem, nawet w momencie gdy nasz zespół porzuci jego wspieranie. W tym celu przedstawiamy poniżej przydatne informacje do prowadzenia dalszej przygody z **HomeGrowerMobileApp**.
</br>
</br>

### Biblioteka Bluetooth Low Energy dla React Native

Używamy zewnętrznej biblioteki w celu połączenia się z sensorami. Szczegóły biblioteki, wraz z opisami technologii Bluetooth Low Energy znajdują się [tutaj](https://github.com/innoveit/react-native-ble-manager) (dokumentacja dostępna w języku angielskim).

### Baza danych

Opis poszczególnych tabeli oraz funkcjonowania bazy danych znajduje się w pliku [info](database/SQLite/info).

### Identyfikacja użytkownika

Postanowiliśmy, że jedyną daną jaką będziemy przechowywać na temat użytkownika to unikalny kod UUID który generuje się przy pierwszym uruchomieniu aplikacji. Jego reprezentacją jest kod QR generowany w pliku ekranu [profilu](HomeGrowerMobileApp/src/components/Profile/Profile.js).

### Działanie sensora

Działanie sensora jest zaimplementowane w pliku [Sensor.js](HomeGrowerMobileApp/src/Sensor.js). Kod jest okraszony stosownymi komentarzami w języku polskim pomagającym zrozumieć działanie komunikacji aplikacja - czujnik. Szczegóły można znaleźć we wspomnianej wcześniej [Bibliotece Bluetooth Low Energy dla React Native](https://github.com/innoveit/react-native-ble-manager).

## Rozwiązywanie błędów

### spawnSync ./gradlew EACCES

Błąd wynika z braku uprawnień do pliku gradlew. Znajdując się w folderze _HomeGrowerMobileApp_ wystarczy wpisać w konsoli:

```
chmod 755 android/gradlew
```

### brak widoczności urządzenia

W konsoli należy wpisać:

```
adb reverse tcp:8081 tcp:8081
```

## FAQ

<details>
<summary>Dlaczego aplikacja mobilna działa tylko z systemami Android 30+? </summary>
Od sierpnia 2021 roku wszystkie nowe aplikacje muszą spełniać wymagania Google Play, to znaczy, że nowe aplikacje muszą bazować na API o poziomie 30. Z tego też względu podjęto decyzję projektową o porzuceniu wsparcia dla systemów poniżej 30 poziomu API. 
</details>
<br />
<details>
<summary>Dlaczego zdecydowano się na użycie ReactNative? </summary>
ReactNative jest technologią uniwersalną. W porównaniu np. z alternatywą, jaką jest Kotlin dokumentacja jest tu znacznie przyjaźniej zbudowana. Ponadto twórcy mieli więcej doświadczenia z wybraną technologią.  
</details>
<br />
<details>
<summary>Dlaczego nie zdecydowano się na integrację z większą liczbą standardów czujników dostępnych rynkowo? </summary>
Podjęto tą decyzję ze względu na budżetowość połączoną z dostępnością urządzenia, na które się zdecydowano. Ponadto samo urządzenie jest skierowane do użytkowników hobbystycznych, podobnie jak tworzony produkt.  
</details>
<br />
<details>
<summary>Dlaczego zdecydowano się na lokalną bazę danych oraz system użytkowników polegający na „subskrypcji” roślin, a nie standardowym modelu chmurowym, w którym użytkownik ma wiele roślin? </summary>
Wymyślony przez nas system nie wymaga od użytkownika pamiętania hasła do kolejnej platformy. W trosce o poczucie bezpieczeństwa użytkownika nie przechowujemy również jego maila, ani innych danych, które nie są konieczne do analizy życia rośliny. Dajemy użytkownikowi możliwość wygenerowania kodu QR, który może zostać zapisany w wybrany przez niego sposób. Dzięki temu użytkownik może migrować dane wygodnie i szybko. Kody QR w naszym projekcie są wielofunkcyjne – za ich pomocą można „odzyskać” konto, udostępnić swoją roślinę innemu opiekunowi lub przekazać całą jej historię. Dzięki podjęciu takiej decyzji połączenie z Internetem nie będzie niezbędne dla poprawnego działania aplikacji, a użytkownicy troszczący się o swoją prywatność w Internecie nie będą musieli obawiać się stosowania aplikacji.
</details>
<br />

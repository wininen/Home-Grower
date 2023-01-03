const service = '00001204-0000-1000-8000-00805f9b34fb';
const characteristic = '00001a01-0000-1000-8000-00805f9b34fb';
const characteristicToWrite = '00001a00-0000-1000-8000-00805f9b34fb';
const byteRealTimeData = [0xa0, 0x1f];
const byteTurnOnDiote = [0xfd, 0xff];

const config = {
  service,
  characteristic,
  characteristicToWrite,
  byteRealTimeData,
  byteTurnOnDiote,
};

export default config;

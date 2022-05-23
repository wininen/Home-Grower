const scanAndConnect = async () => {
    try {
      const deviceId = "C4:7C:8D:6B:9A:41";
      try { manager.cancelDeviceConnection(deviceId) } catch (e) {}
      const connection = await manager.connectToDevice(deviceId, {
        timeout: 1000
      })
      console.log("Connected!");
      let device = await connection.discoverAllServicesAndCharacteristics();
      //let result = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a02-0000-1000-8000-00805f9b34fb");
      //let result = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
      //const r =  (await result).value;
      //const b = Buffer.from(r, 'base64');
      //console.log(b);
      //console.log("temperature: " + b.readUint16LE() * 0.01);
  
      console.log("resutl???")
      let result = device.writeCharacteristicWithResponseForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb", "0")
      r = (await result).value
      console.log(r)
  
      
  
      /*
      for (const service of await device.services()) {
        for (const c of await service.characteristics()) {
          const char = device.readCharacteristicForService(c.serviceUUID, c.uuid);
          console.log(c.uuid)
          const encodedValue = (await char).value;
          if (encodedValue) {
            // 1. Znaleźć lepszą bibliotekę do dekodowania
            console.log(encodedValue)
            const buf = Buffer.from(encodedValue, 'base64');
            console.log(buf);
            console.log(buf.toString('ascii'));
            console.log(buf.readUInt8(0));
            //const v = Base64.decode(update.value)
            //const value = Base64.decode(encodedValue);
            //console.log(Uint8Array.from(value));
  
          }
  
      }
  
      /*
  
      console.log("historia")
      const n = device.readCharacteristicForService("00001206-0000-1000-8000-00805f9b34fb", "00001a11-0000-1000-8000-00805f9b34fb");
      const encodedN = (await n).value;
      if (encodedN) {
        console.log("encodedN: ")
         console.log(encodedN)
  
        //console.log("base64: ");
        //console.log(base64.decode('SW4gbXkgZXllcywgaW5kaXNwb3NlZA0KSW4gZGlzZ3Vpc2VzIG5vIG9uZSBrbm93cw0KUklQIEND=='))
  
         const buff = Buffer.from(encodedN, 'base64');
         console.log(buff);
         console.log("*****ASCII    " + buff.toString('ascii'))
         console.log("*****READ1st    " + buff.readUInt8(0))
         //x = buff.slice(3)
        // console.log("*****WERSJA" + buff.slice(3).toString('ascii'))
  }
   */
  
  
      /*
      console.log("po pętli")
      const n = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
      const encodedN = (await n).value;
      if (encodedN) {
        console.log("encodedN: ")
         console.log(encodedN)
  
        //console.log("base64: ");
        //console.log(base64.decode('SW4gbXkgZXllcywgaW5kaXNwb3NlZA0KSW4gZGlzZ3Vpc2VzIG5vIG9uZSBrbm93cw0KUklQIEND=='))
  
         const buff = Buffer.from(encodedN, 'base64');
         console.log(buff);
         console.log("temperature: " + buff.readUint16LE() * 0.01);
         const brightness = buff.readUInt8(3);
        
         console.log("brightness: "+ brightness)
         const moisture = buff.readUInt16LE(6);
         console.log("moisture: "+ moisture)
         //console.log("buff utf8");
         //console.log(buff.toString('utf-8'));
         //console.log("buff string");
         //console.log(buff.toString('ascii'));
         //console.log("the end");
          // console.log(characteristic.serviceID, characteristic.serviceUUID, characteristic.uuid, characteristic.id, characteristic.value)
        }
   
  
      }  */
  
     
      connection.cancelConnection()
    } catch(e) {
      console.log("error");
      console.error(e)
    }
  
    return;
  
      manager.startDeviceScan(null, null, async (error, device) => {
          if (error) {
              // Handle error (scanning will be stopped automatically)
              console.log("nie widzę urządzenia")
              console.log(error)
              return
          }
          
  
          // Check if it is a device you are looking for based on advertisement data
          // or other criteria.
          console.log("scanning....")
          console.log(device.name)
          if (device.name === 'Flower care') {
              console.log("JEST")
  
              device.connect()
              .then((device) => {
                device.characteristicsForService("38")
                  .catch((...args) => console.log("error!!!!: ", args))
                  .then((...args) => console.log("xd", args));
                  console.log(device.discoverAllServicesAndCharacteristics())
                  return device.discoverAllServicesAndCharacteristics()
              })
              .then((device) => {
              // Do work on device with services and characteristics
  
              //const services = device.services();
              //console.log("Services:",services);
              //const characteristics = services[1].characteristics;
              //console.log("Characteristics:",characteristics);
    
  
                //const characteristic = None
              //for (let m=0; m <5; m++){
  
              console.log("Przed services")
  
                device.services().then(services => {
                  services.forEach((service, i) => {
                    service.characteristics().then(c => {
                      console.log('----' + i + '-----');
                      console.log(c); 
                      
                      //console.log("Is Characteristics Readable:",c[0].isReadable);
                     // console.log(c[0].value)
  
                      /*
                      c[0].monitor((err, update) => {
                        if (err) {
                          console.log(`characteristic error: ${err}`);
                          console.log(JSON.stringify(err));
                        } else {
                          console.log("Is Characteristics Readable:",update.isReadable);
                          console.log(update.value)
                        }
                      });
                     */
  
  
                      //console.log(device.readCharacteristicForService(service.uuid, characteristic.uuid))
                      return c
                    });
                  });
                });
                
              //}
  
                
  
              })
              .catch((error) => {
                  // Handle errors
                  console.log(error.message);
              });
  
              
  
              //console.log(manager.readCharacteristicForDevice(device.id))
              // Stop scanning as it's not necessary if you are scanning for one device.
              
              manager.stopDeviceScan();
              return
              // Proceed with connection.
          }
      });
  
  }








  try {
    const deviceId = "C4:7C:8D:6B:9A:41";
    try { manager.cancelDeviceConnection(deviceId) } catch (e) {}
    const connection = await manager.connectToDevice(deviceId, {
      timeout: 1000
    })
    console.log("Connected!");
    let device = await connection.discoverAllServicesAndCharacteristics();
    //let result = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a02-0000-1000-8000-00805f9b34fb");
    //let result = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
    //const r =  (await result).value;
    //const b = Buffer.from(r, 'base64');
    //console.log(b);
    //console.log("temperature: " + b.readUint16LE() * 0.01);

    console.log("result???")
    let res = device.readCharacteristicForService("00001204-0000-1000-8000-00805f9b34fb", "00001a01-0000-1000-8000-00805f9b34fb");
    console.log((await res).value)
    const sub = BleManager.monitorCharacteristicForDevice(deviceId, "00001204-0000-1000-8000-00805f9b34fb", 
                                                                  "00001a01-0000-1000-8000-00805f9b34fb",
                                                                  (error, result) => {
                                                                    if (error) {
                                                                      console.log("ERROR ON MONITOR =", error);
                                                                      return;
                                                                    }
                                                                    console.log("MONITORED =", result.value);
                                                                  });
    //r = (await result).value
    //console.log(r)
    //const b = Buffer.from(r, 'base64');
    //console.log(b);

   
    connection.cancelConnection()
  } catch(e) {
    console.log("error");
    console.error(e)
  }

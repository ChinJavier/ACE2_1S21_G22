//============================== PINES
const int pinTemp = A0;


//============================== VARIABLES TEMPERATURA
float valTempRead;
float tempeLocal;
String concatena;


//============================= OTRAS VARIABLES
char buffer[30];
unsigned long lastTime = 0;

//============================= VARIABLES OXIGENO
#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#define MAX_BRIGHTNESS 255
MAX30105 sensorMaxwelin;

#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
//Estos timos fueron utilizdos para no llenar la SRAM
uint16_t infrarojoBuffer[100];   //led infrarojo 
uint16_t ledResBuffer[100];  //led red
#else
uint32_t infrarojoBuffer[100];   //led infrarojo
uint32_t ledResBuffer[100];  //led red
#endif

int32_t tamanioBuffer;  //tamanio de los datos
int32_t spo2;          //valor de oxigeno en la sangre
int8_t esValidoOxigeno;      //indica si el valor del spo2 obtenido es valido
int32_t ritmoCardiaco;     //valor del ritmo cardiaco
int8_t esValidoRitmoCard; //indica si el valor del ritmo cardiaco obtenido es valido



void setup() {
  Serial.begin(9600);
  lastTime = millis();

  //Usa por defecto el puerto I2C
  if (!sensorMaxwelin.begin(Wire, I2C_SPEED_FAST)) 
  {
    while (1);
  }
  
  //================ SETUP DE OXIGENO
 
  byte brilloLed = 80;            //Si es 0=Off y 255=50mA
  byte muestraPromedio = 4;       //Puede ser 1, 2, 4, 8, 16, 32
  byte modoLed = 2;               //Si es 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte muestraPulso = 100;        //Puede ser 50, 100, 200, 400, 800, 1000, 1600, 3200
  int anchoPulso = 411;           //Puede ser 69, 118, 215, 411
  int rangoAdc = 4096;            //Puede ser 2048, 4096, 8192, 16384
  sensorMaxwelin.setup(brilloLed, muestraPromedio, modoLed, muestraPulso, anchoPulso, rangoAdc); //Se configura el max con los valores de arriba
  preparaMax();
}

void loop() {

  float temperaturaResult = getTemperatura();    // temperatura
  getOxigenoANDPulso();                          // oxigeno y puslo
  int oxigenoResult = (spo2 > 80 && spo2<110) ? spo2 : 0;
  int pulsoResult = (ritmoCardiaco > 70 && ritmoCardiaco < 200) ? ritmoCardiaco : 0;
  // el buffer tendrá la forma temperaturaResult, oxigeno, pulso
  sprintf(buffer, "%d.%02d,%d,%d", (int)temperaturaResult, (int)(temperaturaResult*100)%100, oxigenoResult, pulsoResult);
  

  if (lastTime - millis() >= 500) {
    //sprintf(buffe, "%d.%02d,a,b", (int)temperaturaResult, (int)(temperaturaResult*100)%100);
    Serial.print(buffer);
    lastTime = millis();
  }

}


//======================================================================= GET TEMPERATURA
float getTemperatura() {
  valTempRead = analogRead(pinTemp);
  tempeLocal = (float (valTempRead) * 5000) / 1024.0 ;
  tempeLocal = tempeLocal / 10;
  tempeLocal = (tempeLocal - 32.0) * (5.0 / 9.0);
  return tempeLocal;
}



//====================================================================== PREPARA MEDICION
void preparaMax() {
  //el tamanio del buffer es para 100 registros 
  tamanioBuffer = 100; 

  //lee 100 muestras y determina un rango de seniales
  for (byte i = 0 ; i < tamanioBuffer ; i++)
  {
    //ciclo que espera si hay nuevos datos, se queda en el sensor chequeando para jalar datos
    while (sensorMaxwelin.available() == false) 
      sensorMaxwelin.check(); 

    ledResBuffer[i] = sensorMaxwelin.getRed();
    infrarojoBuffer[i] = sensorMaxwelin.getIR();
    //se acabo este proceso de tomar una muestra, toca la siguiente muestra
    sensorMaxwelin.nextSample(); 
  }
  //luego de calcular las muestras ya se toman las medidas
  maxim_heart_rate_and_oxygen_saturation(infrarojoBuffer, tamanioBuffer, ledResBuffer, &spo2, &esValidoOxigeno, &ritmoCardiaco, &esValidoRitmoCard);
}



//====================================================================== GET OXIGENO
void getOxigenoANDPulso() {

  for (byte i = 25; i < 100; i++)
  {
    ledResBuffer[i - 25] = ledResBuffer[i];
    infrarojoBuffer[i - 25] = infrarojoBuffer[i];
  }

  //tomamos 25 registros de la muestras antes de tomar el ritmo cardiaco y hacemos practicamente lo mismo que en el prepararMax
  for (byte i = 75; i < 100; i++)
  {
    while (sensorMaxwelin.available() == false) 
      sensorMaxwelin.check(); 
    ledResBuffer[i] = sensorMaxwelin.getRed();
    infrarojoBuffer[i] = sensorMaxwelin.getIR();
    sensorMaxwelin.nextSample(); 

  }
  //luego de calcular las muestras ya se toman las medidas
  maxim_heart_rate_and_oxygen_saturation(infrarojoBuffer, tamanioBuffer, ledResBuffer, &spo2, &esValidoOxigeno, &ritmoCardiaco, &esValidoRitmoCard);

}

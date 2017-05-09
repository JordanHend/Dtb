//Jordan Hendl
const int ledPin = 5;
int incomingByte;


void setup() 
{

}


 
void loop() 
{
  int potentiometer = analogRead(A0);         
         


  
  Serial.write(potentiometer);                             
  delay(1);     

                                         
  if (Serial.available() > 0)
  { 
    
    incomingByte = Serial.read();
    
    if (incomingByte == 'H') 
    {
      digitalWrite(ledPin, HIGH);
      delay(50);
      digitalWrite(ledPin, LOW);
    }
    



    
  }
}

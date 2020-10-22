import { Component } from '@angular/core';
import { DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
//import { defaultMaxListeners } from 'stream';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private motion: DeviceMotion, private orientacion: ScreenOrientation) {
    this.orientacion.lock(this.orientacion.ORIENTATIONS.PORTRAIT);
  }
  public datos: any;
  subcripcion: any;

  public sensibilidad: number = 1;
  public inclinacion_x: number = 0;
  public inclinacion_y: number = 0;

  public iniciar() {
    let opciones: DeviceMotionAccelerometerOptions = {
      frequency: 100
    };

    this.subcripcion = this.motion.watchAcceleration(opciones).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.datos = acceleration;
      this.determinarInclinacion();
    });
  
  }

  public detener(){
    this.subcripcion.unsubscribe();
  }

  public determinarInclinacion() {
    if (this.datos.x > this.sensibilidad) {
      this.inclinacion_x = 1;
    }
    if (this.datos.x < -(this.sensibilidad)) {
      this.inclinacion_x = -1;
    }
    if ((this.datos.x < this.sensibilidad) && (this.datos.x > -(this.sensibilidad))) {
      this.inclinacion_x = 0;        
    } 
    

    if (this.datos.y > this.sensibilidad) {
      this.inclinacion_y = 1;
    }
    if (this.datos.y < this.sensibilidad) {
      this.inclinacion_y = -1;
    } 
    if ((this.datos.y < this.sensibilidad) && (this.datos.y > -(this.sensibilidad))) {
      this.inclinacion_y = 0;        
    } 


  }

}


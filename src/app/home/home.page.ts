import { Component, OnInit } from '@angular/core';
import { DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public datos: any;
  subcripcion: any;

  public sensibilidad: number = 1;
  public inclinacion_x: number = 0;
  public inclinacion_y: number = 0;
  public x_pos: number = 0;
  public x_neg: number = 0;
  public y_pos: number = 0;
  public y_neg: number = 0;
  public centro: number = 0;
  id: string = 'beep';

  constructor(private motion: DeviceMotion, private orientacion: ScreenOrientation, private audio: NativeAudio) {
    this.orientacion.lock(this.orientacion.ORIENTATIONS.PORTRAIT);
  }

  public ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.audio.preloadSimple(this.id, '../../assets/audio/beep2.mp3');
  }
  
  ionViewWillLeave() {
    this.audio.unload(this.id);
  }

  public iniciar() {
    let opciones: DeviceMotionAccelerometerOptions = {
      frequency: 500
    };

    this.subcripcion = this.motion.watchAcceleration(opciones).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.datos = acceleration;
      this.determinarInclinacion();
    });
  
  }

  public detener(){
    this.subcripcion.unsubscribe();
  }

  public reproducirBeep() {
    this.audio.play(this.id);
  }
  /* public determinarInclinacion() {
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
    }  */

    public determinarInclinacion() {
      if (this.datos.x > this.sensibilidad) {
        this.x_pos = 1;
      } else {
        this.x_pos = 0;
      }
      if (this.datos.x < (-(this.sensibilidad))) {
        this.x_neg = 1;
      } else {
        this.x_neg = 0;
      }
      
  
      if (this.datos.y > this.sensibilidad) {
        this.y_pos = 1;
      } else {
        this.y_pos = 0;
      }
      if (this.datos.y < (-(this.sensibilidad))) {
        this.y_neg = 1;
      } else {
        this.y_neg = 0;
      }

      if ((this.x_neg == 0) && (this.x_pos == 0) && (this.y_neg == 0) && (this.y_pos == 0)) {
        this.centro = 1;
        this.reproducirBeep();
      } else {
        this.centro = 0;
      }

  }

}


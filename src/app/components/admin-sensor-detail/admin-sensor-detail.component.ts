import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SensorData } from 'src/app/app.values';

@Component({
  selector: 'app-admin-sensor-detail',
  templateUrl: './admin-sensor-detail.component.html',
  styleUrls: ['./admin-sensor-detail.component.scss'],
})
export class AdminSensorDetailComponent implements OnInit {

  @Input() sensor: SensorData;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async back() {
    this.modalController.dismiss({ }, 'back');
  }

}

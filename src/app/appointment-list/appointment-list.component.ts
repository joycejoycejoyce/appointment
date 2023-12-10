import { Component } from '@angular/core';
import {Appointment} from '../models/appointment';
import { Title } from '@angular/platform-browser';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})

export class AppointmentListComponent implements OnInit{
  ngOnInit(): void {
    let savedAppointments = localStorage.getItem("appointments"); 
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : []; 
  }

  
  newAppointmentTitle : string = ""; 
  newAppointmentDate: Date = new Date(); 
  appointments: Appointment[] = [];

  // method 
  addAppointment() {
    if (this.newAppointmentTitle.trim().length && this.newAppointmentDate) {
      let newAppointment : Appointment = {
        id: Date.now(), 
        title: this.newAppointmentTitle, 
        date: this.newAppointmentDate
      }

      // push it to the array 
      this.appointments.push(newAppointment); 

      // clean the inputs 
      this.newAppointmentTitle = ""; 
      this.newAppointmentDate = new Date(); 

      // add item to local storage 
      localStorage.setItem("appointments", JSON.stringify(this.appointments)); 
    }
  }

  deleteAppointment(index: number) {
    // delete index = index, length = 1 
    this.appointments.splice(index, 1); 
    // update the array in local storage 
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clients: Client[];
  client: Client = {
    nombre: "",
    apellido: "",
    email: "", 
    saldo: 0
  }

  // GEt the form reference from the view
  @ViewChild("clientForm") clientForm: NgForm;
  @ViewChild("closeModalButton") closeModalButton: ElementRef;

  constructor(private clientService: ClientService,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  getTotalBalance(){
    let totalBalance = 0; 
    if(this.clients){
      this.clients.forEach( client => {
        totalBalance += client.saldo;
      });
      return totalBalance;
    }
  }

  add({value, valid}: {value:Client,valid:boolean}){
    if(!valid){
      this.flashMessages.show("The form is invalid please verify it.", {
        cssClass: "alert-danger", timeout:4000
      })
    }
    else{
      console.log(value);
      // Add client
      this.clientService.addClient(this.client);
      this.clientForm.resetForm();
      this.closeModal();
    }
  }

  private closeModal(){
    this.closeModalButton.nativeElement.click();
  }
}

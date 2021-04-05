import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client = {
    nombre: "",
    apellido: "",
    email: "", 
    saldo: 0
  }

  id: string;

  constructor(private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client; 
    });
  }


  save({value:valid}: {value:Client, valid:boolean}){
    if(!valid){
      this.flashMessages.show("Form is invalid please verify it."), {
        cssClass: "alert-danger", setTimeout: 4000
      }
    }
    else{
      this.client.id = this.id;
      this.clientService.edit(this.client);
      this.router.navigate(["/"]);
    }
  }


  delete(){
    if(confirm("Are you sure you want to delete this client?")){
      this.client.id = this.id;
      this.clientService.delete(this.client); 
      this.router.navigate(["/"]);
    }
  }
}

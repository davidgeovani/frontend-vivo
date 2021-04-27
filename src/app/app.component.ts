import { Component, OnInit } from '@angular/core';
import { CliService } from './services/cli.service';
import { Cli } from './models/cli';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  id!: String;
  cli = {} as Cli;
  clis: Array<Cli> = [];

  constructor(private cliService: CliService) {}

  ngOnInit() {
    this.getClis();
  }

  // vizu
  view(form: NgForm) {
    if (this.cli.id !== undefined) {
      this.cliService.getCliById(this.id).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os clis
  getClis() {
    this.cliService.getClis().subscribe((clis: Cli[]) => {
      this.clis = clis;
    });
  }







  getCliById(id:String){



     this.cliService.getCliById(id).subscribe((Cli)=> {

      this.cli = Cli;

    })

  }

  // deleta um cli
  deleteCli(cli: Cli) {
    this.cliService.deleteCli(cli).subscribe(() => {
      this.getClis();
    });
  }

  // copia o cli para ser editado.
  editCli(cli: Cli) {
    this.cli = { ...cli };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getClis();
    form.resetForm();
    this.cli = {} as Cli;
  }

}

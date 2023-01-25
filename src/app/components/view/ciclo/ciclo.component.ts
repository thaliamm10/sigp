import { Component, OnInit, ElementRef, ViewChild, ɵConsole } from '@angular/core';
import { CicloInterface } from 'src/app/entities/ciclo-interface';
import { CicloService } from 'src/app/services/ciclo.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AperturaService } from 'src/app/services/apertura-service';
import { BatchService } from '../../../services/batch.service';
import { Batch } from '../../../entities/batch';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {
  p: any;
  lista_ciclo: any = new Array();
  lista_apertura: Object;
  lista_etapa: any = new Array();
  ciclo: CicloInterface;
  user: any;
  valida: boolean;
  batch : Batch;
  id_etapa : number;
  id_ciclo : number;
  ciclo_anio : number;
  nombre_etapa : string;
  nombre_etapa_prox : string;
  isEtapa: boolean;
  isBatch: boolean;

  @ViewChild("closeModalCiclo", {static: false})
  closeModalCiclo: ElementRef;

  @ViewChild("closeModalCerrar", {static: false})
  closeModalCerrar: ElementRef;

  @ViewChild("closeModalConfirmacion", {static: false})
  closeModalConfirmacion: ElementRef;

  constructor(
    private cicloService: CicloService,
    private aperturaService: AperturaService,
    private authService: AuthService,
    private toastService: ToastrServiceService,
    private batchService : BatchService
  ) {
    this.ciclo = {
      id:0,
      anio: new Date().getFullYear(),
      fecha_inicio: "",
      fecha_cierre: "",
      nombre_estado: "",
      estado:1,
      usuario_registro : "",
      fecha_registro: "",
      nombre_usuario: "",
      id_apertura: 0
    };
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllCiclo();
    this.getAllApertura();
    this.isEtapa=true;
    this.isBatch =false;
  }

  getAllCiclo() {
    this.cicloService.getAllCiclo().subscribe(res => {
      this.lista_ciclo = res;
    });
  }

  getAllApertura() {
    this.aperturaService.getAllApertura().subscribe(res => {
      this.lista_apertura = res;
    });
  }

  getAllEtapa(p_id_ciclo) {
    this.aperturaService.getAllEtapa(p_id_ciclo).subscribe(res => {
      this.lista_etapa = res;
      // for(let i = 0; i <= this.lista_etapa["length"];i++){
      //   if(this.lista_etapa[i].estado == 1 && this.lista_etapa[i].estado_ciclo == 1)
      //     this.id_etapa=this.lista_etapa[i].id;
      // }
      // console.log(this.lista_etapa);
      this.id_etapa = this.lista_etapa[0].id;
      this.ProxEtapa(this.id_etapa);
    });
  }

  getElemento(elemento) {
    this.ciclo = {
      id: (elemento!=null) ? elemento.id : 0,
      anio: (elemento!=null) ? elemento.anio : new Date().getFullYear(),
      fecha_inicio: (elemento!=null) ? elemento.fecha_inicio : null,
      fecha_cierre: (elemento!=null) ? elemento.fecha_cierre :  null,
      nombre_estado: (elemento!=null) ? elemento.nombre_estado : "",
      estado: (elemento!=null) ? elemento.estado : 1,
      usuario_registro: (elemento!=null) ? elemento.usuario_registro : this.user.codigo,
      fecha_registro: (elemento!=null) ? elemento.fecha_registro : null,
      nombre_usuario:  (elemento!=null) ? elemento.nombre_usuario : this.user.username,
      id_apertura: (elemento!=null) ? elemento.id_apertura : 0
    };  
    this.getAllEtapa(this.ciclo.id);
    // this.getAllApertura();  
  }

  guardar_ciclo() {    
    
    if(this.vfecha(this.ciclo.fecha_inicio) && this.vfecha(this.ciclo.fecha_cierre))
    {
      this.cicloService.guardarCiclo(this.ciclo).subscribe(
        res => {
          if (res["id"] != null) {
            this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          } else if (res["id"] == null) {
            this.toastService.showError("Se produjo un error al guardar.", "Error");
          }
          this.closeModalCiclo.nativeElement.click();
          this.getAllCiclo();
        },
        err => {
          this.toastService.showError(
            "Se produjo un error en el servicio. Error: " + err.message,
            "Error"
          );
        });
    }
    else{
      this.toastService.showError("Formato de Fecha Incorrecto", "Validación");
    }
  }

  marca_estado(elemento){
    elemento.estado = (elemento.estado==0) ? 1 : 0;
  }

  estado_actual(elemento){
    elemento.estado_ciclo = (elemento.estado_ciclo==0) ? 1 : 0;
  }

  vfecha(data) {
    this.valida=true; 
    if(data!=null){
      if(data.split('/').length==3){
     
        if(data.split('/')[2].length==4)
        {
          var anio = data.split('/')[2];
        }
        else{
          this.valida=false; 
        }
  
        if(data.split('/')[1].length==2)
        {
          var mes = parseInt(data.split('/')[1]);
          if(mes>12){
            this.valida=false; 
          }
        }
        else{
          this.valida=false; 
        }
        
        if(data.split('/')[0].length==2){
          var dia = parseInt(data.split('/')[0]);      
          if(dia>31){
            this.valida=false; 
          }
        }
        else{
          this.valida=false; 
        }
        
      }
      else{
        this.valida=false; 
      }
    }
    else{
      this.valida=false; 
    }
    return this.valida;
  }

  getEtapa(id_ciclo, anio){
    this.id_ciclo = id_ciclo;
    this.ciclo_anio = anio;
    this.isEtapa = true;
    this.getAllEtapa(id_ciclo);
  }

  Confirmacion(){
    this.isEtapa = false;
  }

  ProxEtapa(id_etapa){
    var limite = this.lista_etapa["length"];          
    if(limite==1){        
      this.nombre_etapa_prox = "No tiene más etapas";
    } 
    else{
      for(let i = 0; i < this.lista_etapa["length"];i++){
        if(this.lista_etapa[i].id == id_etapa){
          this.nombre_etapa=this.lista_etapa[i].nombre;
          if(i<limite-1){
            this.nombre_etapa_prox= this.lista_etapa[i+1].nombre;
          }
          else{
            this.nombre_etapa_prox = "Etapa del próximo año";
          }
        };
      }
    }
  }

  CerrarEtapa(){
    this.batch = { 
      anio : this.ciclo_anio, 
      etapa_actual : this.id_etapa,
      id_ciclo : this.id_ciclo
    }
    this.isBatch = true;
    this.batchService.realizarBatchEtapa(this.batch).subscribe(
      res => {
        this.isBatch = false;
        if(res == "Ok"){
          this.toastService.showSuccess("Se proceso la replicación con éxito", "Correcto");
        }    
        else{
          this.toastService.showError("Se produjo un error al guardar.: " + res, "Error");
        };  
        this.closeModalCerrar.nativeElement.click();
      }
    );
  }

}

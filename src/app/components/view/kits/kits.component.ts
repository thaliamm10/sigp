import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToastrServiceService } from 'src/app/services/toastr-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrganoService } from 'src/app/services/organo.service';
import { KitsService } from 'src/app/services/kits.service';
import { KitsInterface } from 'src/app/entities/kits-interface';
import { RutasService } from 'src/app/services/rutas.service';
import { BienesService } from 'src/app/services/bienes.service';
import { BienesInterface } from 'src/app/entities/bienes-servicios-interface';
import { from } from 'rxjs';
import { BienesKitInterface } from 'src/app/entities/bienes-kit-interface';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.css']
})
export class KitsComponent implements OnInit {

lista_kits: any = Array();
lista_organo: Object;
lista_estacion:Object;
lista_categoria:Object;
lista_bienes: any = Array();
lista_mantenimiento:any = Array();
term: string;
cantidad_lista: number;
p: any;

id_bienes: number;
id_organo: number;
id_kit: number;
id_mantenimiento: number;
user: any;
kit: KitsInterface;
codigo_organo: string;
id_accion: number;
bienes: BienesInterface;
bienes_kit: BienesKitInterface;
suma_total_bienes:number;

@ViewChild("closeModalKit", {static: false})
closeModalKit: ElementRef;
  constructor(
    private toastService: ToastrServiceService,
    private authService: AuthService,
    private organoService: OrganoService,
    private kitsservice: KitsService,
    private rutaSrv: RutasService,
    private bienesService: BienesService,
  ) {
    this.kit={
      id:0,
      id_organo:0,
      id_mantenimiento:0,
      id_categoria:0,
      id_estado:0,
      nombre_estado: "",
      nombre_categoria: "",
      nombre_mantenimiento: "",
      nombre_organo: "",
    }

    this.bienes_kit= {
      id_bienes:0,
      id_kit:0,
      monto:0
    }
   }

  ngOnInit() {
    this.user = this.authService.getUserLoggedIn();
    this.getAllOrgano();
    this.getAllCategoriaEstacion();
    this.getAllKits();
    this.getAllMantenimiento();
  }

  getElemento(elemento) {
      this.kit={
      id: (elemento !=null)? elemento.id : 0,
      id_mantenimiento: (elemento !=null)? elemento.id_mantenimiento : 0,
      id_organo: (elemento !=null)? elemento.id_organo : 0,
      id_categoria: (elemento !=null)? elemento.id_categoria : 0,
      id_estado: (elemento !=null)? elemento.id_estado : 0,
      xml_kits: (elemento !=null)? elemento.xml_kits : ""
              };
      this.id_organo = (elemento!=null) ? this.kit.id_organo : this.id_organo;
  
      this.lista_bienes = null;
      this.bienesService.getAllBienesKit(this.kit.id).subscribe( res => {
        // console.log(this.kit.id);
        this.lista_bienes = res;
        // console.log(this.lista_bienes);
        this.suma_total_bienes=0;
        for(let i=0; i<this.lista_bienes["length"];i++)
        {
          this.lista_bienes[i].costo = this.lista_bienes[i].precio*this.lista_bienes[i].monto;
          this.suma_total_bienes = this.suma_total_bienes + this.lista_bienes[i].costo;
        }
      });
    }
  
  sumar_costo(i){
    this.lista_bienes[i].costo = this.lista_bienes[i].precio*this.lista_bienes[i].monto;
    this.suma_total_bienes=0;
    for(let n=0; n<this.lista_bienes["length"];n++)
    {
      this.suma_total_bienes = this.suma_total_bienes + this.lista_bienes[n].costo;
    }
  }

  getAllKits(){
    this.kitsservice.listarKits().subscribe(res =>{
    this.lista_kits= res;
    } );
  }
  
  
  getAllMantenimiento(){
    this.kitsservice.listarMantenimiento().subscribe( res => {
    this.lista_mantenimiento = res});
  }

  getAllCategoriaEstacion(){
    this.rutaSrv.getAllEstacion().subscribe(res => {
    this.lista_categoria = res;
    });
  }
  
  getAllOrgano() {
    this.organoService.getAllOrgano().subscribe(res => {
    this.lista_organo = res;
      if(res["length"]!=0){
      this.id_organo = this.lista_organo[0].id;
      }
      //restriccion de organo por perfil
      if(this.user.id_estado!=3){
        for(let i=0;i<this.lista_organo["length"];i++){
        if(this.lista_organo[i].nombre == this.user.dependencia){
          this.id_organo = this.lista_organo[i].id;
          }
        }
      }
    });
  }

  guardarKits() {
    var trama_xml='<BIENES_KIT>';
    for (let m = 0; m < this.lista_bienes["length"]; m++) {
      trama_xml =  trama_xml + "<r>";
      trama_xml =  trama_xml + "<id_kit>" + this.kit.id+ "</id_kit>";
      trama_xml =  trama_xml + "<id_bienes>" + this.lista_bienes[m].id + "</id_bienes>";
      trama_xml =  trama_xml + "<monto>" + this.lista_bienes[m].monto + "</monto>";
      trama_xml =  trama_xml + "</r>";
  }
    trama_xml =  trama_xml + "</BIENES_KIT>";
    this.kit.id_organo = this.id_organo;
    this.kit.xml_kits= trama_xml;
    this.kitsservice.registrarKits(this.kit).subscribe(
      res => {
        // console.log(res);
        if (res["id"]!= null) {
          this.toastService.showSuccess("Se guardó con éxito", "Correcto");
          this.closeModalKit.nativeElement.click();
          this.getAllKits();          
        } else if (res["id"] == null) {
          this.toastService.showError("Se produjo un error al guardar.","Error");
        } 
      },
      err => {
        this.toastService.showError("Se produjo un error en el servicio. Error: " + err.message,"Error");
      }
    );  
  
  }


  select(elemento) {
    this.kit.id_mantenimiento = elemento.id;
  }
  }  


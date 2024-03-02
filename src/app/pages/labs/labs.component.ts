import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/Forms';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule,RouterOutlet,ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ]);

  name=signal('nicolas');
  age=18;
  disabled=true;
  img='https://w3schools.com/howto/img_avatar.png';


 person =signal( {
  name:'Edward',
  age:1,
  avatar:'https://w3schools.com/howto/img_avatar.png'
})

colorCtrl = new FormControl();

widthCtrl = new FormControl(50,{
  nonNullable: true,
});

nameCtrl = new FormControl('nicolas',{
  nonNullable: true,
  validators:[
    Validators.required,
    Validators.minLength(3)
  ]
});


constructor() {
  this.colorCtrl.valueChanges.subscribe(value=>
    console.log(value))
}


  clickHandler(){
    alert('hola')
  }

  changeHandler(event:Event){
    const input=event.target as HTMLInputElement;
    const newValue=input.value;
    this.name.set(newValue);
  }

  keydowHandler(event:KeyboardEvent){
    const input=event.target as HTMLInputElement;
    console.log(input.value)
  }


changeAge(event:Event){
  const input=event.target as HTMLInputElement;
  const newValue=input.value;
  this.person.update(prevState=>{
   return { 
    ...prevState,
    age:parseInt(newValue, 10)
   }
  });
}

changeName(event:Event){
  const input=event.target as HTMLInputElement;
  const newValue=input.value;
  this.person.update(prevState=>{
   return { 
    ...prevState,
    name:newValue
   }
  });
}

}
import { ReactiveFormsModule ,FormControl,Validators} from '@angular/Forms';
import { CommonModule } from '@angular/common';
import { Component, computed, signal,effect, inject, Injector } from '@angular/core';
import { Task } from "./../../models/task.models"
import moment from 'moment';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([]);

  filter = signal<'all'|'pending'|'completed'>('all');
  taskByFilter = computed(()=>{
    const filter = this.filter();
    const tasks=this.tasks();
    if(filter==='pending'){
      return tasks.filter(task=> !task.completed)
    }

    if(filter==='completed'){
      return tasks.filter(task=> task.completed)
    }

    return tasks
  })

  newTaskCtrl = new FormControl('',{
    nonNullable: true,
    validators:[
      Validators.required,
    ]
  });

 injector = inject(Injector);
  
 constructor(){

 }
 
  ngOnInit(){
    const storage = localStorage.getItem('tasks');
    if(storage){
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(()=>{
      const tasks = this.tasks();
      console.log(tasks)
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },{injector: this.injector});
  }



  changeHnadler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim()
      if(value !==''){
        
      this.addTask(value);
      this.newTaskCtrl.setValue('');
      }
      
    }

  }

  addTask(title:string){
    const newTask={
      id:Date.now(),
      title,
      completed:false
    }
    this.tasks.update((tasks)=>[...tasks, newTask]);
  }

  deleteTask(index:number){
    // La función update() es utilizada para actualizar el estado de un objeto, en este caso, el arreglo de tareas.
    // Recibe como argumento una función que toma el estado actual y devuelve el nuevo estado modificado.
    // La función filter() se utiliza aquí para crear un nuevo arreglo que contiene solo los elementos del arreglo original que cumplen una condición.
    // En este caso, la condición es que el índice del elemento sea diferente al índice pasado como parámetro.
    this.tasks.update((tasks)=>tasks.filter((task,position)=>position !== index));
}

updateTask(index: Number) {
  // Se utiliza el método 'update()' para actualizar el estado del arreglo 'tasks'.
  this.tasks.update((tasks) => {
    // Se utiliza el método 'map()' para iterar sobre cada elemento del arreglo 'tasks'.
    return tasks.map((task, position) => {
      // Se verifica si la posición actual coincide con el índice proporcionado.
      if (position === index) {
        // Si la posición coincide, se crea un nuevo objeto tarea con 'completed' invertido.
        return {
          ...task, // Se copian todas las propiedades de la tarea actual.
          completed: !task.completed // Se invierte el valor de 'completed'.
        };
      }
      // Si la posición no coincide, simplemente se devuelve la tarea sin cambios.
      return task;
    });
  });
}

updateTaskEditingMode(index: number){
  
  this.tasks.update((tasks) => {
    // Se utiliza el método 'map()' para iterar sobre cada elemento del arreglo 'tasks'.
    return tasks.map((task, position) => {
      // Se verifica si la posición actual coincide con el índice proporcionado.
      if (position === index) {
        // Si la posición coincide, se crea un nuevo objeto tarea con 'completed' invertido.
        return {
          ...task, // Se copian todas las propiedades de la tarea actual.
          editing:true // Se invierte el valor de 'completed'.
        };
      }
      // Si la posición no coincide, simplemente se devuelve la tarea sin cambios.
      return {
        ...task,
        editing:false
      };
    });
  });
}

updateTaskTex(index: number, event:Event){
  const input = event.target as HTMLInputElement;
  this.tasks.update((tasks) => {
    // Se utiliza el método 'map()' para iterar sobre cada elemento del arreglo 'tasks'.
    return tasks.map((task, position) => {
      // Se verifica si la posición actual coincide con el índice proporcionado.
      if (position === index) {
        // Si la posición coincide, se crea un nuevo objeto tarea con 'completed' invertido.
        return {
          ...task, // Se copian todas las propiedades de la tarea actual.
          title: input.value,
          editing:false // Se invierte el valor de 'completed'.
        };
      }
      // Si la posición no coincide, simplemente se devuelve la tarea sin cambios.
      return task;
        
    
    });
  });
}

changeFilter(filter: 'all'|'pending'|'completed') {
  this.filter.set(filter);
}

  fecha =new Date()

   formattedDate = moment().format('MMMM Do YYYY, h:mm:ss a');
  
}

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interfaces';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  constructor(private authService:AuthService,
    private router:Router
  ){}

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;


  @Input()
  public placeholder: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value =>{
      this.onDebounce.emit(value)
    })
  }

  ngOnDestroy():void{
    this.debouncerSuscription?.unsubscribe();
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm)
  }

  onLogout(){
    this.authService.logout(  )
    this.router.navigate(['/auth/login'])
  }

  get user():User|undefined{
    return this.authService.currentUser
  }


}

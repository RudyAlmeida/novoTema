/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AfterViewInit } from '@angular/core';
/* eslint-disable arrow-parens */
import { UserService } from '../../services/user.service';
/* eslint-disable @typescript-eslint/semi */
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() showAvatar: boolean = true;
    isScreenSmall!: boolean;
    navigation: any;
    user: any = {
        /* id: 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
        name: 'Brian Hughes',
        email: 'hughes.brian@company.com',
        avatar: null,
        status: 'online' */
    }
    userData: any = []

    visibleSidebar: boolean = false

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _service: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    /* async ngAfterViewInit(){
        this._service.getSingleUser(await this._service.userObservable._delegate.email).subscribe(res => {
            this.userData = res
            this.user.id = this.userData._id
            this.user.name = this.userData.nome
            this.user.email = this.userData.email
            this.user.avatar = this.userData.foto
        })
        console.log(this.userData)
    } */
    ngOnInit(): void
    {
        /* const showNavbar = (toggleId: any, navId: any, bodyId: any, headerId: any) =>{
            const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

            // Validate that all variables exist
            if(toggle && nav && bodypd && headerpd){
            toggle.addEventListener('click', ()=>{
            // show navbar
            nav.classList.toggle('show')
            // change icon
            toggle.classList.toggle('bx-x')
            // add padding to body
            bodypd.classList.toggle('body-pd')
            // add padding to header
            headerpd.classList.toggle('body-pd')
            })
            }
            }

            showNavbar('header-toggle','nav-bar','body-pd','header')

            /*===== LINK ACTIVE =====*/
            /*const linkColor = document.querySelectorAll('.nav_link')

            function colorLink(){
            if(linkColor){
            linkColor.forEach(l=> l.classList.remove('active'))
            //this.classList.add('active')ssssssssssssssssss
            }
            }
            linkColor.forEach(l=> l.addEventListener('click', colorLink)) */
        setTimeout(() => {
            this._service.getSingleUser(this._service.userObservable._delegate.email).subscribe(res => {
                this.userData = res
                this.user.id = this.userData._id
                this.user.name = this.userData.nome
                this.user.email = this.userData.email
                this.user.avatar = this.userData.foto
                console.log(this.user)
            })
          }, 1000)
        // Subscribe to navigation data
        /* this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            }); */

        // Subscribe to the user service
        /* this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            }); */

        // Subscribe to media changes
        // this._fuseMediaWatcherService.onMediaChange$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(({matchingAliases}) => {

        //         // Check if the screen is small
        //         this.isScreenSmall = !matchingAliases.includes('md');
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        //this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        //const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        // if ( navigation )
        // {
        //     // Toggle the opened status
        //     navigation.toggle();
        // }
    }
    updateUserStatus(status: string): void
    {
        // Return if user is not available
        if ( !this.user )
        {
            return;
        }

        // Update the user
        /* this._userService.update({
            ...this.user,
            status
        }).subscribe(); */
    }



}

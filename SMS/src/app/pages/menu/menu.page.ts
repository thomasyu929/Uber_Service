import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../../user.service'

import { UserService } from '../../user.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
  sub
  mainuser: AngularFirestoreDocument
  lastname: string;
  firstname: string;

  pages = [
    {
      title: 'Home',
      url: '/menu/home/feed',
    },
    {
      title: 'Wallet',
      url: '/menu/payment',
    },
    {
      title: 'Order history',
      url: '/menu/history',
    },
    {
      title: 'Settings',
      url: '/menu/settings',
    },
  ]

  selectedPath = ''

  constructor(
    private router: Router,
    public user: UserService,
    private afs: AngularFirestore,
    ) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.lastname = event.lastname
			this.firstname = event.firstname
		})   
  }

  ngOnInit() {
  }
}

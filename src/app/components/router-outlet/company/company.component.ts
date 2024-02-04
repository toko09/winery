import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  photos: string[] = ['achiev1.jpg', 'achiev2.jpg', 'achiev3.jpg',
    'achiev4.jpg', 'achiev5.jpg', 'achiev6.jpg']

}

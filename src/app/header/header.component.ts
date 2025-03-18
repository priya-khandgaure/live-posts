import { Component, OnInit } from '@angular/core';
import { RouterModule } from'@angular/router'; // Import RouterModule to create routerlink
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private backEndService: BackEndService) {}

  ngOnInit(): void {
    console.log('HeaderComponent initialized!');
    this.onFetch();
  }

  onSave() {
     console.log('on save called!!!');
     this.backEndService.saveData();
  }

  onFetch() {
    console.log('on Fetch called!!!');
    this.backEndService.fetchData();
  }

}

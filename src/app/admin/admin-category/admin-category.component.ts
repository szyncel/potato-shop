import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../store/models/category";
import {Observable} from "rxjs/Observable";
import {CategoryService} from "../../services/category.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories$: Observable<Category[]>;

  displayedColumns = ['_id', 'name','actions'];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    this.categories$.subscribe((categories: Category[]) => {
      console.log(categories);
      this.dataSource = new MatTableDataSource(categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  onAddCategory(){

  }


  onEditCategory(){

  }

  onDeleteCategory(){

  }

}

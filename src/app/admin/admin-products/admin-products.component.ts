import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../product.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Subject} from "rxjs/Subject";
import {Product} from "../../store/models/product";
import {Observable} from "rxjs/Observable";
import {AddComponent} from "./add/add.component";
import {EditComponent} from "./edit/edit.component";
import {RemoveComponent} from "./remove/remove.component";


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  productsList$: Observable<Product[]>;

  displayedColumns = ['title', 'price', 'category', 'action'];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Event emitter, który wskazuje do kiedy robić emisję na wszystkie obserwatory tego komponentu */
  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.refreshProductList();
  }

  refreshProductList() {
    this.productsList$ = this.productService.getAll();
    this.productsList$.subscribe((res: Product[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAddProductDialog() {
    let dialogRef = this.dialog.open(AddComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshProductList();
      dialogRef = null;
    });
  }

  onEditProductDialog(productId) {
    let dialogRef = this.dialog.open(EditComponent, {
      width: '400px',
      data: {id: productId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshProductList();
      dialogRef = null;
    });
  }

  onRemoveProductDialog(productId) {
    let dialogRef = this.dialog.open(RemoveComponent, {
      width: '400px',
      data: {id: productId}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.refreshProductList();
      dialogRef = null;
    });
  }
}

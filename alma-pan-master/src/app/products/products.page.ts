import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: string;
  stock: string; // Cambiado a 'string' para aceptar números y letras (100 kg o 300 unidades)
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  // Lista inicial de productos con cantidad en stock diario
  products: Product[] = [
    { id: 1, name: 'Marraqueta', price: '$2.400 el kg', stock: '50 kg' },
    { id: 2, name: 'Pan de Allulla', price: '$1.900 el kg', stock: '30 kg' },
    { id: 3, name: 'Pan Frica', price: '$300 la unidad', stock: '100 unidades' },
    { id: 4, name: 'Pan Copihue', price: '$300 la unidad', stock: '80 unidades' },
    { id: 5, name: 'Pan Integral', price: '$2.500 el kg', stock: '20 kg' },
    { id: 6, name: 'Pan Amasado', price: '$2.250 el kg', stock: '40 kg' },
  ];

  newProduct: Product = { id: 0, name: '', price: '', stock: '' }; // Modelo para agregar un nuevo producto
  deleteInput: string = ''; // Input para eliminar producto por nombre o ID
  editingProduct: Product | null = null; // Producto en edición
  origin: string = ''; // Para determinar desde dónde se navegó

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Detectar el parámetro 'origin' pasado en la navegación
    this.route.queryParams.subscribe((params: { [key: string]: any }) => {
      this.origin = params['origin'] || 'home'; // Default a 'home' si no hay parámetro
    });

    // Cargar productos desde localStorage si existen
    this.loadProducts();
  }

  // Cargar productos guardados en localStorage
  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
  }

  // Guardar productos en localStorage
  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  // Redirigir al origen (home o home-administrador)
  goToHome() {
    if (this.origin === 'home-administrador') {
      this.navCtrl.navigateRoot('/home-administrador');
    } else {
      this.navCtrl.navigateRoot('/home');
    }
  }

  // Agregar un nuevo producto
  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.stock.trim()) {
      this.newProduct.id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
      this.products.push({ ...this.newProduct });
      this.saveProducts(); // Guardar en localStorage
      this.newProduct = { id: 0, name: '', price: '', stock: '' }; // Reiniciar formulario
    } else {
      alert('Por favor, complete todos los campos del producto.'); // Mensaje de advertencia
    }
  }

  // Eliminar producto por ID o nombre
  deleteProductByNameOrId() {
    const input = this.deleteInput.toLowerCase().trim();
    this.products = this.products.filter(
      product => product.id.toString() !== input && product.name.toLowerCase() !== input
    );
    this.saveProducts(); // Actualizar localStorage
    this.deleteInput = '';
  }

  // Editar un producto existente
  editProduct(product: Product) {
    this.editingProduct = { ...product }; // Hacer una copia del producto para edición
  }

  // Guardar los cambios del producto editado
  saveEdit() {
    if (this.editingProduct) {
      const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
      if (index > -1) {
        this.products[index] = { ...this.editingProduct };
        this.saveProducts(); // Actualizar localStorage
      }
      this.editingProduct = null; // Salir del modo edición
    }
  }

  // Cancelar edición
  cancelEdit() {
    this.editingProduct = null;
  }

  // Eliminar un producto por ID
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts(); // Actualizar localStorage
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
    this.navCtrl.navigateRoot('/login');
  }
}

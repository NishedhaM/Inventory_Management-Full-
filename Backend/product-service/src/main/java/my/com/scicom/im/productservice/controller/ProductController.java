package my.com.scicom.im.productservice.controller;

import my.com.scicom.im.productservice.model.ProductModel;
import my.com.scicom.im.productservice.repository.IProductRepository;
import my.com.scicom.im.productservice.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Tuple;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    IProductRepository productRepo;

    @PostMapping("")
    public ProductModel addProduct(@RequestBody ProductModel product){
        return productService.saveProduct(product);
    }

    @GetMapping("")
    public List<ProductModel> getProductList(){
        return productService.getProductList();
    }

    @GetMapping("/{id}")
    public ProductModel findProduct(@PathVariable int id){
        return productService.getProductById(id);
    }

    @GetMapping("/product/{name}")
    public List<ProductModel> getProduct(@PathVariable String product)
    {
        return productService.getProductByName(product);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductModel>> searchProducts(@RequestParam("name") String name,@RequestParam("brand") String brand,@RequestParam("type") String type){
        return ResponseEntity.ok(productService.searchProducts(name,brand,type));
    }

//    @GetMapping("/search")
//    public ResponseEntity<List<Tuple>> getAllProducts(@RequestParam (required = false) String proName,
//                                                      @RequestParam (required = false) int quantity,
//                                                      @RequestParam (required = false) float price){
//        return new ResponseEntity<>(productService.searchProductsByAll(proName,quantity,price), HttpStatus.OK);
//
//    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id,@RequestBody ProductModel productModel){
        return new ResponseEntity<>(productService.updateProduct(id,productModel), HttpStatus.OK);
    }

//    @DeleteMapping("/{id}")
//    public String deleteProduct(@PathVariable int id){
//        return productService.deleteProduct(id);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> loginUser(@PathVariable int id){
        return new ResponseEntity<>(productService.deleteProduct(id),HttpStatus.OK);
    }




}

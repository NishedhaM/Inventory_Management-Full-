package my.com.scicom.im.productservice.service;


import my.com.scicom.im.productservice.model.ProductModel;
import my.com.scicom.im.productservice.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.Tuple;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private IProductRepository productRepo;


    public ProductModel saveProduct(ProductModel product){
        return productRepo.save(product);
    }

    public List<ProductModel> getProductList(){
        return productRepo.findAll();
    }

    public ProductModel getProductById(int id){
        return productRepo.findById(id).orElse(null);
    }

    public List<ProductModel> getProductByName(String product){
        return productRepo.findByProName(product);

    }

    public List<ProductModel> searchProducts(String name,String brand,String type) {
        List<ProductModel> products=productRepo.searchProducts(name,brand,type);
        return products;
    }

//    public List<Tuple> searchProductsByAll(String proName,int quantity,float price) {
//        List<Tuple> products=productRepo.searchProductsByAll(proName,quantity,price);
//        return products;
//    }


    public ProductModel updateProduct(int id,ProductModel product){
        ProductModel existingProduct= productRepo.findById(id).orElseThrow();
        existingProduct.setProName(product.getProName());
        existingProduct.setQuantity(product.getQuantity());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setBrand(product.getType());

        final ProductModel updatedEmployee = productRepo.save(existingProduct);
        return updatedEmployee;
    }

    public ResponseEntity<?> deleteProduct(int id){
        productRepo.deleteById(id);
        return ResponseEntity.ok(id);

    }
}

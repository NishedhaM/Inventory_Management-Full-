package my.com.scicom.im.productservice.repository;


import my.com.scicom.im.productservice.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.Tuple;
import java.awt.print.Pageable;
import java.util.List;


public interface IProductRepository extends JpaRepository<ProductModel,Integer> {
      //    productModel findByProductName (String pro_name);
      public List<ProductModel> findByProName(String proName);


      @Query("SELECT p from ProductModel p WHERE " +
              "p.proName LIKE CONCAT('%',:name,'%')"+
              "OR p.brand LIKE CONCAT('%',:brand,'%')"+
              "OR p.type LIKE CONCAT('%',:type,'%')")
      List<ProductModel> searchProducts(String name,String brand,String type);

//      @Query(value = "SELECT e.id"
//              +  "FROM ProductModel e"
//              + " WHERE ( :proName IS NULL OR :proName = '' OR e.proName = :proName)"
//              + " AND ( :quantity=-1 OR e.quantity= :quantity)"
//              + " AND ( :price=-1 OR e.price= :price)")
//      List<Tuple> searchProductsByAll(@Param( "proName") String proName,
//                                      @Param("quantity") int quantity,
//                                      @Param("price") float price);


}






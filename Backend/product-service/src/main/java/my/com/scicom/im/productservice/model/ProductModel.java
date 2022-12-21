package my.com.scicom.im.productservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PRODUCT_TBL")

public class ProductModel {
    @Id
    @GeneratedValue
    private int id;
    private String proName;
    private int quantity;
    private float price;
    private String brand;
    private String type;


}



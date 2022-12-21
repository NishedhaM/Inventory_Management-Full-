package my.com.scicom.im.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "USER_TBL")
public class UserModel {

    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String email;
    private String password;
    private Date birthDate;
}

package my.com.scicom.im.userservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserStatus {

    @Id
    @GeneratedValue
    private UserModel userModel;
    private String status;
    private String message;
}
